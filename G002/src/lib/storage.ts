// IndexedDB Local Storage Service for G002 Nuclear Medicine Information System

const DB_NAME = 'G002_NuclearMedicine_DB';
const DB_VERSION = 1;

export interface FavoriteItem {
  id: string;
  type: 'patient' | 'appointment' | 'exam' | 'report' | 'drug' | 'recipe';
  targetId: string;
  title: string;
  description?: string;
  tags?: string[];
  createdAt: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  category?: 'work' | 'study' | 'personal' | 'health';
  relatedIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface StorageStats {
  favoritesCount: number;
  diariesCount: number;
  lastBackup?: string;
}

class IndexedDBService {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<void> | null = null;

  async init(): Promise<void> {
    if (this.db) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('[IndexedDB] Failed to open database:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('[IndexedDB] Database opened successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        console.log('[IndexedDB] Upgrading database schema...');

        // Favorites store
        if (!db.objectStoreNames.contains('favorites')) {
          const favStore = db.createObjectStore('favorites', { keyPath: 'id' });
          favStore.createIndex('type', 'type', { unique: false });
          favStore.createIndex('targetId', 'targetId', { unique: false });
          favStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Diaries store
        if (!db.objectStoreNames.contains('diaries')) {
          const diaryStore = db.createObjectStore('diaries', { keyPath: 'id' });
          diaryStore.createIndex('date', 'date', { unique: false });
          diaryStore.createIndex('category', 'category', { unique: false });
          diaryStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Settings store
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }

        console.log('[IndexedDB] Schema upgrade complete');
      };
    });

    return this.initPromise;
  }

  private async ensureDB(): Promise<IDBDatabase> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');
    return this.db;
  }

  // ========== Favorites Operations ==========

  async addFavorite(item: Omit<FavoriteItem, 'id' | 'createdAt'>): Promise<FavoriteItem> {
    const db = await this.ensureDB();
    const favorite: FavoriteItem = {
      ...item,
      id: `FAV_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction('favorites', 'readwrite');
      const store = tx.objectStore('favorites');
      const request = store.add(favorite);
      request.onsuccess = () => resolve(favorite);
      request.onerror = () => reject(request.error);
    });
  }

  async removeFavorite(id: string): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('favorites', 'readwrite');
      const store = tx.objectStore('favorites');
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAllFavorites(): Promise<FavoriteItem[]> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('favorites', 'readonly');
      const store = tx.objectStore('favorites');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async getFavoritesByType(type: FavoriteItem['type']): Promise<FavoriteItem[]> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('favorites', 'readonly');
      const store = tx.objectStore('favorites');
      const index = store.index('type');
      const request = index.getAll(type);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async isFavorite(targetId: string): Promise<boolean> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('favorites', 'readonly');
      const store = tx.objectStore('favorites');
      const index = store.index('targetId');
      const request = index.getAll(targetId);
      request.onsuccess = () => resolve((request.result || []).length > 0);
      request.onerror = () => reject(request.error);
    });
  }

  async toggleFavorite(item: Omit<FavoriteItem, 'id' | 'createdAt'>): Promise<{ added: boolean; favorite?: FavoriteItem }> {
    const existing = await this.getFavoritesByType(item.type);
    const matched = existing.find(f => f.targetId === item.targetId);
    if (matched) {
      await this.removeFavorite(matched.id);
      return { added: false };
    }
    const added = await this.addFavorite(item);
    return { added: true, favorite: added };
  }

  // ========== Diary Operations ==========

  async addDiary(entry: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<DiaryEntry> {
    const db = await this.ensureDB();
    const now = new Date().toISOString();
    const diary: DiaryEntry = {
      ...entry,
      id: `DIARY_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: now,
      updatedAt: now,
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction('diaries', 'readwrite');
      const store = tx.objectStore('diaries');
      const request = store.add(diary);
      request.onsuccess = () => resolve(diary);
      request.onerror = () => reject(request.error);
    });
  }

  async updateDiary(id: string, updates: Partial<Omit<DiaryEntry, 'id' | 'createdAt'>>): Promise<DiaryEntry | null> {
    const db = await this.ensureDB();
    const existing = await this.getDiaryById(id);
    if (!existing) return null;

    const updated: DiaryEntry = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction('diaries', 'readwrite');
      const store = tx.objectStore('diaries');
      const request = store.put(updated);
      request.onsuccess = () => resolve(updated);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteDiary(id: string): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('diaries', 'readwrite');
      const store = tx.objectStore('diaries');
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAllDiaries(): Promise<DiaryEntry[]> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('diaries', 'readonly');
      const store = tx.objectStore('diaries');
      const request = store.getAll();
      request.onsuccess = () => {
        const results = request.result || [];
        results.sort((a, b) => b.date.localeCompare(a.date));
        resolve(results);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getDiaryById(id: string): Promise<DiaryEntry | null> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('diaries', 'readonly');
      const store = tx.objectStore('diaries');
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getDiariesByDateRange(startDate: string, endDate: string): Promise<DiaryEntry[]> {
    const diaries = await this.getAllDiaries();
    return diaries.filter(d => d.date >= startDate && d.date <= endDate);
  }

  async getDiariesByCategory(category: DiaryEntry['category']): Promise<DiaryEntry[]> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('diaries', 'readonly');
      const store = tx.objectStore('diaries');
      const index = store.index('category');
      const request = index.getAll(category);
      request.onsuccess = () => {
        const results = request.result || [];
        results.sort((a, b) => b.date.localeCompare(a.date));
        resolve(results);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async searchDiaries(keyword: string): Promise<DiaryEntry[]> {
    const diaries = await this.getAllDiaries();
    const lower = keyword.toLowerCase();
    return diaries.filter(d =>
      d.title.toLowerCase().includes(lower) ||
      d.content.toLowerCase().includes(lower)
    );
  }

  // ========== Settings Operations ==========

  async setSetting(key: string, value: unknown): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('settings', 'readwrite');
      const store = tx.objectStore('settings');
      const request = store.put({ key, value });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getSetting<T>(key: string, defaultValue: T): Promise<T> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('settings', 'readonly');
      const store = tx.objectStore('settings');
      const request = store.get(key);
      request.onsuccess = () => resolve((request.result?.value as T) ?? defaultValue);
      request.onerror = () => reject(request.error);
    });
  }

  // ========== Statistics ==========

  async getStorageStats(): Promise<StorageStats> {
    const [favorites, diaries] = await Promise.all([
      this.getAllFavorites(),
      this.getAllDiaries(),
    ]);
    return {
      favoritesCount: favorites.length,
      diariesCount: diaries.length,
    };
  }

  async exportData(): Promise<{ favorites: FavoriteItem[]; diaries: DiaryEntry[] }> {
    const [favorites, diaries] = await Promise.all([
      this.getAllFavorites(),
      this.getAllDiaries(),
    ]);
    return { favorites, diaries };
  }

  async clearAllData(): Promise<void> {
    const db = await this.ensureDB();
    const stores = ['favorites', 'diaries', 'settings'];
    for (const storeName of stores) {
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
    console.log('[IndexedDB] All data cleared');
  }
}

// Singleton instance
export const storage = new IndexedDBService();
export default storage;
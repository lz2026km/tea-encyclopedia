# G002 院区核医学信息管理系统 工作记录

## v0.3.0 大版本升级（2026-05-05）

**状态：✅ 已完成并发布** | 端口：5177 | 访问：http://8.137.71.217:5177/

### 升级内容（22个新功能页面）

| # | 页面 | 路由 | 功能描述 |
|---|------|------|----------|
| 1 | DoseCalculationPage | `/dose-calculation` | 个体剂量计算（体重/SUV/有效剂量） |
| 2 | InjectionTrackingPage | `/injection-tracking` | 注射追踪记录（冷链/注射/外渗） |
| 3 | PETQCPage | `/pet-qc` | PET图像质量评价（SUV/伪影/评分） |
| 4 | SPECTQCPage | `/spect-qc` | SPECT图像质量评价（灰度/分辨率/SNR） |
| 5 | EquipmentQCPage | `/equipment-qc` | 设备日常质控（PET每日QC/SPECT周校准） |
| 6 | DoseAlertPage | `/dose-alert` | 辐射剂量阈值预警（患者+职业人员） |
| 7 | MWLPage | `/mwl` | DICOM Modality Worklist工作流 |
| 8 | NuclearStatsPage | `/nuclear-stats` | 科室专项统计（12月趋势/设备效率） |
| 9 | StaffHealthPage | `/staff-health` | 职业人员健康档案（15人×3年剂量） |
| 10 | ImageArchivePage | `/image-archive` | 图像存档与调取（DICOM存档） |
| 11 | DrugPlanPage | `/drug-plan` | 药物申购计划（月度/紧急） |
| 12 | RejectManagePage | `/reject-manage` | 废片管理与质量追踪 |
| 13 | ReportTemplatePage | `/report-template` | 报告模板管理 |
| 14 | ConsultationPage | `/consultation` | 会诊协作管理 |
| 15 | RadioisotopePage | `/radioisotope` | 核素管理（10种核素） |
| 16 | KitManagePage | `/kit-manage` | 药盒/试剂盒管理 |
| 17 | TeachingCasePage | `/teaching-case` | 教学病例库（20例） |
| 18 | ReagentQCPage | `/reagent-qc` | 试剂盒/放射性试剂QC |
| 19 | RadiationPatrolPage | `/radiation-patrol` | 辐射巡检记录 |

### 技术验收
- `npx tsc --noEmit` 零错误
- Playwright：HTTP 200，console errors=0，版本徽章 v0.3.0 可见
- Git commit：`3d575252d`

---

## v0.11.0 行业对标升级（2026-05-03）

**状态：🔄 待实施** | 端口：5168 | 访问：http://8.137.71.217:5168/

### 待升级内容
对标核医学头部厂商（麦迪克斯 MEMRS-NM），8项功能差距补齐：
① 主任驾驶舱/② 核素药品管理增强/③ 辐射防护闭环/④ 设备效率热力图/⑤ 放射药典管理/⑥ 质控统计增强/⑦ 患者预约增强/⑧ 科研数据抽取

### 当前版本状态
- package.json版本：v0.5.1
- 最新代码：已同步main分支（commit `2eb25e4f6`）
- 待构建：`npm run build` → 部署 → Playwright验收 → git push

---

## 项目概述
- **项目名称**：G002 Nuclear Medicine Information System
- **项目别名**：院区核医学信息管理系统
- **对标产品**：麦迪克斯 MEMRS-NM-B4.0（分子影像与核医学信息管理系统）
- **设计规范**：蓝色主色 #1e40af，与G003~G008六大系统一致；内联样式（非Tailwind）；React + Vite + TypeScript
- **开发端口**：5168
- **Git commit**：`2eb25e4f6`（2026-05-02）

---

## 完成内容

### 1. 项目基础结构
- `package.json` — 依赖配置（react, react-dom, react-router-dom, lucide-react, recharts, vite）
- `vite.config.ts` — 端口 5168，host 0.0.0.0
- `tsconfig.json` / `tsconfig.node.json` — TypeScript 配置
- `index.html` — 入口 HTML
- `src/main.tsx` — React 根渲染
- `src/App.tsx` — 路由配置（15个路由）
- `src/components/Sidebar.tsx` — 侧边栏导航（7个分组）
- `src/types/index.ts` — 全部 TypeScript 类型定义
- `src/data/initialData.ts` — 核医学核心业务数据（患者/预约/检查/报告/药品/辐射/质控等）

### 2. 15个核心页面（7大子系统）

| # | 页面 | 路由 | 子系统 |
|---|------|------|--------|
| 1 | HomePage | `/` | 工作台 |
| 2 | WorklistPage | `/worklist` | 工作台 |
| 3 | SchedulePage | `/schedule` | 工作台 |
| 4 | PatientPage | `/patients` | 患者管理 |
| 5 | AppointmentPage | `/appointments` | 患者管理 |
| 6 | ExamPage | `/exam` | 检查报告 |
| 7 | ReportPage | `/reports` | 检查报告 |
| 8 | ReportWritePage | `/report-write` | 检查报告 |
| 9 | DrugPage | `/drugs` | 核素药品 |
| 10 | DrugDistributionPage | `/drug-distribution` | 核素药品 |
| 11 | RadiationPage | `/radiation` | 辐射防护 |
| 12 | QCPage | `/qc` | 质控教学 |
| 13 | EducationPage | `/education` | 质控教学 |
| 14 | StatisticsPage | `/statistics` | 质控教学 |
| 15 | AdminPage | `/admin` | 系统管理 |

### 3. TypeScript 修复记录
- `HomePage.tsx`：`Record<string,CSSProperties>` 内函数样式 → 提取为独立函数；`borderCollapse`/`textAlign` 添加 `as const`
- `Sidebar.tsx`：`collapsed` 状态缺失 → 添加 `useState`；`overflowY` 类型 → `as const`
- `initialData.ts`：`待检查` → `准备中`；移除 `Report.examItem`（类型无此字段）
- `AdminPage.tsx`：重复 `style` 属性 → 合并为展开运算符
- `AppointmentPage.tsx`：`QuestionMark` → `FileQuestionMark`
- `ReportPage.tsx`：`report.examItem` → `report.reportType`

---

## 启动命令
```bash
cd /home/admin/hermes-agent/web/G002
npx vite build
npx serve -s dist -l 5168
# 访问：http://localhost:5168/
```

---

## 定时任务
- G002 说明书邮件发送 → `cron_G002_说明书`（待创建）

---

## 待完成
- G002 使用说明书编写并发送邮件至 18687607933@sina.cn
- 说明书自动发送定时任务（每周一 09:00）

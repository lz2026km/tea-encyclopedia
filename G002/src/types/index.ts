// G002 Nuclear Medicine Information System - Type Definitions

export interface Patient {
  id: string;
  name: string;
  gender: '男' | '女';
  age: number;
  phone: string;
  idCard: string;
  address: string;
  allergy?: string;
  radiationRisk?: '低' | '中' | '高';
  petctNo?: string;
  lastVisit?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  examType: 'PET/CT' | 'SPECT' | '核素治疗' | '骨密度';
  examItem: string;
  scheduledDate: string;
  scheduledTime: string;
  status: '待确认' | '已确认' | '检查中' | '已完成' | '已取消';
  radiopharmaceutical?: string;
  injectedDose?: string;
  doctor: string;
  notes?: string;
}

export interface ExamRecord {
  id: string;
  patientId: string;
  patientName: string;
  appointmentId: string;
  examType: 'PET/CT' | 'SPECT' | '核素治疗' | '骨密度';
  examItem: string;
  examDate: string;
  startTime: string;
  endTime?: string;
  status: '准备中' | '检查中' | '图像采集中' | '处理中' | '已完成';
  device: string;
  doctor: string;
  nurse: string;
  radiopharmaceutical?: string;
  injectedDose?: string;
  injectionTime?: string;
  scanStartTime?: string;
  scanEndTime?: string;
  PetctImages?: number;
  PetctSeries?: number;
  SUVmax?: number;
  SUVpeak?: number;
  liverSUV?: number;
  findings?: string;
  conclusion?: string;
  // PET/CT extra
  imageCount?: number;
  BMD_L1_L4?: number;
  cerebellumSUV?: number;
  // SPECT extra
  GFR_Left?: number;
  GFR_Right?: number;
  // Bone density
  inhaledDose?: string;
  inhalationTime?: string;
  TScore_L1_L4?: number;
  TScore_FemoralNeck?: number;
  BMD_FemoralNeck?: number;
  BMD_FemoralTroch?: number;
  seriesCount?: number;
  // Treatment
  hepatocyteUptake?: string | number;
  perfusionDefect?: string;
  // SPECT cardiac
  SSS?: number;
  SRS?: number;
  // SPECT liver
  biliaryExcretion?: string;
  T_half_胆道排泄?: string;
  // Generic
  notes?: string;
}

export interface Report {
  id: string;
  examId: string;
  patientId: string;
  patientName: string;
  examType: 'PET/CT' | 'SPECT' | '核素治疗' | '骨密度';
  examDate: string;
  reportDate?: string;
  status: '待书写' | '待审核' | '已审核' | '已发布';
  doctor: string;
  reviewer?: string;
  // PET/CT specific
  indication?: string;
  technique?: string;
  findings?: string;
  conclusion?: string;
  SUVmax?: number;
  SUVpeak?: number;
  liverBackground?: number;
  // SPECT specific
  radiopharmaceutical?: string;
  injectedDose?: string;
  imageFindings?: string;
  scanQuality?: string;
  // Treatment
  treatmentPlan?: string;
  treatmentDose?: string;
  // Image references
  imageCount?: number;
  seriesCount?: number;
  // Bone density DXA
  BMD_L1_L4?: number;
  BMD_T_Score?: number;
  BMD_Z_Score?: number;
  BMD_FemoralNeck?: number;
  BMD_FemoralTroch?: number;
  // SPECT kidney
  GFR_Left?: number;
  GFR_Right?: number;
  // SPECT cardiac
  SSS?: number;
  SRS?: number;
  // PET/CT
  cerebellumSUV?: number;
  // SPECT liver
  biliaryExcretion?: string;
  T_half_胆道排泄?: string;
}

export interface NuclearDrug {
  id: string;
  name: string;
  isotope: string;
  halfLife: string;
  category: '诊断用药' | '治疗用药';
  supplier: string;
  batchNo: string;
  inventoryCount: number;
  unit: string;
  expiryDate: string;
  storageCondition: string;
  licenseNo: string;
  lastUpdate: string;
}

export interface DrugDistribution {
  id: string;
  drugId: string;
  drugName: string;
  patientId: string;
  patientName: string;
  examId: string;
  distributedDose: number;
  unit: string;
  distributedTime: string;
  distributedBy: string;
  status: '待分装' | '已分装' | '已注射' | '已废弃';
  residualDose?: number;
  wasteHandling?: string;
}

export interface RadiationDose {
  id: string;
  staffId: string;
  staffName: string;
  department: string;
  month: string;
  deepDose: number;
  shallowDose: number;
  extremityDose: number;
  cumulativeYear: number;
  threshold: number;
  status: '正常' | '关注' | '超标';
  measurementDate: string;
  monitorNo: string;
}

export interface QCRecord {
  id: string;
  deviceId: string;
  deviceName: string;
  qcType: '设备质控' | '图像质控' | '剂量校准' | '日常校准' | '均匀性测试' | '旋转中心';
  qcDate: string;
  result: '合格' | '不合格' | '待复测';
  items: {
    name: string;
    value: number;
    standard: string;
    pass: boolean;
  }[];
  performedBy: string;
  nextQCDate?: string;
  notes?: string;
}

export interface WorkloadStat {
  month: string;
  petct: number;
  spect: number;
  boneDensity: number;
  nuclearTherapy: number;
}

export interface SidebarItem {
  label: string;
  key: string;
  icon: string;
  path: string;
}

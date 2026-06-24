
export type Language = 'kn' | 'en';

export enum AppTab {
  SCAN = 'scan',
  MONITOR = 'monitor',
  ADVISORY = 'advisory',
  RECORDS = 'records',
  EXPERT = 'expert'
}

export interface DiseaseResult {
  diseaseName: string;
  kannadaName: string;
  confidence: number;
  description: string;
  kannadaDescription: string;
  actions: string[];
  kannadaActions: string[];
}

export interface EnvData {
  temperature: number;
  humidity: number;
  timestamp: string;
}

export interface BatchRecord {
  id: string;
  startDate: string;
  breed: string;
  yieldKgs: number;
  lossPercentage: number;
}

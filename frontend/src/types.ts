export type ScreenState = 'home' | 'input' | 'loading' | 'result' | 'next-step' | 'dashboard';

export type EmergencyCategory =
  | 'fire'
  | 'electrical'
  | 'flood'
  | 'gas'
  | 'medical'
  | 'earthquake'
  | 'chemical'
  | 'custom';

export type RiskLevel =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL'
  | 'MODERATE';

export type SpecializedToolType =
  | 'pass_fire'
  | 'cpr'
  | 'tourniquet'
  | 'choking_heimlich'
  | 'electrical_breaker'
  | 'gas_perimeter'
  | 'flood_depth'
  | 'chemical_flush'
  | 'earthquake_sweep';

export interface EmergencyTranslation {
  lang: string;
  langCode: string;
  nativeName: string;
  flag: string;
  headline: string;
  primaryAction: string;
  warning: string;
}

export interface ApiAnalyzeRequest {
  message: string;
  imageBase64?: string;
  imageMimeType?: string;
}

export interface ApiAnalyzeResponse {
  emergency_type: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  immediate_actions: string[];
  avoid_actions: string[];
  next_step: string;
  needs_emergency_services: boolean;
}

export interface EmergencyResponse {
  emergencyType: string;
  riskLevel: RiskLevel;
  summary: string;
  doNow: string[];
  avoid: string[];
  nextStep: string;
  category?: EmergencyCategory;
  userDescription?: string;
  detailedNextSteps?: string[];
  emergencyNumber?: string;
  keySafetyRule?: string;
  dispatchScript?: string;
  specializedToolType?: SpecializedToolType;
  translations?: EmergencyTranslation[];
  needsEmergencyServices?: boolean;
  uploadedImage?: string;
}

// Alias for backwards compatibility
export type AssessmentResult = EmergencyResponse;




import { ApiAnalyzeRequest, ApiAnalyzeResponse, EmergencyResponse, RiskLevel, EmergencyCategory, SpecializedToolType } from '../types';
import { getAssessmentForQuery } from '../data/mockScenarios';

/**
 * Maps an API response to the rich EmergencyResponse structure for the UI
 */
export function mapApiResponseToAssessment(
  apiData: ApiAnalyzeResponse,
  userDescription: string,
  categoryHint?: EmergencyCategory,
  uploadedImage?: string
): EmergencyResponse {
  const typeStr = (apiData.emergency_type || '').toLowerCase();
  const rawRisk = (apiData.risk_level || 'high').toUpperCase() as RiskLevel;

  // Infer specialized tool type based on emergency_type and actions
  let toolType: SpecializedToolType | undefined;
  let category: EmergencyCategory = 'custom';

  if (typeStr.includes('cpr') || typeStr.includes('cardiac') || typeStr.includes('heart') || typeStr.includes('unconscious')) {
    toolType = 'cpr';
    category = 'medical';
  } else if (typeStr.includes('chok') || typeStr.includes('heimlich') || typeStr.includes('airway')) {
    toolType = 'choking_heimlich';
    category = 'medical';
  } else if (typeStr.includes('bleed') || typeStr.includes('tourniquet') || typeStr.includes('arterial')) {
    toolType = 'tourniquet';
    category = 'medical';
  } else if (typeStr.includes('electric') || typeStr.includes('power line') || typeStr.includes('wire') || typeStr.includes('spark')) {
    toolType = 'electrical_breaker';
    category = 'electrical';
  } else if (typeStr.includes('gas') || typeStr.includes('methane') || typeStr.includes('rotten egg')) {
    toolType = 'gas_perimeter';
    category = 'gas';
  } else if (typeStr.includes('flood') || typeStr.includes('pipe') || typeStr.includes('water')) {
    toolType = 'flood_depth';
    category = 'flood';
  } else if (typeStr.includes('chemical') || typeStr.includes('acid') || typeStr.includes('bleach') || typeStr.includes('toxic')) {
    toolType = 'chemical_flush';
    category = 'chemical';
  } else if (typeStr.includes('earthquake') || typeStr.includes('shaking') || typeStr.includes('tremor')) {
    toolType = 'earthquake_sweep';
    category = 'earthquake';
  } else if (typeStr.includes('fire') || typeStr.includes('smoke') || typeStr.includes('grease')) {
    toolType = 'pass_fire';
    category = 'fire';
  } else if (categoryHint && categoryHint !== 'custom') {
    category = categoryHint;
  }

  // Format headline title
  const formattedTitle =
    apiData.emergency_type.charAt(0).toUpperCase() + apiData.emergency_type.slice(1);
  const emergencyTypeTitle = formattedTitle.toLowerCase().includes('emergency')
    ? formattedTitle
    : `${formattedTitle} Emergency Protocol`;

  // Construct standard summary
  const summary =
    apiData.immediate_actions.length > 0
      ? `Priority life-safety sequence initiated for ${apiData.emergency_type}. Follow the immediate actions strictly in order to minimize risk.`
      : 'Immediate crisis response protocol active. Follow real-world directives below.';

  // Construct standard dispatch script
  const dispatchScript = `OPERATOR: "I am reporting an urgent ${apiData.emergency_type} emergency. Location hazard is active. Immediate actions are underway. Please dispatch emergency response units immediately."`;

  // Construct translations
  const translations = [
    {
      lang: 'Spanish',
      langCode: 'es-ES',
      nativeName: 'Español',
      flag: '🇪🇸',
      headline: `¡ALERTA DE EMERGENCIA: ${formattedTitle.toUpperCase()}!`,
      primaryAction: apiData.immediate_actions[0] || 'Evacúen de inmediato a un lugar seguro.',
      warning: apiData.avoid_actions[0] || 'No se acerquen a la zona de peligro.',
    },
    {
      lang: 'Mandarin',
      langCode: 'zh-CN',
      nativeName: '中文',
      flag: '🇨🇳',
      headline: `紧急警报：${formattedTitle.toUpperCase()}`,
      primaryAction: apiData.immediate_actions[0] || '请立即撤离至安全区域。',
      warning: apiData.avoid_actions[0] || '切勿靠近危险区域。',
    },
    {
      lang: 'French',
      langCode: 'fr-FR',
      nativeName: 'Français',
      flag: '🇫🇷',
      headline: `ALERTE D'URGENCE : ${formattedTitle.toUpperCase()}`,
      primaryAction: apiData.immediate_actions[0] || 'Évacuez immédiatement vers un lieu sûr.',
      warning: apiData.avoid_actions[0] || 'Ne vous approchez pas de la zone dangereuse.',
    },
    {
      lang: 'Hindi',
      langCode: 'hi-IN',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      headline: `आपातकालीन चेतावनी: ${formattedTitle.toUpperCase()}`,
      primaryAction: apiData.immediate_actions[0] || 'तुरंत सुरक्षित स्थान पर जाएं।',
      warning: apiData.avoid_actions[0] || 'खतरे के क्षेत्र में न जाएं।',
    },
    {
      lang: 'Arabic',
      langCode: 'ar-SA',
      nativeName: 'العربية',
      flag: '🇸🇦',
      headline: `تنبيه طوارئ: ${formattedTitle.toUpperCase()}`,
      primaryAction: apiData.immediate_actions[0] || 'أخلوا المكان فوراً إلى منطقة آمنة.',
      warning: apiData.avoid_actions[0] || 'لا تقتربوا من منطقة الخطر.',
    },
    {
      lang: 'Tagalog',
      langCode: 'fil-PH',
      nativeName: 'Tagalog',
      flag: '🇵🇭',
      headline: `BABALA SA EMERHENSIYA: ${formattedTitle.toUpperCase()}`,
      primaryAction: apiData.immediate_actions[0] || 'Lumikas kaagad sa ligtas na lugar.',
      warning: apiData.avoid_actions[0] || 'Huwag lumapit sa mapanganib na lugar.',
    },
  ];

  return {
    emergencyType: emergencyTypeTitle,
    riskLevel: rawRisk,
    summary,
    doNow: apiData.immediate_actions,
    avoid: apiData.avoid_actions,
    nextStep: apiData.next_step,
    category,
    userDescription,
    emergencyNumber: apiData.needs_emergency_services ? '911' : undefined,
    needsEmergencyServices: apiData.needs_emergency_services,
    keySafetyRule: apiData.avoid_actions[0] ? `STRICT PROHIBITION: Avoid ${apiData.avoid_actions[0]}` : undefined,
    dispatchScript,
    specializedToolType: toolType,
    detailedNextSteps: [
      apiData.next_step,
      'Maintain an exclusion perimeter around the hazard area.',
      'Provide concise, factual situational briefing to arriving first responders.',
      'Check that all occupants or bystanders are safely accounted for.',
    ],
    translations,
    uploadedImage,
  };
}

/**
 * Call the POST /api/analyze endpoint with automatic fallback
 */
export async function analyzeEmergencyQuery(
  message: string,
  categoryHint?: EmergencyCategory,
  imageBase64?: string,
  imageMimeType?: string
): Promise<EmergencyResponse> {
  const trimmed = message.trim();

  try {
    const payload: ApiAnalyzeRequest = {
      message: trimmed,
      imageBase64,
      imageMimeType,
    };
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: ApiAnalyzeResponse = await response.json();
    return mapApiResponseToAssessment(data, trimmed, categoryHint, imageBase64);
  } catch (err) {
    console.warn('API call to /api/analyze failed, using fallback engine:', err);
    // Instant fallback to local deterministic triage engine
    const fallback = getAssessmentForQuery(trimmed, categoryHint);
    return {
      ...fallback,
      uploadedImage: imageBase64,
    };
  }
}

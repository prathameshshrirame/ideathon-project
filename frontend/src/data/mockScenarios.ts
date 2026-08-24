import { EmergencyResponse, EmergencyCategory, EmergencyTranslation } from '../types';

const generateTranslations = (
  esHead: string, esAct: string, esWarn: string,
  zhHead: string, zhAct: string, zhWarn: string,
  frHead: string, frAct: string, frWarn: string,
  hiHead: string, hiAct: string, hiWarn: string,
  arHead: string, arAct: string, arWarn: string,
  filHead: string, filAct: string, filWarn: string,
): EmergencyTranslation[] => [
  {
    lang: 'Spanish',
    langCode: 'es-ES',
    nativeName: 'Español',
    flag: '🇪🇸',
    headline: esHead,
    primaryAction: esAct,
    warning: esWarn,
  },
  {
    lang: 'Mandarin',
    langCode: 'zh-CN',
    nativeName: '中文',
    flag: '🇨🇳',
    headline: zhHead,
    primaryAction: zhAct,
    warning: zhWarn,
  },
  {
    lang: 'French',
    langCode: 'fr-FR',
    nativeName: 'Français',
    flag: '🇫🇷',
    headline: frHead,
    primaryAction: frAct,
    warning: frWarn,
  },
  {
    lang: 'Hindi',
    langCode: 'hi-IN',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    headline: hiHead,
    primaryAction: hiAct,
    warning: hiWarn,
  },
  {
    lang: 'Arabic',
    langCode: 'ar-SA',
    nativeName: 'العربية',
    flag: '🇸🇦',
    headline: arHead,
    primaryAction: arAct,
    warning: arWarn,
  },
  {
    lang: 'Tagalog',
    langCode: 'fil-PH',
    nativeName: 'Tagalog',
    flag: '🇵🇭',
    headline: filHead,
    primaryAction: filAct,
    warning: filWarn,
  },
];

/**
 * 1. GENERAL STRUCTURE FIRE & SMOKE
 */
export const FIRE_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Structure Fire & Heavy Smoke Hazard',
  riskLevel: 'HIGH',
  summary: 'Active combustion produces toxic carbon monoxide, cyanide gases, and superheated thermal layers. Rapid evacuation takes absolute precedence over property salvage.',
  doNow: [
    'Drop low to the floor immediately where breathable air and visibility are highest',
    'Alert all building occupants in a clear, commanding voice ("FIRE! EVACUATE NOW!")',
    'Feel doors with the back of your hand before opening; if hot, keep closed and use an alternate escape route',
    'Exit swiftly, closing interior doors behind you to compartmentalize and slow fire propagation',
    'Dial 911 immediately from a safe outdoor distance once outside the structure',
  ],
  avoid: [
    'Walking upright through heavy smoke or thermal ceiling layers',
    'Using elevators under any circumstances during an active alarm or fire',
    'Returning inside to retrieve laptops, wallets, pets, or personal belongings',
    'Opening warm doors or windows that could draw fresh oxygen into a developing fire',
  ],
  nextStep: 'Assemble at your predetermined outdoor muster point and conduct a headcount.',
  category: 'fire',
  detailedNextSteps: [
    'Position yourself at least 150 feet upwind from the building to prevent smoke inhalation.',
    'Do not re-enter the structure under any circumstances until the Fire Incident Commander gives clearance.',
    'Brief arriving firefighters on the exact room of origin, trapped persons, and hazardous materials.',
    'Contact regional disaster assistance (Red Cross / insurance) once safety is secured.',
  ],
  keySafetyRule: 'Smoke and superheated toxic gases kill far faster than flames — stay crawl-low under the smoke layer.',
  emergencyNumber: '911',
  specializedToolType: 'pass_fire',
  dispatchScript: 'OPERATOR: "I am reporting an active structure fire with heavy smoke. Occupants are evacuating on foot. We are moving outdoors to the muster point. Please dispatch fire and rescue engines immediately."',
  translations: generateTranslations(
    '¡FUEGO! EVACÚEN DE INMEDIATO', 'Arrastrense por el suelo debajo del humo y salgan.', 'No usen ascensores ni vuelvan por pertenencias.',
    '火警！立即撤离', '趴在地面贴地前行，迅速离开建筑物。', '严禁使用电梯，切勿返回取物。',
    'AU FEU ! ÉVACUEZ IMMÉDIATEMENT', 'Rampez au sol sous la fumée et sortez.', 'N\'utilisez jamais les ascenseurs.',
    'आग लगी है! तुरंत बाहर निकलें', 'धुएं से बचने के लिए फर्श के पास झुकें और बाहर निकलें।', 'लिफ्ट का उपयोग न करें।',
    'حريق! إخلاء فوري', 'ازحفوا على الأرض تحت الدخان واخرجوا فوراً.', 'لا تستخدموا المصاعد مطلقاً.',
    'SUNOG! LUMIKAS KAAGAD', 'Gumapang nang mababa sa ilalim ng usok at lumabas.', 'Huwag gumamit ng elevator.'
  ),
};

/**
 * 2. KITCHEN / GREASE / OIL STOVE FIRE
 */
export const KITCHEN_FIRE_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Kitchen Grease & Stove Fire',
  riskLevel: 'HIGH',
  summary: 'Cooking oil fires burn above 600°F (315°C). Adding water causes instantaneous explosive steam vaporization, scattering fireball droplets across the kitchen.',
  doNow: [
    'NEVER use water on a burning grease pan — slide a metal lid, cookie sheet, or large pot cover over the pan',
    'Turn OFF the stove burner heat knob immediately if accessible without reaching over flames',
    'If the fire is inside an oven or microwave, keep the appliance door tightly closed and turn off the power',
    'Use a Class K or Class B dry chemical fire extinguisher if the fire spreads beyond the cookware',
    'Evacuate immediately and dial 911 if the fire reaches kitchen cabinets, curtains, or ceiling',
  ],
  avoid: [
    'Throwing water, wet towels, flour, or baking powder onto burning grease (instant fireball risk)',
    'Picking up or moving a flaming pan (spills burning liquid onto floors and skin)',
    'Opening oven or microwave doors while flames are actively burning inside',
    'Attempting to blow out oil flames with your breath or fan them with towels',
  ],
  nextStep: 'Leave the cookware covered to cool completely for at least 30 minutes; do not remove the lid.',
  category: 'fire',
  detailedNextSteps: [
    'Leave the metal lid in place until the pan has cooled to room temperature (removing early re-ignites oxygen flash).',
    'Inspect surrounding wooden cabinets and range hoods for hidden ember ignition.',
    'Ventilate lingering smoke only after verifying the combustion source is 100% extinguished.',
    'Have the appliance checked by a certified repair technician before restoring gas or electrical power.',
  ],
  keySafetyRule: 'WATER + GREASE FIRE = EXPLOSION. Smother flames with a metal lid or Class B/K extinguisher only.',
  emergencyNumber: '911',
  specializedToolType: 'pass_fire',
  dispatchScript: 'OPERATOR: "I am reporting a Class B kitchen grease stove fire. Heat source has been turned off and we are smothering flames with a metal cover. Please dispatch engine in case of cabinet extension."',
  translations: generateTranslations(
    '¡FUEGO DE GRASA EN COCINA! NO AGUA', 'Cubran la sartén con una tapa metálica y apaguen el quemador.', '¡NUNCA tiren agua sobre aceite caliente!',
    '厨房油脂着火！切勿泼水', '用金属锅盖盖住油锅，并关闭燃气灶。', '严禁向滚油中泼水，会引发剧烈爆炸！',
    'FEU DE GRAISSE DE CUISINE ! PAS D\'EAU', 'Couvrez la poêle avec un couvercle métallique et éteignez le feu.', 'Ne jetez jamais d\'eau sur l\'huile chaude !',
    'रसोई के तेल की आग! पानी न डालें', 'पैन को धातु के ढक्कन से ढकें और बर्नर बंद करें।', 'गर्म तेल पर कभी भी पानी न डालें!',
    'حريق زيت في المطبخ! لا تستخدموا الماء', 'غطوا المقلاة بغطاء معدني وأغلقوا الموقد.', 'لا تسكبوا الماء على الزيت الساخن مطلقاً!',
    'SUNOG SA MANTIKA! HUWAG TUBIG', 'Takpan ng metal na takip ang kawali at patayin ang kalan.', 'Huwag kailanman magbuhos ng tubig sa mantika!'
  ),
};

/**
 * 3. ELECTRICAL SPARKING & PANEL HAZARDS
 */
export const ELECTRICAL_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Electrical Arcing & Panel Short Circuit',
  riskLevel: 'HIGH',
  summary: 'Energized electrical shorts deliver lethal voltage and ignite structural framing behind walls. Electric current travels through metallic conduits, wet floors, and plumbing.',
  doNow: [
    'Maintain a minimum 10-foot safety perimeter from sparking outlets, burning cords, or humming panels',
    'Shut off the main electrical breaker ONLY if the panel is located in a completely dry, unobstructed zone',
    'Unplug nearby non-sparking devices on other circuits to prevent electrical cascade surge damage',
    'Call emergency dispatch (911) or utility emergency service immediately if sparks persist or walls smell hot',
  ],
  avoid: [
    'Touching energized wires, smoking outlets, or metallic conduit directly with bare hands or tools',
    'Throwing water or using water-based fire extinguishers on active electrical fixtures (Class C only)',
    'Standing in damp basements, wet bathroom tile, or puddles near the electrical source',
    'Resetting a circuit breaker that repeatedly trips with an audible arc or burning odor',
  ],
  nextStep: 'Isolate the breaker branch and wait for licensed utility electricians to inspect the circuit.',
  category: 'electrical',
  detailedNextSteps: [
    'Keep children, pets, and bystanders completely out of the affected room or utility closet.',
    'Feel drywall adjacent to outlets for unusual warmth indicating internal wall stud smoldering.',
    'Do not restore main service power until a licensed electrician certifies insulation resistance.',
    'Document tripped breakers and damaged appliances for emergency electrical inspection reports.',
  ],
  keySafetyRule: 'Never apply water to energized electrical fixtures — electrocution can occur through the water stream.',
  emergencyNumber: '911',
  specializedToolType: 'electrical_breaker',
  dispatchScript: 'OPERATOR: "I am reporting an electrical arc short circuit with active sparking and burning odor. Breaker area is being secured. No water is being applied. Please dispatch fire service for thermal wall check."',
  translations: generateTranslations(
    '¡PELIGRO ELÉCTRICO! NO TOQUEN', 'Mantengan 3 metros de distancia y no usen agua.', 'Desconecten la corriente solo si el suelo está seco.',
    '电气火花与触电危险！', '保持至少3米安全距离，切勿触碰或泼水。', '仅在地面完全干燥时关闭总闸。',
    'DANGER ÉLECTRIQUE ! NE PAS TOUCHER', 'Gardez 3 mètres de distance et n\'utilisez pas d\'eau.', 'Coupez le disjoncteur uniquement si le sol est sec.',
    'बिजली का खतरा! न छुएं', 'कम से कम 3 मीटर की दूरी बनाए रखें और पानी न डालें।', 'फर्श सूखा होने पर ही मुख्य स्विच बंद करें।',
    'خطر كهربائي! لا تلمسوا الأسلاك', 'حافظوا على مسافة 3 أمتار ولا تستخدموا الماء.', 'افصلوا القاطع فقط إذا كانت الأرضية جافة تماماً.',
    'PANGANIB SA KURYENTE! HUWAG HAWAKAN', 'Lumayo nang hindi bababa sa 3 metro at huwag buhusan ng tubig.', 'Patayin ang main breaker kung tuyo ang sahig.'
  ),
};

/**
 * 4. DOWNED POWER LINE
 */
export const DOWNED_POWER_LINE_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Downed High-Voltage Power Line',
  riskLevel: 'CRITICAL',
  summary: 'Fallen distribution lines energize the surrounding earth with dangerous ground voltage gradients. Current arcs through wet asphalt, chain link fences, and puddles.',
  doNow: [
    'Stay at least 35 feet (11 meters) away from any downed wire and any tree branches or fences touching it',
    'Assume ALL downed overhead lines are energized and lethal, even if not buzzing, arcing, or smoking',
    'If a wire falls on your vehicle: STAY INSIDE your car — the rubber tires insulate you safely from ground current',
    'If your car catches fire and you must escape: jump clear without touching car and ground at the same time, landing with both feet together',
    'Shuffle away with small, sliding steps keeping both feet in constant contact with the ground to prevent step potential shock',
    'Call 911 and the regional electric utility emergency hotline immediately',
  ],
  avoid: [
    'Approaching the wire to inspect whether it is telephone, cable, or power (treat all as 7,200V+ power)',
    'Touching puddles, guardrails, wet trees, or metal fences anywhere near the downed line',
    'Stepping out of a vehicle in contact with a power line normally (creates lethal ground-circuit connection)',
    'Attempting to move the wire with wooden sticks, brooms, or ropes (high voltage arcs through dry wood)',
  ],
  nextStep: 'Maintain an enforced 35-foot perimeter and warn pedestrians until utility linemen de-energize the grid.',
  category: 'electrical',
  detailedNextSteps: [
    'Direct approaching vehicles and pedestrians away from the danger zone.',
    'Do not leave your secure perimeter until the electric utility company confirms line disconnection.',
    'Monitor for grass or brush fires ignited by arcing ground current.',
  ],
  keySafetyRule: 'Shuffle feet with small sliding steps without lifting your heels to eliminate step-potential electrocution.',
  emergencyNumber: '911',
  specializedToolType: 'electrical_breaker',
  dispatchScript: 'OPERATOR: "I am reporting a downed high-voltage overhead power line on the ground. We are holding a 35-foot safety perimeter. Please dispatch utility linemen and emergency responders immediately."',
  translations: generateTranslations(
    '¡CABLE DE ALTA TENSIÓN CAÍDO! PELIGRO MORTAL', 'Aléjense al menos 11 metros (35 pies) y arrastren los pies.', 'Si está dentro de un auto con cable encima, quédese adentro.',
    '高压电线落地！致命危险', '请远离至少11米以上，双脚贴地擦地移动。', '若电线落在车上，请留在车内切勿下车。',
    'LIGNE HAUTE TENSION TOMBÉE ! DANGER DE MORT', 'Restez à au moins 11 mètres et faites glisser vos pieds.', 'Si un fil touche votre voiture, restez à l\'intérieur.',
    'गिरा हुआ हाई वोल्टेज तार! जानलेवा खतरा', 'कम से कम 11 मीटर दूर रहें और पैर घसीट कर चलें।', 'यदि कार पर तार गिरा है, तो अंदर ही रहें।',
    'سلك كهرباء عالي الجهد ساقط! خطر مميت', 'ابقوا على بعد 11 متراً على الأقل وازحفوا بأقدامكم.', 'إذا سقط السلك على سيارتك، ابقَ بداخلها.',
    'BAGSAK NA HIGH-VOLTAGE WIRE! NAKAMAMATAY', 'Lumayo nang hindi bababa sa 11 metro at ikayod ang paa sa lupa.', 'Kung nasa loob ng kotse, huwag munang lumabas.'
  ),
};

/**
 * 5. FLASH FLOOD & OUTDOOR RISING WATERS
 */
export const FLOOD_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Rising Floodwaters & Flash Flood Hazard',
  riskLevel: 'HIGH',
  summary: 'Rapidly rising water destroys structural foundations, carries hidden debris, conceals submerged electrical lines, and introduces contaminated biological runoff.',
  doNow: [
    'Move immediately to the highest accessible floor, roof access, or elevated dry terrain',
    'Shut off the main electrical service panel ONLY if it is situated in a completely dry, elevated location',
    'Gather emergency go-bag: identification, essential prescription medications, waterproof phone, and flashlight',
    'Listen to NOAA Emergency Radio or local emergency management broadcast for mandatory evacuation routes',
    'Call 911 if trapped by rising water levels inside your structure',
  ],
  avoid: [
    'Walking, wading, or swimming through moving flood water (just 6 inches of water knocks down an adult)',
    'Driving cars or SUVs through flooded roadways (12 inches of water carries small cars; 24 inches carries trucks)',
    'Entering basements or submerged crawlspaces where water is actively accumulating',
    'Touching wall switches, electrical cords, or electronic appliances while standing in damp areas',
  ],
  nextStep: 'Monitor official emergency evacuation bulletins and prepare for rooftop extraction if water continues rising.',
  category: 'flood',
  detailedNextSteps: [
    'Keep your mobile phone charged and in battery-saver mode for emergency SOS location beacons.',
    'Do not return to submerged floors until utility providers certify gas and electrical lines are isolated.',
    'Assume all floodwater contains pathogenic sewage, agricultural runoff, and chemical biohazards.',
    'Photograph high-water marks for FEMA / insurance disaster documentation once conditions stabilize.',
  ],
  keySafetyRule: 'Turn Around, Don’t Drown — over 50% of flood fatalities occur in vehicles traversing flooded roads.',
  emergencyNumber: '911',
  specializedToolType: 'flood_depth',
  dispatchScript: 'OPERATOR: "I am reporting rapidly rising flash floodwaters entering the property. Occupants are moving to the upper elevation/roof with go-bag. Please record our coordinates for water rescue dispatch."',
  translations: generateTranslations(
    '¡INUNDACIÓN REPENTINA! BUSQUEN TERRENO ALTO', 'Suban a pisos altos o techo y no caminen por el agua.', '¡No manejen por carreteras inundadas!',
    '突发洪水！立即转移至高处', '请迅速前往高楼层或屋顶，切勿在洪水中步行。', '切勿驾车涉水，极易被冲走！',
    'INONDATION SOUDAINE ! GAGNEZ LES HAUTEURS', 'Montez aux étages supérieurs et ne marchez pas dans l\'eau.', 'Ne conduisez jamais sur des routes inondées !',
    'बाढ़ का खतरा! ऊंचे स्थान पर जाएं', 'तुरंत ऊपरी मंजिल या छत पर जाएं और पानी में न चलें।', 'बाढ़ वाली सड़कों पर गाड़ी न चलाएं!',
    'فيضان مفاجئ! اصعدوا إلى مكان مرتفع', 'اصعدوا إلى الطوابق العليا أو السطح ولا تمشوا في الماء.', 'لا تقودوا السيارات في الشوارع المغمورة بالمياه!',
    'BAHA! UMAKYAT SA MATATAAS NA LUGAR', 'Umakyat sa mataas na palapag o bubong at huwag lumusong sa baha.', 'Huwag magmaneho sa binabahang daan!'
  ),
};

/**
 * 6. INDOOR PIPE BURST & WATER BREACH
 */
export const BURST_PIPE_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Catastrophic Indoor Water Pipe Breach',
  riskLevel: 'HIGH',
  summary: 'Pressurized water line failure causes rapid ceiling collapse, electrical short circuits, and massive drywall saturation with mold hazard.',
  doNow: [
    'Locate and rotate the main municipal water shutoff valve clockwise until completely closed',
    'Cut off power breakers to the flooded zone ONLY if the breaker panel is bone-dry and isolated',
    'Move valuable electronics, furniture, and personal items out of the water path immediately',
    'Place buckets and puncture a tiny relief pinhole in sagging drywall ceiling bulges to prevent catastrophic ceiling drop',
    'Call an emergency licensed plumber and water damage restoration crew',
  ],
  avoid: [
    'Standing directly under water-logged sagging plaster or sheetrock ceilings (imminent collapse)',
    'Using standard household vacuum cleaners to suck up water (extreme electrocution hazard)',
    'Turning on ceiling fans, light fixtures, or chandeliers that have water dripping through them',
    'Entering flooded basements where water depth reaches the level of electrical wall outlets',
  ],
  nextStep: 'Begin extraction with wet/dry commercial pumps and open windows for dehumidification once power is safe.',
  category: 'flood',
  detailedNextSteps: [
    'Open interior faucets at the lowest point of the home to drain remaining pipe pressure.',
    'Take clear video and photo inventory of all damaged structural elements and personal property.',
    'Deploy industrial fans and dehumidifiers within 24 hours to prevent black toxic mold (Stachybotrys).',
    'Contact your homeowner / property insurance provider to file an urgent emergency water claim.',
  ],
  keySafetyRule: 'Shut off the main water valve first before attempting any cleanup or furniture relocation.',
  emergencyNumber: '911',
  specializedToolType: 'flood_depth',
  dispatchScript: 'OPERATOR: "I am reporting an indoor pressurized water main line burst causing active flooding and electrical short risk. Water shutoff is underway. Requesting emergency assistance."',
  translations: generateTranslations(
    '¡ROTURA DE TUBERÍA! CIERREN LA LLAVE PRINCIPAL', 'Cierren la válvula de agua principal y desconecten la luz si el panel está seco.', '¡Cuidado con techos de yeso a punto de colapsar!',
    '室内水管爆裂！立即关闭水阀总闸', '顺时针旋紧水管总阀，干燥前提下切断区域电源。', '远离下坠积水的石膏天花板！',
    'RUPTURE DE CANALISATION ! COUPEZ L\'EAU', 'Fermez la vanne d\'eau principale et coupez l\'électricité.', 'Attention aux plafonds gorgés d\'eau !',
    'पाइप फट गया! मुख्य वाल्व बंद करें', 'पानी का मुख्य वाल्व तुरंत बंद करें और बिजली काटें।', 'झुकती हुई छत के नीचे खड़े न हों!',
    'انفجار أنبوب مياه! أغلقوا المحبس الرئيسي', 'أغلقوا محبس المياه الرئيسي فوراً وافصلوا الكهرباء إذا كانت آمنة.', 'احذروا من انهيار الأسقف الممتلئة بالماء!',
    'PUMUTOK NA TUBO! ISARA ANG MAIN VALVE', 'Isara agad ang pangunahing gripo ng tubig at patayin ang breaker kung tuyo.', 'Umiwas sa lumalaylay na kisame!'
  ),
};

/**
 * 7. NATURAL GAS LEAK
 */
export const GAS_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Natural Gas Leak Hazard (Mercaptan Odor)',
  riskLevel: 'CRITICAL',
  summary: 'Natural gas forms an invisible, highly explosive atmospheric fuel-air mixture. The smallest spark from a light switch, static friction, or doorbell can trigger a massive blast.',
  doNow: [
    'Evacuate all occupants and pets from the structure immediately on foot without delay',
    'Leave exterior entry doors wide open behind you as you exit to assist vapor dissipation',
    'Move at least 300 feet (100 meters) upwind and uphill from the building perimeter',
    'Call 911 and your regional gas utility emergency dispatch from a safe outdoor distance',
  ],
  avoid: [
    'Flipping any light switches, electrical breakers, or appliance controls ON or OFF (sparks)',
    'Using smartphones, flashlights, or garage door openers inside the contaminated structure',
    'Starting motor vehicles or gas equipment parked near the building',
    'Striking matches, lighters, smoking, or creating any friction sparks',
    'Searching for the gas leak source yourself inside the building',
  ],
  nextStep: 'Remain at a secure outdoor perimeter and prevent others from entering the zone.',
  category: 'gas',
  detailedNextSteps: [
    'Warn approaching neighbors, delivery drivers, and pedestrians to maintain a 300-foot safety radius.',
    'Wait for fire department and gas utility technicians to measure combustible gas LEL concentrations.',
    'Never re-enter the building until gas utility technicians certify 0% gas saturation with calibrated detectors.',
  ],
  keySafetyRule: 'DO NOT toggle light switches or use electronics inside — the tiny contact arc can detonate gas vapor.',
  emergencyNumber: '911',
  specializedToolType: 'gas_perimeter',
  dispatchScript: 'OPERATOR: "I am reporting a severe natural gas leak with strong sulfur odor. Building occupants have evacuated outdoors to a 300-foot perimeter. No light switches were touched. Please dispatch HazMat and gas utility."',
  translations: generateTranslations(
    '¡FUGA DE GAS! NO TOQUEN INTERRUPTORES', 'Evacúen de inmediato a 100 metros contra el viento.', '¡No prendan luces, fósforos ni celulares adentro!',
    '燃气泄漏！切勿触碰开关', '立即步行撤离至100米外上风处安全区域。', '严禁开灯、按门铃或在室内使用手机！',
    'FUITE DE GAZ ! NE TOUCHEZ À AUCUN INTERRUPTEUR', 'Évacuez immédiatement à 100 mètres face au vent.', 'N\'allumez aucune lumière ni téléphone à l\'intérieur !',
    'गैस रिसाव! कोई भी स्विच न छुएं', 'तुरंत इमारत से 100 मीटर दूर खुली हवा में जाएं।', 'अंदर लाइट का स्विच या फोन न चलाएं!',
    'تسرب غاز! لا تلمسوا مفاتيح الكهرباء', 'أخلوا المكان فوراً وابتعدوا 100 متر في عكس اتجاه الرياح.', 'لا تشعلوا الأنوار أو تستخدموا الهواتف بالداخل!',
    'SINGAW NG GAS! HUWAG PUMINDOT NG SWITCH', 'Lumikas agad sa layong 100 metro sa direksyon ng hangin.', 'Huwag bubuksan ang ilaw o gagamit ng cellphone sa loob!'
  ),
};

/**
 * 8. CARBON MONOXIDE (CO) ALERT
 */
export const CARBON_MONOXIDE_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Carbon Monoxide (CO) Poisoning Alert',
  riskLevel: 'CRITICAL',
  summary: 'Carbon monoxide is completely colorless, odorless, and tasteless. It displaces oxygen in red blood cells, causing headache, confusion, unconsciousness, and asphyxiation.',
  doNow: [
    'Evacuate all family members and pets to open-air outdoor fresh air immediately',
    'Open exterior doors and accessible windows as you exit ONLY if doing so takes under 5 seconds',
    'Check if any household member experiences headache, dizziness, nausea, chest tightness, or confusion',
    'Call 911 and request emergency medical services (EMS) and fire department gas monitoring',
  ],
  avoid: [
    'Assuming a CO alarm is a "false alarm" simply because you cannot smell anything',
    'Staying inside to investigate fuel-burning furnaces, heaters, water boilers, or generators',
    'Re-entering the building to retrieve personal items before the fire department clears the premises',
    'Operating portable generators, charcoal grills, or gas engines indoors or near open windows',
  ],
  nextStep: 'Have all symptomatic individuals evaluated by paramedics for carboxyhemoglobin blood levels.',
  category: 'gas',
  detailedNextSteps: [
    'Keep all evacuated persons in open fresh air while awaiting emergency responders.',
    'Inform paramedics immediately if pregnant women, infants, or elderly persons were exposed.',
    'Do not restart heating or gas appliances until a certified HVAC technician inspects the flue vent pipes.',
    'Replace batteries in all CO detectors and install units on every level of the home.',
  ],
  keySafetyRule: 'Carbon Monoxide is an invisible, odorless killer — treat every detector alarm as an immediate life threat.',
  emergencyNumber: '911',
  specializedToolType: 'gas_perimeter',
  dispatchScript: 'OPERATOR: "I am reporting an active sounding Carbon Monoxide (CO) alarm. All household members and pets have evacuated to outdoor fresh air. We request EMS oxygen check and fire department atmospheric sniffer units."',
  translations: generateTranslations(
    '¡ALARMA DE MONÓXIDO DE CARBONO! AIRE FRESCO', 'Salgan al aire libre de inmediato. El gas no tiene olor.', 'Busquen atención médica si tienen dolor de cabeza o mareos.',
    '一氧化碳警报！立即到室外呼吸新鲜空气', '一氧化碳无色无味，请立即带家人到户外。', '如有头晕、恶心症状，立即告知急救医护人员。',
    'ALERTE MONOXYDE DE CARBONE ! AIR FRAIS', 'Sortez immédiatement à l\'air libre. Le gaz est inodore.', 'Consultez les secours si vous avez des vertiges.',
    'कार्बन मोनोऑक्साइड चेतावनी! खुली हवा में जाएं', 'तुरंत सभी लोगों को बाहर खुली हवा में ले जाएं।', 'सिरदर्द या चक्कर आने पर तुरंत डॉक्टरों को बताएं।',
    'إنذار أول أكسيد الكربون! اخرجوا للهواء النقي', 'اخرجوا فوراً إلى الهواء الطلق. الغاز عديم اللون والرائحة.', 'اطلبوا الإسعاف فوراً إذا شعرتم بالدوار والصداع.',
    'CARBON MONOXIDE ALERT! LUMABAS SA SARIWANG HANGIN', 'Lumabas agad sa labas ng bahay. Walang amoy ang gas na ito.', 'Sabihin sa doktor kung nahihilo o sumasakit ang ulo.'
  ),
};

/**
 * 9. SUDDEN CARDIAC ARREST & CPR
 */
export const MEDICAL_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Sudden Cardiac Arrest / Unresponsive Patient',
  riskLevel: 'CRITICAL',
  summary: 'Cardiac arrest leads to irreversible brain injury within 4 to 6 minutes without perfusion. Immediate bystander chest compressions double or triple survival chances.',
  doNow: [
    'Dial 911 immediately and switch your phone to SPEAKERPHONE mode so your hands remain free',
    'Tap the person’s shoulders firmly and shout: "Are you okay?" Look at the chest for 5–10 seconds for normal breathing',
    'If unresponsive and not breathing normally (gasping/agonal): Place hands in center of chest and begin HARD & FAST chest compressions',
    'Compress at 100–120 beats per minute (to the beat of "Stayin’ Alive"), pressing down at least 2 inches (5 cm) deep',
    'Instruct a specific bystander: "YOU! Go find and bring back the nearest AED (Defibrillator) NOW!"',
  ],
  avoid: [
    'Delaying compressions to check for subtle wrist pulses if you are not a certified medical professional',
    'Interrupting chest compressions for more than 10 seconds at a time',
    'Giving food, liquids, or oral medications to an unconscious or seizing individual',
    'Leaving the patient unattended unless you must retrieve a life-saving AED yourself',
  ],
  nextStep: 'Continue non-stop chest compressions until the AED arrives or paramedics take over.',
  category: 'medical',
  detailedNextSteps: [
    'When the AED arrives: Open lid, turn it on immediately, and follow the spoken automated voice prompts.',
    'Apply electrode pads to bare dry chest: upper right chest below collarbone and lower left chest below armpit.',
    'Ensure NO ONE is touching the patient when the AED analyzes or delivers a shock ("CLEAR!").',
    'Resume chest compressions immediately after a shock is delivered without waiting.',
  ],
  keySafetyRule: 'Hands-Only CPR: Push hard and fast in the center of the chest (100–120 bpm) until help arrives.',
  emergencyNumber: '911',
  specializedToolType: 'cpr',
  dispatchScript: 'OPERATOR: "I am reporting an adult patient in sudden cardiac arrest. Patient is unresponsive with no normal breathing. Bystander Hands-Only CPR is actively underway with compression metronome. Please dispatch advanced life support EMS and nearest AED unit."',
  translations: generateTranslations(
    '¡PARO CARDÍACO! RCP EN CURSO', 'Presionen fuerte y rápido en el centro del pecho (100-120 por minuto).', '¡Traigan un desfibrilador (DEA) de inmediato!',
    '心脏骤停！立即进行胸外按压 (CPR)', '双手交叠在胸部中央用力快速按压（每分钟100-120次）。', '立即寻找并取回自动体外除颤器 (AED)！',
    'ARRÊT CARDIAQUE ! DÉBUTEZ LE MASSAGE', 'Appuyez fort et vite au centre de la poitrine (100-120/min).', 'Apportez un défibrillateur (DAE) au plus vite !',
    'दिल का दौरा! तुरंत सीपीआर (CPR) शुरू करें', 'छाती के बीच में दोनों हाथों से तेजी से और गहराई से दबाएं (100-120 प्रति मिनट)।', 'तुरंत डीफिब्रिलेटर (AED) मंगवाएं!',
    'سكتة قلبية! ابدأوا الإنعاش القلبي فوراً', 'اضغطوا بقوة وسرعة في منتصف الصدر (100-120 ضغطة بالدقيقة).', 'أحضروا جهاز الصدمات الكهربائية (AED) حالاً!',
    'INATAKE SA PUSO! MAG-CPR KAAGAD', 'Idiin nang mabilis at malakas ang gitna ng dibdib (100-120 bawat minuto).', 'Kumuha agad ng AED machine!'
  ),
};

/**
 * 10. SEVERE CHOKING (AIRWAY OBSTRUCTION)
 */
export const CHOKING_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Severe Airway Obstruction / Choking Emergency',
  riskLevel: 'CRITICAL',
  summary: 'Complete mechanical airway blockage prevents oxygen delivery to the lungs. Complete obstruction causes loss of consciousness in under 2 minutes.',
  doNow: [
    'Ask the victim: "Are you choking? Can you speak?" If they can cough forcefully, encourage continued coughing',
    'If the person CANNOT speak, cry, or cough: Stand behind them and wrap your arms around their waist',
    'Make a fist with one hand, place thumb-side against the middle of the abdomen, just ABOVE the navel',
    'Grasp your fist with your other hand and deliver quick, forceful UPWARD abdominal thrusts (Heimlich Maneuver)',
    'Repeat upward thrusts until the foreign object is expelled or the person becomes unconscious',
    'If the person loses consciousness: Lower them gently to the floor, call 911 immediately, and begin CPR compressions',
  ],
  avoid: [
    'Performing blind finger sweeps in the mouth (can push the obstructing object deeper into the pharynx)',
    'Giving the choking person water, liquids, or bread to "swallow it down"',
    'Slapping the back while the person is standing upright (lean them forward if delivering back blows)',
    'Hesitating to deliver firm abdominal thrusts when the airway is completely blocked',
  ],
  nextStep: 'Seek medical evaluation even after successful expulsion to verify no internal airway trauma occurred.',
  category: 'medical',
  detailedNextSteps: [
    'If performing CPR on an unconscious choking victim: Look inside the mouth each time you open the airway for compressions.',
    'If you clearly see the loose foreign object, use a hooked finger to remove it; otherwise continue compressions.',
    'Have paramedics inspect for broken ribs or internal abdominal injury following vigorous thrusts.',
  ],
  keySafetyRule: 'Deliver quick, upward abdominal thrusts above the navel — if the victim collapses, start CPR immediately.',
  emergencyNumber: '911',
  specializedToolType: 'choking_heimlich',
  dispatchScript: 'OPERATOR: "I am reporting a severe choking emergency. Complete airway obstruction with inability to speak or breathe. We are administering 5 back blows and abdominal Heimlich thrusts. Requesting emergency paramedic dispatch."',
  translations: generateTranslations(
    '¡ATRAGANTAMIENTO! MANIOBRA DE HEIMLICH', 'Colóquense detrás y den compresiones abdominales hacia arriba por encima del ombligo.', 'No metan los dedos a ciegas en la boca.',
    '窒息异物卡喉！海姆立克急救法', '站在患者身后，在肚脐上方进行有力的向内向上腹部冲击。', '严禁盲目用手指在喉咙乱抠！',
    'ÉTOUFFEMENT ! MANOEUVRE DE HEIMLICH', 'Placez-vous derrière et effectuez des poussées abdominales vers le haut.', 'N\'enfoncez pas les doigts à l\'aveugle dans la gorge.',
    'गले में फंदा / चोकिंग! हीमलिक पैंतरा', 'पीछे खड़े होकर नाभि के ऊपर तेजी से ऊपर की ओर झटका दें।', 'मुंह में उंगली डालकर अंधाधुंध निकालने की कोशिश न करें।',
    'اختناق بغصة! مناورة هيمليك', 'قفوا خلف المصاب واضغطوا بقوة للأعلى فوق السرة مباشرة.', 'لا تدخلوا الأصابع بعشوائية في الحلق.',
    'NABULUNAN! HEIMLICH MANEUVER', 'Tumayo sa likod at magbigay ng pataas na diin sa itaas ng puson.', 'Huwag kutingtingin ang lalamunan ng daliri.'
  ),
};

/**
 * 11. SEVERE BLEEDING & TRAUMA
 */
export const BLEEDING_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Severe Hemorrhage & Traumatic Bleeding',
  riskLevel: 'CRITICAL',
  summary: 'Arterial blood loss can lead to irreversible hypovolemic shock in under 3 minutes. Direct, continuous mechanical pressure is the primary life-saving measure.',
  doNow: [
    'Call 911 immediately and place the phone on speakerphone mode',
    'Apply FIRM, DIRECT PRESSURE to the exact bleeding wound using a clean cloth, sterile gauze, or your gloved hands',
    'Press down with maximum body weight and DO NOT let up on pressure to "check" if bleeding has stopped',
    'If blood soaks through: DO NOT remove the original cloth; place additional layers directly on top and press harder',
    'For severe limb bleeding that does not stop with direct pressure: Apply a commercial tourniquet 2–3 inches ABOVE the wound (tighten until bleeding ceases completely)',
    'Keep the patient lying down flat and cover them with a blanket to prevent hypothermic shock',
  ],
  avoid: [
    'Removing impaled objects (knives, glass, rebar) from the body (the object plugs the severed vessel)',
    'Removing the initial gauze or bandage when blood soaks through (destroys fragile blood clotting matrix)',
    'Applying tourniquets over joints (knees or elbows) — place always 2-3 inches above on single bone or limb shaft',
    'Giving the patient food, aspirin, water, or warm beverages (worsens internal surgical risk)',
  ],
  nextStep: 'Maintain uninterrupted manual pressure until emergency medical technicians take over.',
  category: 'medical',
  detailedNextSteps: [
    'Note and write down the exact time of tourniquet application (e.g., "TK 14:35") directly on the patient’s forehead or limb.',
    'Elevate legs 6 to 12 inches if no spinal or pelvic injury is suspected to support central blood pressure.',
    'Provide paramedics with estimated total blood loss volume and mechanism of traumatic injury.',
  ],
  keySafetyRule: 'Press hard and continuously directly on the wound. Do not lift the pressure dressing to peek.',
  emergencyNumber: '911',
  specializedToolType: 'tourniquet',
  dispatchScript: 'OPERATOR: "I am reporting severe arterial bleeding/hemorrhage. Continuous firm direct pressure and tourniquet application timer are active. Please dispatch trauma EMS immediately."',
  translations: generateTranslations(
    '¡HEMORRAGIA GRAVE! PRESIÓN DIRECTA', 'Presionen firmemente sobre la herida con todo el peso de su cuerpo.', '¡No quiten gasas empapadas; añadan más encima!',
    '大出血急救！强力直接压迫止血', '用干净纱布或衣物全力压住伤口，切勿松手。', '血浸透敷料时切勿掀开，直接在上方加厚按压！',
    'HÉMORRAGIE GRAVE ! PRESSION DIRECTE', 'Appuyez fermement de tout votre poids sur la plaie sans relâcher.', 'Ne retirez jamais les compresses imbibées, rajoutez-en par dessus !',
    'गंभीर रक्तस्राव! सीधा दबाव डालें', 'घाव पर पूरे शरीर के वजन के साथ लगातार कसकर दबाए रखें।', 'खून से भीगी पट्टी को न हटाएं, उसके ऊपर और कपड़ा रखें!',
    'نزيف حاد! اضغطوا بقوة على الجرح', 'اضغطوا بكل ثقلكم على مكان النزيف دون توقف.', 'لا تزيلوا الشاش الممتلئ بالدم بل ضعوا فوقه المزيد!',
    'MALAKAS NA PAGDURUGO! DIINAN NANG MADIIN', 'Diinan ang sugat gamit ang buong bigat ng katawan nang walang tigil.', 'Huwag aalisin ang basang gasa, patungan lang ng bago!'
  ),
};

/**
 * 12. EARTHQUAKE & SEISMIC TREMOR
 */
export const EARTHQUAKE_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Earthquake & Structural Seismic Hazard',
  riskLevel: 'HIGH',
  summary: 'Ground acceleration causes unanchored furniture, lighting fixtures, glass facades, and structural masonry to collapse. Most injuries occur from falling debris during active shaking.',
  doNow: [
    'DROP down onto your hands and knees immediately to prevent being knocked over by ground shockwaves',
    'COVER your head and neck under a sturdy table, desk, or against an interior wall away from glass windows',
    'HOLD ON to your shelter until the shaking completely ceases; move with your shelter if it shifts',
    'If in bed when shaking starts: Stay there, curl face down, and cover your head with pillows',
    'If outdoors: Move to a clear area away from buildings, power lines, brick facades, and overpasses',
  ],
  avoid: [
    'Running outside during active shaking (falling facade bricks, shattered glass, and cornices are lethal)',
    'Standing in doorways (modern doorways are no stronger than standard walls and do not protect from flying debris)',
    'Using elevators during or immediately following seismic tremors (entrapment & cable damage)',
    'Using open flames, matches, or lighters after shaking stops (risk of severed natural gas lines)',
  ],
  nextStep: 'Once shaking stops: Check for gas leaks, electrical shorts, and structural cracks before evacuating.',
  category: 'earthquake',
  detailedNextSteps: [
    'Wear sturdy closed-toe shoes and thick gloves to protect against thousands of shattered glass shards.',
    'Smell for gas odors; if detected, shut off main gas valve at the meter and evacuate outdoors.',
    'Be prepared for significant aftershocks — Drop, Cover, and Hold On every time shaking resumes.',
    'Check neighbors for injuries and listen to battery-operated emergency radio for municipal updates.',
  ],
  keySafetyRule: 'DROP, COVER, and HOLD ON. Do not run outside during active shaking — protect against falling overhead debris.',
  emergencyNumber: '911',
  specializedToolType: 'earthquake_sweep',
  dispatchScript: 'OPERATOR: "I am reporting structural shaking following a major earthquake tremor. Occupants have executed Drop-Cover-Hold. Conducting post-quake utility safety sweep for gas/structural failure."',
  translations: generateTranslations(
    '¡TERREMOTO! AGACHARSE, CUBRIRSE Y AGARRARSE', 'Métense debajo de una mesa resistente y protejan su cabeza.', '¡No salgan corriendo durante el temblor!',
    '地震！蹲下、掩护、抓牢 (DROP, COVER, HOLD ON)', '躲在坚固桌子下方，护住头部和颈部。', '剧烈摇晃期间切勿往外跑，谨防高空坠物！',
    'SÉISME ! BAISSEZ-VOUS, COUVREZ-VOUS, TENEZ BON', 'Abritez-vous sous une table solide et protégez votre tête.', 'Ne courez pas dehors pendant les secousses !',
    'भूकंप! झुकें, ढकें और मजबूती से पकड़ें', 'मजबूत मेज के नीचे छिपकर सिर और गर्दन को बचाएं।', 'कंपन के दौरान बाहर भागने की कोशिश न करें!',
    'زلزال! انبطحوا، احتموا، وتمسكوا جيداً', 'احتموا تحت طاولة قوية واحموا رؤوسكم ورقابكم.', 'لا تركضوا خارج المبنى أثناء الهزة الأرضية!',
    'LINDOL! DAPA, TANGGOL, AT KUMAPIT', 'Pumailalim sa matibay na mesa at protektahan ang ulo.', 'Huwag tatakbo palabas habang lumilindol!'
  ),
};

/**
 * 13. CHEMICAL SPILL & TOXIC VAPORS
 */
export const CHEMICAL_EMERGENCY: EmergencyResponse = {
  emergencyType: 'Hazardous Chemical Spill & Toxic Vapors',
  riskLevel: 'CRITICAL',
  summary: 'Industrial solvents, pool chlorine, acids, and pesticide releases generate corrosive, asphyxiating vapors. Chemical exposure causes chemical burns, pulmonary edema, and systemic toxicity.',
  doNow: [
    'Evacuate the spill area immediately, moving UPWIND and UPHILL from the chemical release source',
    'Cover your mouth and nose with a damp cloth or particulate mask to reduce vapor and mist inhalation',
    'If chemical contacted skin or eyes: Immediately flush with continuous clean running water for AT LEAST 15 minutes',
    'Remove contaminated clothing while continuing to flush the skin (cut clothing off rather than pulling over the head)',
    'Dial 911 and Poison Control (1-800-222-1222) with product container labels or Safety Data Sheet (SDS) details',
  ],
  avoid: [
    'Attempting to clean up, neutralize, or soak up unknown chemical liquids with household rags',
    'Mixing chemicals (e.g., NEVER mix bleach and ammonia or acid — creates lethal chloramine/chlorine gas)',
    'Touching chemical residues, containers, or crystalline powders with unprotected bare hands',
    'Entering low-lying basements or pits where heavy toxic vapors settle and displace oxygen',
  ],
  nextStep: 'Isolate the contaminated zone and seek emergency medical evaluation for chemical burns or vapor exposure.',
  category: 'chemical',
  detailedNextSteps: [
    'Provide arriving HazMat responders with exact chemical names, UN numbers, or photograph of product labels.',
    'Bag contaminated clothing in heavy-duty plastic bags for safe HazMat disposal.',
    'Monitor for delayed pulmonary symptoms (coughing, shortness of breath, burning sensation) over the next 24 hours.',
  ],
  keySafetyRule: 'Never mix bleach with ammonia or acids — always evacuate upwind and flush skin contact for 15+ minutes.',
  emergencyNumber: '911',
  specializedToolType: 'chemical_flush',
  dispatchScript: 'OPERATOR: "I am reporting a toxic hazardous chemical spill / corrosive vapor exposure. Continuous 15-minute emergency decontamination irrigation is in progress. Please dispatch HazMat and EMS units."',
  translations: generateTranslations(
    '¡DERRAME QUÍMICO TÓXICO! EVACÚEN CONTRA EL VIENTO', 'Laven la piel y ojos con agua continua durante 15 minutos.', '¡Nunca mezclen cloro con amoníaco o vinagre!',
    '有毒化学品泄漏！向上风处撤离', '皮肤或眼睛接触请用流动清水持续冲洗至少15分钟。', '严禁将漂白水与洁厕灵（酸）或氨水混合！',
    'DÉVERSEMENT CHIMIQUE TOXIQUE ! ÉVACUEZ FACE AU VENT', 'Rincez la peau et les yeux à grande eau pendant 15 minutes.', 'Ne mélangez jamais l\'eau de Javel avec d\'autres produits !',
    'रासायनिक रिसाव! हवा की विपरीत दिशा में जाएं', 'त्वचा या आंखों को लगातार 15 मिनट तक साफ पानी से धोएं।', 'ब्लीच को कभी भी अमोनिया या एसिड के साथ न मिलाएं!',
    'تسرب مواد كيميائية سامة! اخلوا عكس اتجاه الريح', 'اغسلوا الجلد والعينين بالماء الجاري لمدة 15 دقيقة متواصلة.', 'لا تخلطوا الكلور مع الأمونيا أو الفلاش مطلقاً!',
    'CHEMIKAL NA SINGAW! LUMIKAS SALUNGAT SA HANGIN', 'Banlawan ang balat o mata sa tuloy-tuloy na tubig nang 15 minuto.', 'Huwag paghahaluin ang bleach at acid o ammonia!'
  ),
};

/**
 * Centralized Dictionary of Mock Emergency Responses for Core Categories
 */
export const MOCK_EMERGENCY_RESPONSES: Record<'fire' | 'electrical' | 'flood', EmergencyResponse> = {
  fire: FIRE_EMERGENCY,
  electrical: ELECTRICAL_EMERGENCY,
  flood: FLOOD_EMERGENCY,
};

export const SCENARIO_FIRE = FIRE_EMERGENCY;
export const SCENARIO_ELECTRICAL = ELECTRICAL_EMERGENCY;
export const SCENARIO_FLOOD = FLOOD_EMERGENCY;

const EMERGENCY_KEYWORDS = [
  'fire', 'smoke', 'flame', 'burn', 'stove', 'oven', 'alarm', 'grease', 'cooking',
  'spark', 'wire', 'shock', 'outlet', 'breaker', 'power', 'electr', 'downed line', 'cable',
  'flood', 'water', 'leak', 'pipe', 'burst', 'ceiling', 'submerg', 'drain', 'rain', 'drown',
  'gas', 'sulfur', 'rotten egg', 'hiss', 'carbon monoxide', 'co alarm', 'co detector',
  'heart', 'chest', 'breath', 'chok', 'bleed', 'unconscious', 'faint', 'seiz', 'cpr', 'pulse',
  'injur', 'trap', 'danger', 'help', 'emergency', 'hazard', 'urgent', 'poison',
  'kitchen', 'smell', 'shaking', 'earthquake', 'tremor', 'quake', 'chemical', 'toxic',
  'acid', 'chlorine', 'bleach', 'ammonia', 'explosion', 'collapsed'
];

/**
 * Validates whether user description is an understandable emergency
 */
export function validateEmergencyInput(
  query: string,
  category?: EmergencyCategory | string
): { isValid: boolean; errorMessage?: string } {
  const trimmed = query.trim();
  if (!trimmed && category === 'custom') {
    return { isValid: false, errorMessage: 'Please describe what is happening.' };
  }

  if (category && category !== 'custom') {
    return { isValid: true };
  }

  if (trimmed.length < 3) {
    return { isValid: false, errorMessage: 'Please describe what is happening.' };
  }

  const lower = trimmed.toLowerCase();
  const hasKeyword = EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));

  if (!hasKeyword && trimmed.split(/\s+/).length < 2) {
    return {
      isValid: false,
      errorMessage: "We couldn't identify an emergency. Please describe what is happening.",
    };
  }

  return { isValid: true };
}

/**
 * Helper function to retrieve specific, tailored mock emergency response with distinct instructions
 */
export function getAssessmentForQuery(
  query: string,
  defaultCategory?: EmergencyCategory
): EmergencyResponse {
  const lower = (query || '').toLowerCase().trim();
  const trimmedDesc = query.trim() || undefined;

  // 1. CHOKING / AIRWAY OBSTRUCTION
  if (lower.includes('chok') || lower.includes('food caught') || lower.includes('cannot breathe while eating') || lower.includes('airway blocked')) {
    return {
      ...CHOKING_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // 2. SEVERE BLEEDING / ARTERIAL HEMORRHAGE / TOURNIQUET
  if (
    lower.includes('bleed') ||
    lower.includes('blood') ||
    lower.includes('laceration') ||
    lower.includes('stab') ||
    lower.includes('gash') ||
    lower.includes('cut artery') ||
    lower.includes('severed') ||
    lower.includes('amputat')
  ) {
    return {
      ...BLEEDING_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // 3. CARDIAC / UNRESPONSIVE / CPR / STROKE / SEIZURE
  if (
    lower.includes('heart') ||
    lower.includes('cardiac') ||
    lower.includes('chest pain') ||
    lower.includes('unconscious') ||
    lower.includes('unresponsive') ||
    lower.includes('collapsed') ||
    lower.includes('cpr') ||
    lower.includes('faint') ||
    lower.includes('seizure') ||
    lower.includes('stroke') ||
    lower.includes('not breathing')
  ) {
    return {
      ...MEDICAL_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // 4. DOWNED POWER LINE / HIGH VOLTAGE
  if (
    lower.includes('downed') ||
    lower.includes('fallen wire') ||
    lower.includes('power line') ||
    lower.includes('pole fell') ||
    (lower.includes('wire') && (lower.includes('street') || lower.includes('car') || lower.includes('road') || lower.includes('ground')))
  ) {
    return {
      ...DOWNED_POWER_LINE_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // 5. ELECTRICAL ARCING / PANEL / SPARKING / OUTLET
  if (
    lower.includes('electric') ||
    lower.includes('spark') ||
    lower.includes('outlet') ||
    lower.includes('breaker') ||
    lower.includes('shock') ||
    lower.includes('arcing') ||
    lower.includes('fuse')
  ) {
    return {
      ...ELECTRICAL_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // 6. NATURAL GAS LEAK / ROTTEN EGG ODOR
  if (
    lower.includes('gas leak') ||
    lower.includes('gas smell') ||
    lower.includes('rotten egg') ||
    lower.includes('sulfur') ||
    lower.includes('mercaptan') ||
    lower.includes('hissing pipe') ||
    lower.includes('methane') ||
    (lower.includes('gas') && (lower.includes('leak') || lower.includes('smell') || lower.includes('pipe') || lower.includes('stove')))
  ) {
    return {
      ...GAS_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // 7. CARBON MONOXIDE (CO)
  if (
    lower.includes('carbon monoxide') ||
    lower.includes('co alarm') ||
    lower.includes('co detector') ||
    (lower.includes('dizziness') && lower.includes('heater'))
  ) {
    return {
      ...CARBON_MONOXIDE_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // 8. CHEMICAL SPILL / HAZMAT / CORROSIVE / TOXIC
  if (
    lower.includes('chemical') ||
    lower.includes('toxic') ||
    lower.includes('acid') ||
    lower.includes('chlorine') ||
    lower.includes('bleach') ||
    lower.includes('ammonia') ||
    lower.includes('pesticide') ||
    lower.includes('poison') ||
    lower.includes('corrosive')
  ) {
    return {
      ...CHEMICAL_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // 9. INDOOR BURST PIPE / WATER BREACH
  if (
    (lower.includes('water') || lower.includes('leak') || lower.includes('pipe') || lower.includes('burst')) &&
    (lower.includes('pipe') || lower.includes('burst') || lower.includes('ceiling') || lower.includes('plumb') || lower.includes('toilet') || lower.includes('inside') || lower.includes('basement') || lower.includes('kitchen floor'))
  ) {
    return {
      ...BURST_PIPE_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // 10. FLASH FLOOD & RISING WATERS
  if (
    lower.includes('flood') ||
    lower.includes('rising water') ||
    lower.includes('submerg') ||
    lower.includes('rain storm') ||
    lower.includes('river overflow') ||
    lower.includes('creek overflow')
  ) {
    return {
      ...FLOOD_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // 11. EARTHQUAKE
  if (
    lower.includes('earthquake') ||
    lower.includes('tremor') ||
    lower.includes('shaking') ||
    lower.includes('quake')
  ) {
    return {
      ...EARTHQUAKE_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // 12. KITCHEN / GREASE / COOKING OIL FIRE
  if (
    (lower.includes('fire') || lower.includes('smoke') || lower.includes('flame') || lower.includes('burn')) &&
    (lower.includes('grease') || lower.includes('oil') || lower.includes('kitchen') || lower.includes('pan') || lower.includes('stove') || lower.includes('cook'))
  ) {
    return {
      ...KITCHEN_FIRE_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // 13. GENERAL STRUCTURE FIRE & SMOKE
  if (
    lower.includes('fire') ||
    lower.includes('smoke') ||
    lower.includes('flame') ||
    lower.includes('burning') ||
    lower.includes('alarm')
  ) {
    return {
      ...FIRE_EMERGENCY,
      userDescription: trimmedDesc,
    };
  }

  // If text didn't match explicit keywords, check explicit category selected by user
  if (defaultCategory === 'electrical') return { ...ELECTRICAL_EMERGENCY, userDescription: trimmedDesc };
  if (defaultCategory === 'flood') return { ...FLOOD_EMERGENCY, userDescription: trimmedDesc };
  if (defaultCategory === 'gas') return { ...GAS_EMERGENCY, userDescription: trimmedDesc };
  if (defaultCategory === 'medical') return { ...MEDICAL_EMERGENCY, userDescription: trimmedDesc };
  if (defaultCategory === 'chemical') return { ...CHEMICAL_EMERGENCY, userDescription: trimmedDesc };
  if (defaultCategory === 'earthquake') return { ...EARTHQUAKE_EMERGENCY, userDescription: trimmedDesc };
  if (defaultCategory === 'fire') return { ...FIRE_EMERGENCY, userDescription: trimmedDesc };

  // Fallback for custom or general descriptions
  const displayTitle = query.trim()
    ? query.trim().length > 35
      ? `${query.trim().slice(0, 32)}...`
      : query.trim()
    : 'Urgent Crisis Assessment';

  return {
    emergencyType: `Urgent Emergency: ${displayTitle}`,
    riskLevel: 'HIGH',
    category: 'custom',
    userDescription: trimmedDesc,
    summary:
      'An active crisis has been reported. Prioritize personal safety, clear unobstructed evacuation paths, and immediate dispatch connection.',
    doNow: [
      'Assess your 360-degree surroundings and move immediately away from active physical hazards',
      'Alert all family members, coworkers, and bystanders in the perimeter in a loud, clear voice',
      'Identify and use the nearest clear, unobstructed exit to reach open outdoor safety',
      'Call emergency dispatch (911) with your exact street address and current hazard observations',
    ],
    avoid: [
      'Hesitating or delaying evacuation to search for material belongings or electronics',
      'Entering dark, unventilated, or structurally compromised rooms',
      'Attempting complex remediation procedures without safety equipment and certification',
    ],
    nextStep: 'Remain at a secure outdoor rally location and provide immediate status reports to arriving first responders.',
    detailedNextSteps: [
      'Conduct a head-count to ensure all individuals from the structure are accounted for.',
      'Provide first responders with a concise summary of events and any known internal hazards.',
      'Do not cross safety perimeters or police/fire tape until authorized by emergency personnel.',
    ],
    keySafetyRule: 'Human life and physical safety always take absolute priority over material property.',
    emergencyNumber: '911',
    specializedToolType: 'pass_fire',
    dispatchScript: 'OPERATOR: "I am reporting an urgent physical safety emergency. Occupants are evacuating away from immediate hazards. Please dispatch emergency response units immediately."',
    translations: generateTranslations(
      '¡EMERGENCIA! EVACÚEN DE INMEDIATO', 'Salgan del edificio ahora mismo y no usen los ascensores.', 'Peligro inminente: manténganse agachados y sigan las señales de salida.',
      '紧急警报！立即撤离', '请立即离开建筑物，切勿乘坐电梯。', '严重危险：请低姿前行并前往最近的安全出口。',
      'URGENCE ! ÉVACUEZ IMMÉDIATEMENT', 'Quittez le bâtiment immédiatement et n\'utilisez pas les ascenseurs.', 'Danger grave : restez près du sol et dirigez-vous vers la sortie.',
      'आपातकालीन चेतावनी! तुरंत बाहर निकलें', 'कृपया तुरंत इमारत से बाहर निकलें और लिफ्ट का उपयोग न करें।', 'खतरा: नीचे झुककर चलें और निकटतम सुरक्षित निकास की ओर बढ़ें।',
      'تنبيه طوارئ! إخلاء فوري', 'غادروا المبنى فوراً ولا تستخدموا المصاعد.', 'خطر وشيك: ابقوا منخفضين وتوجهوا نحو مخرج الطوارئ.',
      'EMERHENSIYA! LUMIKAS KAAGAD', 'Lumabas agad ng gusali at huwag gamitin ang elevator.', 'Panganib: Gumapang nang mababa at pumunta sa pinakamalapit na labasan.'
    ),
  };
}

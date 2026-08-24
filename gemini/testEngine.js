import { analyzeCrisis, validateEmergencyResponse } from "./crisisEngine.js";
import dotenv from "dotenv";

dotenv.config();

const validDecisionExamples = [
  {
    emergency_type: "fire",
    risk_level: "high",
    immediate_actions: [
      "Move away from the danger.",
      "Get to a safe location.",
      "Contact emergency services if needed."
    ],
    avoid_actions: [
      "Do not enter the dangerous area.",
      "Do not attempt unsafe intervention."
    ],
    next_step: "Stay in a safe location and seek appropriate emergency assistance.",
    needs_emergency_services: true
  },
  {
    emergency_type: "electrical",
    risk_level: "critical",
    immediate_actions: [
      "Move away from the affected outlet or appliance.",
      "Do not touch exposed wires or sparks."
    ],
    avoid_actions: [
      "Do not use water near electrical equipment.",
      "Do not touch a sparking appliance."
    ],
    next_step: "Move to a safe distance and contact emergency services if the electrical risk is immediate.",
    needs_emergency_services: true
  }
];

const invalidDecisionExamples = [
  { emergency_type: "medical", risk_level: "high", immediate_actions: ["Wrong type"], avoid_actions: ["Avoid this"], next_step: "This should fail.", needs_emergency_services: true },
  { emergency_type: "unknown", risk_level: "high", immediate_actions: ["Wrong type"], avoid_actions: ["Avoid this"], next_step: "This should fail.", needs_emergency_services: true },
  { emergency_type: "fire", risk_level: "urgent", immediate_actions: ["Wrong risk"], avoid_actions: ["Avoid this"], next_step: "This should fail.", needs_emergency_services: true },
  { risk_level: "high", immediate_actions: ["Missing type"], avoid_actions: ["Avoid this"], next_step: "This should fail.", needs_emergency_services: true },
  { emergency_type: "fire", immediate_actions: ["Missing risk"], avoid_actions: ["Avoid this"], next_step: "This should fail.", needs_emergency_services: true },
  { emergency_type: "fire", risk_level: "high", avoid_actions: ["Avoid this"], next_step: "This should fail.", needs_emergency_services: true },
  { emergency_type: "fire", risk_level: "high", immediate_actions: [], avoid_actions: ["Avoid this"], next_step: "This should fail.", needs_emergency_services: true },
  { emergency_type: "fire", risk_level: "high", immediate_actions: ["a", "b", "c", "d"], avoid_actions: ["Avoid this"], next_step: "This should fail.", needs_emergency_services: true },
  { emergency_type: "fire", risk_level: "high", immediate_actions: [123], avoid_actions: ["Avoid this"], next_step: "This should fail.", needs_emergency_services: true },
  { emergency_type: "fire", risk_level: "high", immediate_actions: ["One action"], next_step: "This should fail.", needs_emergency_services: true },
  { emergency_type: "fire", risk_level: "high", immediate_actions: ["One action"], avoid_actions: ["a", "b", "c", "d"], next_step: "This should fail.", needs_emergency_services: true },
  { emergency_type: "fire", risk_level: "high", immediate_actions: ["One action"], avoid_actions: [123], next_step: "This should fail.", needs_emergency_services: true },
  { emergency_type: "fire", risk_level: "high", immediate_actions: ["One action"], avoid_actions: ["Avoid this"], needs_emergency_services: true },
  { emergency_type: "fire", risk_level: "high", immediate_actions: ["One action"], avoid_actions: ["Avoid this"], next_step: "   ", needs_emergency_services: true },
  { emergency_type: "fire", risk_level: "high", immediate_actions: ["One action"], avoid_actions: ["Avoid this"], next_step: "This should fail.", needs_emergency_services: "yes" },
  { emergency_type: "fire", risk_level: "high", immediate_actions: ["One action"], avoid_actions: ["Avoid this"], next_step: "This should fail.", do_now: ["legacy"] },
  { emergency_type: "fire", risk_level: "high", immediate_actions: ["One action"], avoid: ["legacy"], next_step: "This should fail.", needs_emergency_services: true },
  { emergency_type: "fire", risk_level: "high", immediate_actions: ["One action"], avoid_actions: ["Avoid this"], next_step: "This should fail.", requires_professional_help: true },
  { emergency_type: "fire", risk_level: "high", immediate_actions: ["One action"], avoid_actions: ["Avoid this"], next_step: "This should fail." },
  { emergency_type: "fire", risk_level: "high", immediate_actions: ["One action"], avoid_actions: ["Avoid this"], next_step: "This should fail.", needs_emergency_services: true, extra_field: "not allowed" }
];

function runValidationTests() {
  console.log("🚦 Running CrisisMate validation tests...\n");

  let passed = 0;
  let failed = 0;
  let total = 0;

  for (const sample of validDecisionExamples) {
    total += 1;
    const result = validateEmergencyResponse(sample);
    if (!result.valid) {
      failed += 1;
      console.error("❌ Expected valid decision but validation failed:", result.errors, sample);
      process.exit(1);
    }
    passed += 1;
  }

  for (const sample of invalidDecisionExamples) {
    total += 1;
    const result = validateEmergencyResponse(sample);
    if (result.valid) {
      failed += 1;
      console.error("❌ Expected invalid decision to fail validation:", sample);
      process.exit(1);
    }
    passed += 1;
  }

  console.log(`✅ Validation tests passed: ${passed}/${total}`);
  console.log(`❌ Validation tests failed: ${failed}/${total}`);
}

async function runLiveGeminiSmokeTests() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("ℹ️ GEMINI_API_KEY not set. Skipping live Gemini smoke tests.");
    return;
  }

  const testCases = [
    "There is smoke coming from my kitchen.",
    "An electrical socket is sparking and there is a burning smell.",
    "Water is rapidly entering my house after heavy rain.",
    "Fire!"
  ];

  console.log("\n🚀 Running live Gemini smoke tests...\n");

  for (const testInput of testCases) {
    console.log(`----------------------------------------`);
    console.log(`INPUT: "${testInput}"`);
    try {
      const result = await analyzeCrisis({ message: testInput }, apiKey);
      const validation = validateEmergencyResponse(result);
      if (!validation.valid) {
        console.error("❌ Live Gemini result failed validation:", validation.errors);
        continue;
      }
      console.log("RESULT:", JSON.stringify(result, null, 2));
    } catch (err) {
      console.error("❌ Error parsing input:", err.message);
    }
  }
}

runValidationTests();
await runLiveGeminiSmokeTests();

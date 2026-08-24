import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper for Gemini AI client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Fallback high-fidelity emergency classifier for offline or missing API key scenarios
function fallbackAnalyzeEmergency(message: string) {
  const lower = (message || "").toLowerCase().trim();

  // 1. CHOKING
  if (lower.includes("chok") || lower.includes("airway") || lower.includes("food stuck") || lower.includes("cannot breathe while eating")) {
    return {
      emergency_type: "medical",
      risk_level: "critical",
      immediate_actions: [
        "Ask 'Are you choking?' — If the person cannot speak, cough, or breathe, initiate immediate intervention.",
        "Stand firmly behind the person and wrap your arms around their waist.",
        "Make a fist with one hand, place thumb-side slightly above their navel, and grasp with your other hand.",
        "Deliver quick, forceful upward abdominal thrusts (Heimlich Maneuver) until the obstruction dislodges.",
        "If the person becomes unresponsive, lower them to the floor and begin CPR immediately."
      ],
      avoid_actions: [
        "Blind finger sweeps into the throat, which can push foreign objects deeper into the airway",
        "Offering water, liquids, or bread to swallow",
        "Slapping the back while the victim is upright (can lodge objects further down)"
      ],
      next_step: "Even if the obstruction clears, seek medical evaluation for internal trauma or secondary airway swelling.",
      needs_emergency_services: true
    };
  }

  // 2. CARDIAC / UNRESPONSIVE / CPR
  if (
    lower.includes("heart") ||
    lower.includes("cardiac") ||
    lower.includes("chest pain") ||
    lower.includes("unconscious") ||
    lower.includes("unresponsive") ||
    lower.includes("collapsed") ||
    lower.includes("cpr") ||
    lower.includes("not breathing") ||
    lower.includes("stroke") ||
    lower.includes("seizure")
  ) {
    return {
      emergency_type: "medical",
      risk_level: "critical",
      immediate_actions: [
        "Check responsiveness and look for normal breathing (no more than 10 seconds).",
        "Call 911 immediately or point directly to a specific bystander to call and locate an AED.",
        "Place victim flat on their back on a firm, hard surface.",
        "Begin continuous chest compressions: 100-120 BPM, 2-2.4 inches deep, allowing full chest recoil.",
        "Power on and attach AED pads as soon as the unit arrives, following automated voice prompts."
      ],
      avoid_actions: [
        "Stopping chest compressions for more than 10 seconds",
        "Placing pillows under the victim's head (which obstructs the airway)",
        "Giving liquids, food, or medication to an unconscious individual"
      ],
      next_step: "Continue uninterrupted compressions until emergency medical personnel take over or victim shows obvious signs of life.",
      needs_emergency_services: true
    };
  }

  // 3. SEVERE BLEEDING / ARTERIAL HEMORRHAGE
  if (
    lower.includes("bleed") ||
    lower.includes("blood") ||
    lower.includes("stab") ||
    lower.includes("gash") ||
    lower.includes("laceration") ||
    lower.includes("cut artery") ||
    lower.includes("severed") ||
    lower.includes("amputat")
  ) {
    return {
      emergency_type: "medical",
      risk_level: "critical",
      immediate_actions: [
        "Expose the wound completely and identify if blood is spurting or pooling rapidly (arterial).",
        "Apply direct, continuous, heavy two-handed pressure using a clean cloth, trauma dressing, or gauze.",
        "If heavy limb bleeding does not stop with direct pressure, apply a commercial tourniquet 2-3 inches above the wound.",
        "Tighten the windlass until all active bleeding stops and pulse downstream is absent; lock into the clip.",
        "Record the exact time of tourniquet application directly on the band or victim's forehead ('T-HH:MM')."
      ],
      avoid_actions: [
        "Loosening or removing a tourniquet once applied (can cause fatal hemorrhagic shock)",
        "Removing soaked dressings (always apply fresh gauze directly on top)",
        "Applying a tourniquet directly over joints (knees or elbows)"
      ],
      next_step: "Keep the patient lying down, warm, and calm to prevent hypothermic shock while awaiting paramedic arrival.",
      needs_emergency_services: true
    };
  }

  // 4. DOWNED POWER LINE / HIGH VOLTAGE
  if (
    lower.includes("downed") ||
    lower.includes("power line") ||
    lower.includes("fallen wire") ||
    lower.includes("pole fell") ||
    (lower.includes("wire") && (lower.includes("street") || lower.includes("car") || lower.includes("road") || lower.includes("ground")))
  ) {
    return {
      emergency_type: "electrical",
      risk_level: "critical",
      immediate_actions: [
        "Stay at least 35 feet (10+ meters) away — energized ground ripples create lethal step potential voltages.",
        "If inside a vehicle touching a live line, STAY INSIDE until power utility crews de-energize the line.",
        "If forced to escape due to car fire: JUMP clear without touching car and ground at the same time, landing with both feet together.",
        "Shuffle away keeping both feet in continuous contact with ground and tightly together (heel-to-toe).",
        "Call 911 and the electrical power utility dispatch immediately."
      ],
      avoid_actions: [
        "Approaching any grounded wire or touching metal fences, puddles, or trees in contact with lines",
        "Taking large running steps across energized ground (voltage differential between feet causes electrocution)",
        "Attempting to move wires with wooden sticks, ropes, or plastic broom handles"
      ],
      next_step: "Maintain a strict 360-degree exclusion zone and warn all approaching pedestrians or vehicles until emergency utility crews arrive.",
      needs_emergency_services: true
    };
  }

  // 5. ELECTRICAL FIRE / PANEL / OUTLET SPARKING
  if (
    lower.includes("electric") ||
    lower.includes("spark") ||
    lower.includes("outlet") ||
    lower.includes("breaker") ||
    lower.includes("fuse") ||
    lower.includes("shock") ||
    lower.includes("arcing")
  ) {
    return {
      emergency_type: "electrical",
      risk_level: "high",
      immediate_actions: [
        "Cut main power at the primary breaker panel if you can reach it safely without touching water or arcing equipment.",
        "Unplug burning appliances only if the cord and wall outlet are dry, intact, and safe to touch.",
        "Evacuate the area immediately and close doors behind you to contain toxic electrical combustion smoke.",
        "If fire is small and you are trained, use a Class C non-conductive extinguisher (CO2 or Dry Chemical).",
        "Call 911 and report an active electrical structure fire."
      ],
      avoid_actions: [
        "Throwing water on live electrical equipment (causes instant severe electric shock and flashover)",
        "Touching burning wires, switches, or metal appliances with bare hands",
        "Resetting tripped breakers without identifying the source of overheating or short circuits"
      ],
      next_step: "Have a licensed electrician inspect and certify the entire electrical branch before power restoration.",
      needs_emergency_services: true
    };
  }

  // 6. KITCHEN STOVE / GREASE FIRE
  if (
    (lower.includes("grease") || lower.includes("oil") || lower.includes("pan") || lower.includes("stove") || lower.includes("kitchen")) &&
    (lower.includes("fire") || lower.includes("flame") || lower.includes("burn") || lower.includes("smoke"))
  ) {
    return {
      emergency_type: "fire",
      risk_level: "high",
      immediate_actions: [
        "Turn off the heat source / stove burner immediately if you can safely reach the controls.",
        "Slide a metal lid, cookie sheet, or baking tray over the burning pan to smother incoming oxygen.",
        "Leave the lid firmly in place until the pan has completely cooled to room temperature.",
        "If grease fire spreads beyond the cookware, evacuate immediately and close kitchen doors.",
        "Call 911 immediately once you are outside the residence."
      ],
      avoid_actions: [
        "Pouring WATER on burning grease (causes an instantaneous catastrophic steam explosion fireball)",
        "Throwing flour, baking powder, or sugar on the fire (flour is combustible dust and will explode)",
        "Carrying or moving a flaming pan across the kitchen (spreads burning oil across floors and clothing)"
      ],
      next_step: "Do not remove the smothering lid until at least 30 minutes have passed and the metal is cool to touch.",
      needs_emergency_services: true
    };
  }

  // 7. GENERAL STRUCTURE FIRE & SMOKE
  if (
    lower.includes("fire") ||
    lower.includes("smoke") ||
    lower.includes("flame") ||
    lower.includes("burning") ||
    lower.includes("alarm")
  ) {
    return {
      emergency_type: "fire",
      risk_level: "high",
      immediate_actions: [
        "Drop below the smoke layer (<3 ft) on hands and knees where breathable air and visibility are highest.",
        "Feel interior doors with the back of your hand before turning handles; if warm, keep closed and find an alternate exit.",
        "Alert all occupants with a loud, clear voice and evacuate via the closest clear exterior exit.",
        "Close doors behind you as you escape to compartmentalize smoke and starve the fire of fresh air.",
        "Dial 911 immediately from a safe outdoor muster point."
      ],
      avoid_actions: [
        "Walking upright through heavy smoke (one breath of superheated toxic gas can cause unconsciousness)",
        "Using elevators under any circumstances during an active alarm",
        "Returning inside the burning structure for pets, phones, wallets, or possessions"
      ],
      next_step: "Assemble at your designated outdoor muster point and provide incoming fire crews with exact room locations of any trapped persons.",
      needs_emergency_services: true
    };
  }

  // 8. FLASH FLOOD / RISING WATER
  if (
    lower.includes("flood") ||
    lower.includes("rising water") ||
    lower.includes("submerg") ||
    lower.includes("creek") ||
    lower.includes("river overflow")
  ) {
    return {
      emergency_type: "flood",
      risk_level: "high",
      immediate_actions: [
        "Move immediately to higher ground — stay clear of low-lying valleys, basements, and storm channels.",
        "Never walk through moving water; 6 inches of swift water can sweep a full-grown adult off their feet.",
        "Never drive around barricades or into flooded roads — 12 inches of water will float most passenger cars.",
        "If trapped in a building, climb to the highest floor or roof (bring a signaling device).",
        "Call 911 if trapped and signal first responders with a flashlight or bright cloth."
      ],
      avoid_actions: [
        "Driving into standing or moving water ('Turn Around, Don't Drown')",
        "Entering flooded basements or rooms where electrical outlets are submerged",
        "Touching downed wires or metal fences near floodwaters"
      ],
      next_step: "Monitor local emergency alert broadcasts (NOAA Weather Radio) and await official rescue clearance before returning.",
      needs_emergency_services: true
    };
  }

  // 9. INDOOR BURST PIPE / WATER BREACH
  if (
    (lower.includes("water") || lower.includes("leak") || lower.includes("pipe") || lower.includes("burst")) &&
    (lower.includes("pipe") || lower.includes("ceiling") || lower.includes("plumb") || lower.includes("indoor") || lower.includes("basement") || lower.includes("house"))
  ) {
    return {
      emergency_type: "flood",
      risk_level: "medium",
      immediate_actions: [
        "Locate and shut off the main water isolation valve immediately (quarter-turn ball valve or gate wheel).",
        "Shut off electrical power to the flooded zone at the main breaker panel ONLY if the panel is bone-dry and safely accessible.",
        "Open lower-level faucets to relieve residual hydraulic pressure in building plumbing.",
        "Elevate valuable electronics, furniture, and critical documents above water level.",
        "Contact an emergency plumber and your property insurer for immediate structural drying."
      ],
      avoid_actions: [
        "Walking into standing water if electrical cords, appliances, or floor outlets are submerged",
        "Using regular household vacuum cleaners to extract standing water (causes electrocution)",
        "Turning power back on before an electrician inspects all flooded circuits"
      ],
      next_step: "Document all structural water damage with clear photos and video before beginning mitigation work.",
      needs_emergency_services: false
    };
  }

  // 10. GAS LEAK / METHANE / ROTTEN EGG ODOR
  if (
    lower.includes("gas") ||
    lower.includes("rotten egg") ||
    lower.includes("sulfur") ||
    lower.includes("mercaptan") ||
    lower.includes("hissing pipe")
  ) {
    return {
      emergency_type: "chemical",
      risk_level: "critical",
      immediate_actions: [
        "Evacuate everyone from the building immediately on foot — leave doors open as you exit to aid ventilation.",
        "Move at least 300 feet upwind from the suspected leak source.",
        "Call 911 and your natural gas utility from a safe outdoor distance away from the gas plume.",
        "Warn neighbors and keep bystanders away from the property perimeter."
      ],
      avoid_actions: [
        "Flipping ANY light switches, unplugging cords, or operating garage door openers (creates static sparks)",
        "Using cell phones, landline phones, flashlights, or doorbells inside the structure",
        "Starting vehicles or combustion engines in driveways or nearby garages"
      ],
      next_step: "Do not re-enter the building until the gas company utility crew tests with a combustible gas detector and gives all-clear.",
      needs_emergency_services: true
    };
  }

  // 11. CHEMICAL SPILL / HAZARDOUS MATERIALS
  if (
    lower.includes("chemical") ||
    lower.includes("acid") ||
    lower.includes("bleach") ||
    lower.includes("ammonia") ||
    lower.includes("chlorine") ||
    lower.includes("toxic") ||
    lower.includes("poison") ||
    lower.includes("pesticide")
  ) {
    return {
      emergency_type: "chemical",
      risk_level: "high",
      immediate_actions: [
        "Evacuate the spill area immediately and isolate the room to prevent airborne vapor migration.",
        "If chemical contacted skin or eyes, flush continuously with clean, lukewarm water for at least 15-20 minutes.",
        "Remove all contaminated clothing and jewelry carefully without pulling over the head.",
        "Identify the chemical name from product labels or Safety Data Sheet (SDS) if safe to view.",
        "Call 911 and Poison Control (1-800-222-1222 in US) with the exact product name."
      ],
      avoid_actions: [
        "Mixing chemicals together (e.g. Bleach + Ammonia generates lethal chloramine gas)",
        "Applying neutralizing acids or bases to chemical burns (generates severe exothermic heat)",
        "Inhaling fumes or attempting cleanup without proper chemical-resistant PPE"
      ],
      next_step: "Provide arriving medical staff and HAZMAT responders with the exact chemical label and exposure duration.",
      needs_emergency_services: true
    };
  }

  // 12. EARTHQUAKE / STRUCTURAL COLLAPSE
  if (
    lower.includes("earthquake") ||
    lower.includes("tremor") ||
    lower.includes("shaking") ||
    lower.includes("quake")
  ) {
    return {
      emergency_type: "natural_disaster",
      risk_level: "high",
      immediate_actions: [
        "DROP to hands and knees immediately to prevent being knocked over.",
        "COVER your head and neck under a sturdy table, desk, or interior furniture.",
        "HOLD ON to your shelter until the shaking completely stops — move with the shelter if it shifts.",
        "If no shelter is available, drop against an interior wall and cover head and neck with both arms.",
        "Once shaking stops, check for gas leaks, fires, and structural damage before moving."
      ],
      avoid_actions: [
        "Running outside during active shaking (falling glass, brickwork, and facades cause most injuries)",
        "Standing in doorways (modern doorways are not structural load points)",
        "Using elevators or lighting matches/lighters after the quake"
      ],
      next_step: "Expect aftershocks. Be prepared to Drop, Cover, and Hold On again when secondary tremors occur.",
      needs_emergency_services: true
    };
  }

  // 13. DYNAMIC FALLBACK FOR CUSTOM EMERGENCY
  const formattedTitle = message.trim()
    ? message.trim().length > 30
      ? `${message.trim().slice(0, 28)}...`
      : message.trim()
    : "Active Emergency Hazard";

  return {
    emergency_type: "urgent_situation",
    risk_level: "high",
    immediate_actions: [
      `Quickly assess your 360-degree surroundings and distance yourself from the immediate ${formattedTitle} hazard.`,
      "Alert all nearby family members, occupants, and coworkers in a clear, commanding voice.",
      "Identify the safest, unobstructed path to clear outdoor safety or secure shelter.",
      "Call 911 immediately with your exact location and observable physical conditions."
    ],
    avoid_actions: [
      "Hesitating or attempting to salvage non-essential personal property",
      "Entering unventilated, dark, or structurally unstable areas",
      "Intervening without personal protective equipment or proper training"
    ],
    next_step: "Maintain a safe standoff distance at a designated rally point and brief arriving first responders.",
    needs_emergency_services: true
  };
}

// -------------------------------------------------------------
// POST /api/analyze - CrisisMate Emergency API Endpoint
// -------------------------------------------------------------
app.post("/api/analyze", async (req, res) => {
  const { message, imageBase64, imageMimeType } = req.body || {};

  if ((!message || typeof message !== "string" || !message.trim()) && !imageBase64) {
    return res.status(400).json({
      error: "Invalid request payload. 'message' string or 'imageBase64' is required.",
    });
  }

  const userQuery = (message || "Analyze this emergency situation from image").trim();

  try {
    const ai = getGeminiClient();

    if (!ai) {
      // Return high-fidelity fallback when Gemini key is not configured
      const fallbackResult = fallbackAnalyzeEmergency(userQuery);
      return res.json(fallbackResult);
    }

    const systemPrompt = `You are CrisisMate, a world-class Emergency Decision Assistant providing immediate, real-world, high-stakes emergency instructions for active crises.
Analyze the user's emergency situation (text and/or image) and return a concise, high-impact JSON response.

The response MUST strictly match this JSON schema:
- emergency_type: string (e.g. "fire", "electrical", "flood", "medical", "chemical", "gas_leak", "natural_disaster", "urgent_situation")
- risk_level: string (must be one of: "low", "medium", "high", "critical")
- immediate_actions: array of strings (3 to 5 concise, actionable, imperative steps to do right now, ordered by priority)
- avoid_actions: array of strings (2 to 4 critical mistakes or dangerous actions to strictly avoid)
- next_step: string (the single most important recommended follow-up step)
- needs_emergency_services: boolean (true if 911/EMS/Fire/Police should be called, false only if safe self-contained non-emergency)

Ensure actions are direct, high-urgency, life-saving, and scientifically accurate.`;

    const parts: any[] = [];
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const mime = imageMimeType || "image/jpeg";
      parts.push({
        inlineData: {
          mimeType: mime,
          data: cleanBase64,
        },
      });
    }
    parts.push({ text: `Emergency Situation: "${userQuery}"` });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: [
        {
          role: "user",
          parts,
        },
      ],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            emergency_type: {
              type: Type.STRING,
              description: "Category of emergency, e.g. fire, electrical, flood, medical, chemical",
            },
            risk_level: {
              type: Type.STRING,
              enum: ["low", "medium", "high", "critical"],
              description: "Severity risk tier",
            },
            immediate_actions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 high-priority immediate steps",
            },
            avoid_actions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-4 actions to strictly avoid",
            },
            next_step: {
              type: Type.STRING,
              description: "Single recommended next step",
            },
            needs_emergency_services: {
              type: Type.BOOLEAN,
              description: "Whether emergency services are required",
            },
          },
          required: [
            "emergency_type",
            "risk_level",
            "immediate_actions",
            "avoid_actions",
            "next_step",
            "needs_emergency_services",
          ],
        },
        temperature: 0.1,
      },
    });

    const responseText = response.text?.trim();
    if (!responseText) {
      throw new Error("Empty response received from Gemini model.");
    }

    const parsedJson = JSON.parse(responseText);
    return res.json(parsedJson);
  } catch (error) {
    console.error("Gemini API Error / Fallback triggered:", error);
    // Graceful fallback to deterministic emergency engine
    const fallbackResult = fallbackAnalyzeEmergency(userQuery);
    return res.json(fallbackResult);
  }
});

// Setup Vite development server or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CrisisMate server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

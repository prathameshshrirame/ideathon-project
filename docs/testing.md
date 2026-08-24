# CrisisMate Testing Plan

## Fire Test

Input:

"There is smoke coming from my kitchen."

Expected:
- Emergency type should identify a possible fire
- Risk level should be displayed
- Immediate actions should be displayed
- Avoid actions should be displayed
- Next step should be displayed

## Electrical Test

Input:

"My electrical socket is sparking."

Expected:
- Electrical hazard should be identified
- Appropriate risk should be displayed
- Safety actions should be displayed
- Things to avoid should be displayed

## Flood Test

Input:

"Water is entering my house after heavy rain."

Expected:
- Flood should be identified
- Appropriate risk should be displayed
- Safety actions should be displayed

## Invalid Input Test

Input:

"I want to order pizza."

Expected:
- The system should not falsely classify this as an emergency.

## Integration Test

Frontend → Backend → Gemini → Firebase → Frontend

Expected:
- Request successfully reaches backend
- Gemini returns structured response
- Response passes validation
- Firebase operation succeeds
- Result appears correctly in frontend

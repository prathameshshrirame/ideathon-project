# CrisisMate Integration Checklist

## 1. Frontend

- [ ] Frontend starts successfully
- [ ] Emergency input works
- [ ] HELP ME NOW button works
- [ ] Loading state works
- [ ] Error state works
- [ ] Result screen displays the API response correctly

## 2. Backend

- [ ] Backend starts successfully
- [ ] POST /api/analyze works
- [ ] Request validation works
- [ ] Gemini connection works
- [ ] Gemini response is validated
- [ ] Correct response is returned to frontend
- [ ] Errors are handled correctly
- [ ] CORS works during development

## 3. Gemini

- [ ] Fire scenario works
- [ ] Electrical scenario works
- [ ] Flood scenario works
- [ ] Response contains all required fields
- [ ] emergency_type uses an allowed value
- [ ] risk_level uses an allowed value
- [ ] Response is valid JSON
- [ ] Non-emergency input is handled correctly

## 4. Firebase

- [ ] Firestore connection works
- [ ] Emergency session can be saved
- [ ] Required fields are stored
- [ ] Timestamp is stored
- [ ] Firebase failure does not prevent the crisis response
- [ ] Security rules are checked
- [ ] No secrets are committed

## 5. End-to-End

- [ ] Frontend → Backend
- [ ] Backend → Gemini
- [ ] Gemini → Backend
- [ ] Backend → Firebase
- [ ] Backend → Frontend

## 6. Scenarios

### Fire

Input:
"There is smoke coming from my kitchen."

- [ ] Correctly classified
- [ ] Risk displayed
- [ ] Immediate actions displayed
- [ ] Avoid actions displayed
- [ ] Next step displayed

### Electrical

Input:
"My electrical socket is sparking."

- [ ] Correctly classified
- [ ] Risk displayed
- [ ] Appropriate guidance displayed

### Flood

Input:
"Water is entering my house after heavy rain."

- [ ] Correctly classified
- [ ] Risk displayed
- [ ] Appropriate guidance displayed

### Non-emergency

Input:
"I want to order pizza."

- [ ] Does not falsely classify as an emergency
- [ ] Appropriate response displayed

## 7. Final Demo

- [ ] Application starts
- [ ] No major console errors
- [ ] No API keys exposed
- [ ] Fire scenario works
- [ ] Backup scenario works
- [ ] Firebase session can be verified
- [ ] Demo flow rehearsed
# CrisisMate Architecture

## System Flow

User
↓
Frontend
↓
Backend API
↓
Gemini AI
↓
Backend Validation
↓
Firebase / Firestore
↓
Frontend
↓
User

## Components

### Frontend

Responsible for:
- Collecting the emergency description
- Sending the request
- Displaying the emergency response

### Backend

Responsible for:
- Receiving API requests
- Validating input
- Calling Gemini
- Validating Gemini response
- Communicating with Firebase

### Gemini

Responsible for:
- Understanding the emergency description
- Identifying emergency type
- Assessing risk
- Generating prioritized actions
- Returning structured output

### Firebase

Responsible for:
- Storing emergency session data
- Storing application data required by the system

## Core Principle

The internal implementation of each component can be
different, but the interfaces between components must
remain consistent.

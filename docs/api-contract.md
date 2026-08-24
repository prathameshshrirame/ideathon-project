# CrisisMate API Contract

## Purpose

This document defines how the CrisisMate frontend,
backend, Gemini AI, and Firebase components communicate.

## 1. Analyze Emergency

### Endpoint

POST /api/analyze

### Request

{
  "message": "There is smoke coming from my kitchen."
}

### Response

{
  "emergency_type": "fire",
  "risk_level": "high",
  "immediate_actions": [
    "Action 1",
    "Action 2",
    "Action 3"
  ],
  "avoid_actions": [
    "Avoid action 1",
    "Avoid action 2"
  ],
  "next_step": "Next recommended step",
  "needs_emergency_services": true
}

## Supported Emergency Types

- fire
- electrical
- flood

## Risk Levels

- low
- medium
- high
- critical

## Important Rule

Frontend, Backend, Gemini and Firebase implementations
may use their own internal structure, but the data exchanged
between components should follow this contract.

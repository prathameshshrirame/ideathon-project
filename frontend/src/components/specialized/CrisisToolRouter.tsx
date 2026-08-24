import React from 'react';
import { EmergencyResponse } from '../../types';
import { FireEvacuationProtocol } from './FireEvacuationProtocol';
import { TourniquetPressureClock } from './TourniquetPressureClock';
import { ChokingHeimlichTrainer } from './ChokingHeimlichTrainer';
import { ElectricalSafetyRadar } from './ElectricalSafetyRadar';
import { GasLeakPerimeterTracker } from './GasLeakPerimeterTracker';
import { ChemicalFlushCountdown } from './ChemicalFlushCountdown';
import { EarthquakeSafetySweep } from './EarthquakeSafetySweep';
import { FloodDepthRiskMatrix } from './FloodDepthRiskMatrix';
import { CprInteractiveMetronome } from '../CprInteractiveMetronome';

interface Props {
  assessment: EmergencyResponse;
}

export const CrisisToolRouter: React.FC<Props> = ({ assessment }) => {
  const typeStr = (assessment.emergencyType || '').toLowerCase();
  const cat = assessment.category;
  const toolType = assessment.specializedToolType;

  // 1. CPR / Cardiac check
  if (
    toolType === 'cpr' ||
    typeStr.includes('cardiac') ||
    typeStr.includes('cpr') ||
    typeStr.includes('unresponsive') ||
    typeStr.includes('heart attack')
  ) {
    return <CprInteractiveMetronome emergencyType={assessment.emergencyType} />;
  }

  // 2. Choking / Airway
  if (toolType === 'choking_heimlich' || typeStr.includes('choking') || typeStr.includes('airway')) {
    return <ChokingHeimlichTrainer />;
  }

  // 3. Bleeding / Tourniquet
  if (
    toolType === 'tourniquet' ||
    typeStr.includes('bleeding') ||
    typeStr.includes('hemorrhage') ||
    typeStr.includes('tourniquet') ||
    typeStr.includes('wound')
  ) {
    return <TourniquetPressureClock />;
  }

  // 4. Fire / Evacuation / Smoke
  if (
    toolType === 'pass_fire' ||
    cat === 'fire' ||
    typeStr.includes('fire') ||
    typeStr.includes('smoke') ||
    typeStr.includes('grease')
  ) {
    return <FireEvacuationProtocol />;
  }

  // 5. Electrical / Downed wire
  if (
    toolType === 'electrical_breaker' ||
    cat === 'electrical' ||
    typeStr.includes('electrical') ||
    typeStr.includes('wire') ||
    typeStr.includes('power line') ||
    typeStr.includes('shock')
  ) {
    return <ElectricalSafetyRadar isDownedLine={typeStr.includes('downed') || typeStr.includes('wire')} />;
  }

  // 6. Gas leak / Carbon monoxide
  if (
    toolType === 'gas_perimeter' ||
    cat === 'gas' ||
    typeStr.includes('gas') ||
    typeStr.includes('carbon monoxide') ||
    typeStr.includes('methane') ||
    typeStr.includes('odor')
  ) {
    return <GasLeakPerimeterTracker />;
  }

  // 7. Chemical spill / Corrosive
  if (
    toolType === 'chemical_flush' ||
    cat === 'chemical' ||
    typeStr.includes('chemical') ||
    typeStr.includes('toxic') ||
    typeStr.includes('acid') ||
    typeStr.includes('bleach') ||
    typeStr.includes('hazard')
  ) {
    return <ChemicalFlushCountdown />;
  }

  // 8. Earthquake
  if (
    toolType === 'earthquake_sweep' ||
    cat === 'earthquake' ||
    typeStr.includes('earthquake') ||
    typeStr.includes('seismic') ||
    typeStr.includes('tremor')
  ) {
    return <EarthquakeSafetySweep />;
  }

  // 9. Flood / Burst pipe
  if (
    toolType === 'flood_depth' ||
    cat === 'flood' ||
    typeStr.includes('flood') ||
    typeStr.includes('water') ||
    typeStr.includes('pipe')
  ) {
    return <FloodDepthRiskMatrix isBurstPipe={typeStr.includes('pipe') || typeStr.includes('indoor')} />;
  }

  // Default fallback
  return <FireEvacuationProtocol />;
};

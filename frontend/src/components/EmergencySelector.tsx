import React from 'react';
import { EmergencyCategory } from '../types';
import { EmergencyCard } from './EmergencyCard';

interface EmergencySelectorProps {
  selectedCategory?: EmergencyCategory;
  onSelectCategory: (category: EmergencyCategory) => void;
  className?: string;
}

export const EMERGENCY_OPTIONS: Array<{
  category: EmergencyCategory;
  title: string;
  subtitle: string;
  icon: string;
  tag: string;
  themeColor: 'red' | 'amber' | 'blue' | 'emerald' | 'purple' | 'slate';
}> = [
  {
    category: 'fire',
    title: 'Fire & Smoke',
    subtitle: 'Flames, grease fire, smoke inhalation',
    icon: '🔥',
    tag: 'Fire Protocol',
    themeColor: 'red',
  },
  {
    category: 'medical',
    title: 'Medical / CPR',
    subtitle: 'Cardiac arrest, bleeding, choking, stroke',
    icon: '🫀',
    tag: 'EMS Priority',
    themeColor: 'emerald',
  },
  {
    category: 'electrical',
    title: 'Electrical Hazard',
    subtitle: 'Downed power line, arcing, shocks',
    icon: '⚡',
    tag: 'High Voltage',
    themeColor: 'amber',
  },
  {
    category: 'gas',
    title: 'Gas Leak / Fumes',
    subtitle: 'Rotten egg odor, CO alarm, chemical leak',
    icon: '⚠️',
    tag: 'Evacuation',
    themeColor: 'purple',
  },
  {
    category: 'flood',
    title: 'Flood & Water Breach',
    subtitle: 'Burst water mains, rising water, basement flood',
    icon: '🌊',
    tag: 'Hazmat/Utility',
    themeColor: 'blue',
  },
  {
    category: 'earthquake',
    title: 'Earthquake / Collapse',
    subtitle: 'Structural damage, tremors, aftershocks',
    icon: '🏚️',
    tag: 'Rescue Sweep',
    themeColor: 'slate',
  },
];

export const EmergencySelector: React.FC<EmergencySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full ${className}`}>
      {EMERGENCY_OPTIONS.map((option) => (
        <EmergencyCard
          key={option.category}
          id={`card-emergency-${option.category}`}
          category={option.category}
          title={option.title}
          subtitle={option.subtitle}
          icon={option.icon}
          tag={option.tag}
          isSelected={selectedCategory === option.category}
          themeColor={option.themeColor}
          onClick={() => onSelectCategory(option.category)}
        />
      ))}
    </div>
  );
};

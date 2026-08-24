/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenState, EmergencyCategory, EmergencyResponse } from './types';
import { FIRE_EMERGENCY } from './data/mockScenarios';
import { analyzeEmergencyQuery } from './services/emergencyApi';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { InputScreen } from './components/InputScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultScreen } from './components/ResultScreen';
import { NextStepScreen } from './components/NextStepScreen';
import { LiveEmergencyDashboard } from './components/LiveEmergencyDashboard';
import { SosEmergencyModal } from './components/SosEmergencyModal';
import { NearbyHelpModal } from './components/NearbyHelpModal';
import { GuidelinesModal } from './components/GuidelinesModal';
import { EmergencyCardModal } from './components/EmergencyCardModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');
  const [selectedCategory, setSelectedCategory] = useState<EmergencyCategory>('custom');
  const [currentAssessment, setCurrentAssessment] = useState<EmergencyResponse>(FIRE_EMERGENCY);
  const [inputDescription, setInputDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Modals
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isNearbyHelpOpen, setIsNearbyHelpOpen] = useState(false);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [isIceModalOpen, setIsIceModalOpen] = useState(false);

  const [pendingAssessment, setPendingAssessment] = useState<EmergencyResponse | null>(null);

  // Handle category selection from home -> immediately analyze and provide instructions for that crisis
  const handleSelectCategory = (category: EmergencyCategory) => {
    setSelectedCategory(category);
    const categoryDescriptions: Record<EmergencyCategory, string> = {
      fire: 'Structure fire with smoke and active combustion hazard',
      medical: 'Medical emergency with cardiac arrest or unconscious patient requiring CPR',
      electrical: 'Electrical hazard with high voltage arcing or downed power lines',
      gas: 'Natural gas leak with sulfur odor and explosion risk',
      flood: 'Rising floodwaters and indoor pressurized pipe breach hazard',
      earthquake: 'Earthquake tremors with severe shaking and structural collapse risk',
      chemical: 'Hazardous toxic chemical spill and corrosive vapor release',
      custom: 'Urgent emergency requiring immediate instructions',
    };
    const desc = categoryDescriptions[category] || 'Emergency Crisis';
    triggerAssessment(desc, undefined, category);
  };

  // Perform async analysis calling API and Gemini backend
  const triggerAssessment = async (description: string, imageBase64?: string, category?: EmergencyCategory) => {
    setInputDescription(description);
    setUploadedImage(imageBase64 || null);
    setCurrentScreen('loading');
    setPendingAssessment(null);

    try {
      const result = await analyzeEmergencyQuery(description, category, imageBase64);
      setPendingAssessment(result);
      setCurrentAssessment(result);
    } catch (err) {
      console.error('Triage analysis error:', err);
    }
  };

  // Handle "HELP ME NOW" button click on home
  const handleHelpMeNow = (description: string, imageBase64?: string) => {
    triggerAssessment(description, imageBase64, undefined);
  };

  // Handle detailed analyze on InputScreen
  const handleAnalyzeInput = (description: string, imageBase64?: string) => {
    triggerAssessment(description, imageBase64, selectedCategory);
  };

  // When loading finishes
  const handleLoadingComplete = () => {
    if (pendingAssessment) {
      setCurrentAssessment(pendingAssessment);
    }
    setCurrentScreen('result');
  };

  // Reset to home
  const handleReset = () => {
    setInputDescription('');
    setUploadedImage(null);
    setSelectedCategory('custom');
    setPendingAssessment(null);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      <Header
        currentScreen={currentScreen}
        onReset={handleReset}
        onOpenGuidelines={() => setIsGuidelinesOpen(true)}
        onOpenIceModal={() => setIsIceModalOpen(true)}
        onOpenSos={() => setIsSosOpen(true)}
        onOpenNearbyHelp={() => setIsNearbyHelpOpen(true)}
        onOpenLiveDashboard={() => setCurrentScreen('dashboard')}
      />

      <main className="flex-1 w-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="w-full"
            >
              <HomeScreen
                onSelectCategory={handleSelectCategory}
                onHelpMeNow={handleHelpMeNow}
                onNavigateToInput={() => setCurrentScreen('input')}
                onOpenSos={() => setIsSosOpen(true)}
                onOpenNearbyHelp={() => setIsNearbyHelpOpen(true)}
                onOpenLiveDashboard={() => setCurrentScreen('dashboard')}
              />
            </motion.div>
          )}

          {currentScreen === 'input' && (
            <motion.div
              key="input-screen"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="w-full"
            >
              <InputScreen
                selectedCategory={selectedCategory}
                initialValue={inputDescription}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                onAnalyze={handleAnalyzeInput}
                onBack={() => setCurrentScreen('home')}
              />
            </motion.div>
          )}

          {currentScreen === 'loading' && (
            <motion.div
              key="loading-screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="w-full"
            >
              <LoadingScreen
                onComplete={handleLoadingComplete}
                userQuery={inputDescription}
                uploadedImage={uploadedImage}
              />
            </motion.div>
          )}

          {currentScreen === 'result' && (
            <motion.div
              key="result-screen"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <ResultScreen
                assessment={currentAssessment}
                onReset={handleReset}
                onNewAssessment={handleReset}
                onGoToNextStep={() => setCurrentScreen('next-step')}
                onOpenIceModal={() => setIsIceModalOpen(true)}
                onOpenLiveDashboard={() => setCurrentScreen('dashboard')}
                onOpenSos={() => setIsSosOpen(true)}
                onOpenNearbyHelp={() => setIsNearbyHelpOpen(true)}
              />
            </motion.div>
          )}

          {currentScreen === 'dashboard' && (
            <motion.div
              key="live-dashboard-screen"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <LiveEmergencyDashboard
                assessment={currentAssessment}
                onBack={() => setCurrentScreen('result')}
                onReset={handleReset}
                onOpenSos={() => setIsSosOpen(true)}
                onOpenNearbyHelp={() => setIsNearbyHelpOpen(true)}
              />
            </motion.div>
          )}

          {currentScreen === 'next-step' && (
            <motion.div
              key="next-step-screen"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <NextStepScreen
                assessment={currentAssessment}
                onBackToResult={() => setCurrentScreen('result')}
                onNewAssessment={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* SOS Emergency Alarm & Beacon Modal */}
      <SosEmergencyModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        emergencyType={currentAssessment.emergencyType}
      />

      {/* Nearby Help (Hospitals / Fire / Police) Modal */}
      <NearbyHelpModal
        isOpen={isNearbyHelpOpen}
        onClose={() => setIsNearbyHelpOpen(false)}
        emergencyType={currentAssessment.emergencyType}
      />

      {/* In Case of Emergency (ICE) & Medical Profile Card Modal */}
      <EmergencyCardModal
        isOpen={isIceModalOpen}
        onClose={() => setIsIceModalOpen(false)}
      />

      {/* Emergency Decision Guidelines Modal */}
      <GuidelinesModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />

      {/* Safety Notice Footer */}
      <footer className="py-5 border-t border-slate-200 bg-white text-slate-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-2 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0 text-xs">
          <p className="text-slate-600 font-medium max-w-2xl leading-relaxed">
            <strong className="text-slate-800">Safety Notice:</strong> If you are in immediate danger, contact local emergency services. CrisisMate is an informational decision-support tool and does not replace professional emergency assistance.
          </p>
          <div className="pt-2 sm:pt-0 shrink-0 font-semibold text-slate-700">
            CrisisMate © 2026
          </div>
        </div>
      </footer>
    </div>
  );
}

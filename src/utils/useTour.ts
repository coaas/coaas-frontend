import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { tourMode } from './tourMode';

export interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string; // CSS selector
  position?: 'top' | 'bottom' | 'left' | 'right';
  disableBeacon?: boolean;
  navigateTo?: string; // Route to navigate to before showing this step
  waitForNavigation?: boolean; // Wait for navigation to complete
}

export interface TourState {
  isActive: boolean;
  currentStep: number;
  steps: TourStep[];
  isAutoMode: boolean;
  isPaused: boolean;
}

export const useTour = (steps: TourStep[]) => {
  const navigate = useNavigate();
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [tourState, setTourState] = useState<TourState>({
    isActive: false,
    currentStep: 0,
    steps,
    isAutoMode: false,
    isPaused: false,
  });

  const startTour = useCallback((autoMode = false) => {
    // Enable tour mode when starting tour
    tourMode.enable();
    
    setTourState(prev => ({
      ...prev,
      isActive: true,
      currentStep: 0,
      isAutoMode: autoMode,
      isPaused: false,
    }));
  }, []);

  const stopTour = useCallback(() => {
    // Disable tour mode when stopping tour
    tourMode.disable();
    
    // Clear auto timer
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    
    setTourState(prev => ({
      ...prev,
      isActive: false,
      currentStep: 0,
      isAutoMode: false,
      isPaused: false,
    }));
  }, []);

  const toggleAutoMode = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      isAutoMode: !prev.isAutoMode,
      isPaused: false,
    }));
  }, []);

  const togglePause = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  const nextStep = useCallback(() => {
    // Clear auto timer when manually advancing
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }

    setTourState(prev => {
      if (prev.currentStep < prev.steps.length - 1) {
        const nextStepIndex = prev.currentStep + 1;
        const nextStepData = prev.steps[nextStepIndex];
        
        // Navigate if needed
        if (nextStepData.navigateTo) {
          navigate(nextStepData.navigateTo);
          
          // If waitForNavigation is true, delay showing the step
          if (nextStepData.waitForNavigation) {
            setTimeout(() => {
              setTourState(current => ({
                ...current,
                currentStep: nextStepIndex,
              }));
            }, 300); // Small delay for navigation to complete
            
            return prev; // Don't update step yet
          }
        }
        
        return {
          ...prev,
          currentStep: nextStepIndex,
        };
      } else {
        // Tour finished - disable tour mode
        tourMode.disable();
        
        // Clear auto timer
        if (autoTimerRef.current) {
          clearTimeout(autoTimerRef.current);
          autoTimerRef.current = null;
        }
        
        return {
          ...prev,
          isActive: false,
          currentStep: 0,
          isAutoMode: false,
          isPaused: false,
        };
      }
    });
  }, [navigate]);

  const prevStep = useCallback(() => {
    // Clear auto timer when manually going back
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }

    setTourState(prev => {
      if (prev.currentStep > 0) {
        const prevStepIndex = prev.currentStep - 1;
        const prevStepData = prev.steps[prevStepIndex];
        
        // Navigate if needed
        if (prevStepData.navigateTo) {
          navigate(prevStepData.navigateTo);
          
          if (prevStepData.waitForNavigation) {
            setTimeout(() => {
              setTourState(current => ({
                ...current,
                currentStep: prevStepIndex,
              }));
            }, 300);
            
            return prev;
          }
        }
        
        return {
          ...prev,
          currentStep: prevStepIndex,
        };
      }
      return prev;
    });
  }, [navigate]);

  const goToStep = useCallback((stepIndex: number) => {
    // Clear auto timer when jumping to step
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }

    const targetStep = steps[stepIndex];
    if (targetStep?.navigateTo) {
      navigate(targetStep.navigateTo);
    }
    
    setTourState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(stepIndex, prev.steps.length - 1)),
    }));
  }, [navigate, steps]);

  // Auto-advance timer
  useEffect(() => {
    if (tourState.isActive && tourState.isAutoMode && !tourState.isPaused) {
      autoTimerRef.current = setTimeout(() => {
        nextStep();
      }, 4000); // 4 seconds auto-advance
    }

    return () => {
      if (autoTimerRef.current) {
        clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [tourState.isActive, tourState.isAutoMode, tourState.isPaused, tourState.currentStep, nextStep]);

  return {
    ...tourState,
    startTour,
    stopTour,
    nextStep,
    prevStep,
    goToStep,
    toggleAutoMode,
    togglePause,
    currentStepData: tourState.steps[tourState.currentStep],
    isLastStep: tourState.currentStep === tourState.steps.length - 1,
    isFirstStep: tourState.currentStep === 0,
  };
}; 
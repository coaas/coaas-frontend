import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
}

export const useTour = (steps: TourStep[]) => {
  const navigate = useNavigate();
  const [tourState, setTourState] = useState<TourState>({
    isActive: false,
    currentStep: 0,
    steps,
  });

  const startTour = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      isActive: true,
      currentStep: 0,
    }));
  }, []);

  const stopTour = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      isActive: false,
      currentStep: 0,
    }));
  }, []);

  const nextStep = useCallback(() => {
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
        return {
          ...prev,
          isActive: false,
          currentStep: 0,
        };
      }
    });
  }, [navigate]);

  const prevStep = useCallback(() => {
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
    const targetStep = steps[stepIndex];
    if (targetStep?.navigateTo) {
      navigate(targetStep.navigateTo);
    }
    
    setTourState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(stepIndex, prev.steps.length - 1)),
    }));
  }, [navigate, steps]);

  return {
    ...tourState,
    startTour,
    stopTour,
    nextStep,
    prevStep,
    goToStep,
    currentStepData: tourState.steps[tourState.currentStep],
    isLastStep: tourState.currentStep === tourState.steps.length - 1,
    isFirstStep: tourState.currentStep === 0,
  };
}; 
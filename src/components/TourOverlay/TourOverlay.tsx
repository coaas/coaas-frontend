import React, { useEffect, useState, useRef } from 'react';
import { TourStep } from '../../utils/useTour';

interface TourOverlayProps {
  isActive: boolean;
  currentStep: TourStep | undefined;
  currentStepIndex: number;
  totalSteps: number;
  isAutoMode: boolean;
  isPaused: boolean;
  speed: 'slow' | 'normal' | 'fast';
  onNext: () => void;
  onPrev: () => void;
  onStop: () => void;
  onGoToStep: (stepIndex: number) => void;
  onToggleAutoMode: () => void;
  onTogglePause: () => void;
  onSetSpeed: (speed: 'slow' | 'normal' | 'fast') => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  allSteps: TourStep[];
}

interface ElementRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const TourOverlay: React.FC<TourOverlayProps> = ({
  isActive,
  currentStep,
  currentStepIndex,
  totalSteps,
  isAutoMode,
  isPaused,
  speed,
  onNext,
  onPrev,
  onStop,
  onGoToStep,
  onToggleAutoMode,
  onTogglePause,
  onSetSpeed,
  isLastStep,
  isFirstStep,
  allSteps,
}) => {
  const [targetRect, setTargetRect] = useState<ElementRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [showStepMenu, setShowStepMenu] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [loadingStep, setLoadingStep] = useState<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const stepMenuRef = useRef<HTMLDivElement>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !currentStep) {
      setTargetRect(null);
      return;
    }

    const updateTargetPosition = () => {
      const targetElement = document.querySelector(currentStep.target);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const elementRect = {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        };
        setTargetRect(elementRect);

        // Calculate tooltip position
        if (tooltipRef.current) {
          const tooltipRect = tooltipRef.current.getBoundingClientRect();
          let top = elementRect.top;
          let left = elementRect.left;

          switch (currentStep.position || 'bottom') {
            case 'center':
              // Center the tooltip on the screen
              top = (window.innerHeight - tooltipRect.height) / 2;
              left = (window.innerWidth - tooltipRect.width) / 2;
              break;
            case 'top':
              top = elementRect.top - tooltipRect.height - 20;
              left =
                elementRect.left +
                elementRect.width / 2 -
                tooltipRect.width / 2;
              break;
            case 'bottom':
              top = elementRect.top + elementRect.height + 20;
              left =
                elementRect.left +
                elementRect.width / 2 -
                tooltipRect.width / 2;
              break;
            case 'left':
              top =
                elementRect.top +
                elementRect.height / 2 -
                tooltipRect.height / 2;
              left = elementRect.left - tooltipRect.width - 20;
              break;
            case 'right':
              top =
                elementRect.top +
                elementRect.height / 2 -
                tooltipRect.height / 2;
              left = elementRect.left + elementRect.width + 20;
              break;
          }

          // Keep tooltip within viewport (except for center position)
          if (currentStep.position !== 'center') {
            const padding = 20;
            top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));
            left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));
          }

          setTooltipPosition({ top, left });
        }
      }
    };

    // Retry logic for elements that might load with delay
    const tryUpdatePosition = (attempts = 0) => {
      const targetElement = document.querySelector(currentStep.target);
      if (targetElement) {
        updateTargetPosition();
      } else if (attempts < 20) {
        // Retry up to 20 times with increasing delay
        setTimeout(() => tryUpdatePosition(attempts + 1), 200 * (attempts + 1));
      }
    };

    // Auto-click for specific steps
    if (currentStep.id === 'create-namespace-button') {
      const createButton = document.querySelector(
        '[data-tour="create-namespace-btn"] button',
      );
      if (createButton) {
        setTimeout(() => {
          (createButton as HTMLButtonElement).click();
          // Automatically move to next step after form opens
          setTimeout(() => {
            onNext();
          }, 800);
        }, 500);
      }
    }

    // Auto-click for entering demo project
    if (currentStep.id === 'enter-project') {
      const demoProjectCard = document.querySelector(
        '[data-tour="demo-project-card"]',
      );
      if (demoProjectCard) {
        setTimeout(() => {
          (demoProjectCard as HTMLElement).click();
        }, 1000);
      }
    }

    // Auto-click for create service button
    if (currentStep.id === 'create-service-button') {
      const createServiceButton = document.querySelector(
        '[data-tour="create-service-btn"] button',
      );
      if (createServiceButton) {
        setTimeout(() => {
          (createServiceButton as HTMLButtonElement).click();
          // Automatically move to next step after service creation page opens
          setTimeout(() => {
            onNext();
          }, 800);
        }, 500);
      }
    }

    // For service-categories step, use retry logic
    if (currentStep.id === 'service-categories') {
      setTimeout(() => tryUpdatePosition(), 500);
    } else if (currentStep.id === 'deploy-services-content' || currentStep.id === 'deploy-servers-content') {
      // For deploy content steps, use retry logic with more attempts
      setTimeout(() => tryUpdatePosition(), 800);
    } else {
      updateTargetPosition();
    }

    // Auto-click on Databases category
    if (currentStep.id === 'service-categories') {
      const databaseCategory = document.querySelector(
        '[data-tour="service-categories"] [data-category="databases"]',
      );
      if (databaseCategory) {
        setTimeout(() => {
          (databaseCategory as HTMLElement).click();
        }, 1500);
      }
    }

    // Auto-click on PostgreSQL template
    if (currentStep.id === 'select-postgresql') {
      const postgresqlTemplate = document.querySelector(
        '[data-tour="postgresql-template"]',
      );
      if (postgresqlTemplate) {
        setTimeout(() => {
          (postgresqlTemplate as HTMLElement).click();
        }, 1000);
      }
    }

    // Auto-click on Deploy navigation
    if (currentStep.id === 'deploy-nav') {
      const deployNav = document.querySelector('nav a[href*="/deploy"]');
      if (deployNav) {
        setTimeout(() => {
          (deployNav as HTMLElement).click();
        }, 1000);
      }
    }

    // For deploy page and other deploy steps, use retry logic
    if (
      currentStep.id === 'deploy-page' ||
      currentStep.id === 'deploy-tabs' ||
      currentStep.id === 'deploy-status'
    ) {
      setTimeout(() => tryUpdatePosition(), 500);
    }

    // Auto-click on Services tab and show content
    if (currentStep.id === 'deploy-services-content') {
      const servicesTab = document.querySelector('[data-tour="deploy-tabs"] button') as HTMLElement;
      const allTabs = document.querySelectorAll('[data-tour="deploy-tabs"] button');
      let targetTab: HTMLElement | null = null;
      
      allTabs.forEach(tab => {
        if (tab.textContent?.includes('Services')) {
          targetTab = tab as HTMLElement;
        }
      });
      
      if (targetTab) {
        setTimeout(() => {
          targetTab!.click();
          // Wait for content to load, then use retry logic to find the element
          setTimeout(() => tryUpdatePosition(), 800);
        }, 1000);
      } else {
        // If tab not found, use retry logic
        setTimeout(() => tryUpdatePosition(), 800);
      }
    }

    // Auto-click on Servers/Data Centers tab and show content
    if (currentStep.id === 'deploy-servers-content') {
      const allTabs = document.querySelectorAll('[data-tour="deploy-tabs"] button');
      let targetTab: HTMLElement | null = null;
      
      allTabs.forEach(tab => {
        if (tab.textContent?.includes('Servers') || tab.textContent?.includes('Data Centers')) {
          targetTab = tab as HTMLElement;
        }
      });
      
      if (targetTab) {
        setTimeout(() => {
          targetTab!.click();
          // Wait for content to load, then use retry logic to find the element
          setTimeout(() => tryUpdatePosition(), 800);
        }, 1000);
      } else {
        // If tab not found, use retry logic
        setTimeout(() => tryUpdatePosition(), 800);
      }
    }

    window.addEventListener('resize', updateTargetPosition);
    window.addEventListener('scroll', updateTargetPosition);

    return () => {
      window.removeEventListener('resize', updateTargetPosition);
      window.removeEventListener('scroll', updateTargetPosition);
    };
  }, [isActive, currentStep]);

  // Close step menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        stepMenuRef.current &&
        !stepMenuRef.current.contains(event.target as Node)
      ) {
        setShowStepMenu(false);
      }
      if (
        speedMenuRef.current &&
        !speedMenuRef.current.contains(event.target as Node)
      ) {
        setShowSpeedMenu(false);
      }
    };

    if (showStepMenu || showSpeedMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStepMenu, showSpeedMenu]);

  const handleNext = () => {
    // Handle special cases for interactive steps
    if (currentStep?.id === 'namespace-form') {
      // Fill and submit the form
      const nameInput = document.querySelector(
        '[data-tour="namespace-modal"] input[name="name"]',
      ) as HTMLInputElement;
      const descriptionInput = document.querySelector(
        '[data-tour="namespace-modal"] textarea[name="description"]',
      ) as HTMLTextAreaElement;
      const submitButton = document.querySelector(
        '[data-tour="namespace-modal"] button[type="submit"]',
      ) as HTMLButtonElement;

      if (nameInput && descriptionInput && submitButton) {
        nameInput.value = 'Tour Demo Workspace';
        nameInput.dispatchEvent(new Event('input', { bubbles: true }));

        descriptionInput.value =
          'This is a demo workspace created during the platform tour';
        descriptionInput.dispatchEvent(new Event('input', { bubbles: true }));

        setTimeout(() => {
          submitButton.click();
          setTimeout(onNext, 1000); // Wait for modal to close
        }, 500);
        return;
      }
    }
    
    // Handle tour completion - navigate to home page
    if (currentStep?.id === 'tour-complete') {
      // Navigate to home page after a short delay
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      return;
    }
    
    onNext();
  };

  const handleGoToStep = (stepIndex: number) => {
    setLoadingStep(stepIndex);
    setShowStepMenu(false);

    // Add a small delay to ensure menu closes smoothly
    setTimeout(() => {
      onGoToStep(stepIndex);

      // If the target step requires navigation, give it time to complete
      const targetStep = allSteps[stepIndex];
      if (targetStep?.navigateTo) {
        // Additional delay for navigation-heavy steps
        setTimeout(
          () => {
            // Scroll target element into view if it exists
            const targetElement = document.querySelector(targetStep.target);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
              });
            }
            setLoadingStep(null);
          },
          targetStep.id === 'service-categories' ? 1500 : 500,
        );
      } else {
        // For same-page steps, shorter delay
        setTimeout(() => {
          const targetElement = document.querySelector(targetStep.target);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'center',
            });
          }
          setLoadingStep(null);
        }, 100);
      }
    }, 150);
  };

  if (!isActive || !currentStep || !targetRect) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Dark overlay with hole for highlighted element */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ background: 'rgba(0, 0, 0, 0.15)' }}
      >
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={targetRect.left - 8}
              y={targetRect.top - 8}
              width={targetRect.width + 16}
              height={targetRect.height + 16}
              rx="12"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.2)"
          mask="url(#tour-mask)"
        />
      </svg>

      {/* Bright glowing background for target element */}
      <div
        className="absolute rounded-xl pointer-events-none"
        style={{
          top: targetRect.top - 16,
          left: targetRect.left - 16,
          width: targetRect.width + 32,
          height: targetRect.height + 32,
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(168, 85, 247, 0.05) 100%)',
          boxShadow:
            '0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)',
        }}
      />

      {/* Additional bright overlay directly on element */}
      <div
        className="absolute rounded-lg pointer-events-none"
        style={{
          top: targetRect.top - 4,
          left: targetRect.left - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'brightness(1.1) contrast(1.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      />

      {/* Highlight border around target element */}
      <div
        className="absolute border-2 border-purple-300 rounded-xl animate-pulse pointer-events-none"
        style={{
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
          boxShadow:
            '0 0 20px rgba(168, 85, 247, 0.6), 0 0 40px rgba(168, 85, 247, 0.3)',
        }}
      />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-xl shadow-2xl border border-purple-500/30 p-6 max-w-sm pointer-events-auto backdrop-blur-sm"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          boxShadow:
            '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(168, 85, 247, 0.2)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-purple-300">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
            {isAutoMode && (
              <div className="flex items-center gap-1 ml-2">
                <svg
                  className="w-3 h-3 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
                <span className="text-xs text-green-400">AUTO</span>
                {isPaused && (
                  <span className="text-xs text-yellow-400">PAUSED</span>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {/* Speed Control - only show in auto mode */}
            {isAutoMode && (
              <div className="relative" ref={speedMenuRef}>
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  title="Change tour speed"
                  className="p-1 rounded-lg transition-colors text-cyan-400 hover:text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="text-xs">{speed.toUpperCase()}</span>
                </button>

                {showSpeedMenu && (
                  <div className="absolute bottom-full mb-2 left-0 bg-slate-800 border border-cyan-500 rounded-lg shadow-2xl w-24 z-[70]">
                    {(['slow', 'normal', 'fast'] as const).map(speedOption => (
                      <button
                        key={speedOption}
                        onClick={() => {
                          onSetSpeed(speedOption);
                          setShowSpeedMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          speed === speedOption
                            ? 'bg-cyan-600 text-white'
                            : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="capitalize">{speedOption}</span>
                          <span className="text-xs text-gray-400">
                            {speedOption === 'slow'
                              ? '6s'
                              : speedOption === 'normal'
                                ? '4s'
                                : '2s'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Auto Mode Toggle */}
            <button
              onClick={onToggleAutoMode}
              title={isAutoMode ? 'Disable auto mode' : 'Enable auto mode'}
              className={`p-1 rounded-lg transition-colors ${
                isAutoMode
                  ? 'text-green-400 hover:text-green-300 bg-green-400/10'
                  : 'text-gray-400 hover:text-purple-300 hover:bg-slate-700'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </button>

            {/* Pause/Resume Button - only show in auto mode */}
            {isAutoMode && (
              <button
                onClick={onTogglePause}
                title={isPaused ? 'Resume auto tour' : 'Pause auto tour'}
                className={`p-1 rounded-lg transition-colors ${
                  isPaused
                    ? 'text-yellow-400 hover:text-yellow-300 bg-yellow-400/10'
                    : 'text-green-400 hover:text-green-300 bg-green-400/10'
                }`}
              >
                {isPaused ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onStop}
              className="text-gray-400 hover:text-purple-300 transition-colors p-1 rounded-lg hover:bg-slate-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
            {currentStep.title}
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            {currentStep.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={isFirstStep}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isFirstStep
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-gray-300 hover:text-white hover:bg-slate-700 border border-gray-600 hover:border-purple-500'
            }`}
          >
            Previous
          </button>

          {/* Progress Indicator with Step Menu */}
          <div
            className="flex flex-col items-center gap-1 relative"
            ref={stepMenuRef}
          >
            {/* Progress Bar */}
            <div className="w-20 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 ease-out"
                style={{
                  width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
                }}
              />
            </div>
            {/* Clickable Text indicator */}
            <button
              onClick={() => setShowStepMenu(!showStepMenu)}
              className="text-xs text-gray-400 hover:text-purple-300 transition-colors cursor-pointer"
            >
              {currentStepIndex + 1} of {totalSteps}
              <svg
                className="w-3 h-3 inline ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Step Menu */}
            {showStepMenu && (
              <div
                className="fixed bg-slate-800 border border-purple-500 rounded-lg shadow-2xl w-80 z-[60]"
                style={{
                  top: '20px',
                  right: '20px',
                  maxHeight: 'calc(100vh - 40px)',
                  boxShadow:
                    '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(168, 85, 247, 0.3)',
                }}
              >
                <div className="p-4">
                  <div className="text-xs text-gray-400 mb-3 px-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      Jump to step:
                    </div>
                    <button
                      onClick={() => setShowStepMenu(false)}
                      className="text-gray-400 hover:text-purple-300 transition-colors p-1 rounded-lg hover:bg-slate-700"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {allSteps.map((step, index) => (
                      <button
                        key={step.id}
                        onClick={() => handleGoToStep(index)}
                        disabled={loadingStep !== null}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors mb-1 relative ${
                          index === currentStepIndex
                            ? 'bg-purple-600 text-white border border-purple-500'
                            : loadingStep === index
                              ? 'bg-blue-600 text-white border border-blue-500'
                              : 'text-gray-300 hover:bg-slate-700 hover:text-white disabled:opacity-50'
                        }`}
                      >
                        <span className="text-xs text-gray-500 mr-2">
                          {index + 1}.
                        </span>
                        <span className="block truncate">{step.title}</span>
                        {loadingStep === index && (
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isLastStep
              ? 'Finish'
              : currentStep.id === 'namespace-form'
                ? 'Create & Continue'
                : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

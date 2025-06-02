import React, { useEffect, useState, useRef } from 'react';
import { TourStep } from '../../utils/useTour';

interface TourOverlayProps {
  isActive: boolean;
  currentStep: TourStep | undefined;
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onStop: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
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
  onNext,
  onPrev,
  onStop,
  isLastStep,
  isFirstStep,
}) => {
  const [targetRect, setTargetRect] = useState<ElementRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

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
            case 'top':
              top = elementRect.top - tooltipRect.height - 20;
              left = elementRect.left + elementRect.width / 2 - tooltipRect.width / 2;
              break;
            case 'bottom':
              top = elementRect.top + elementRect.height + 20;
              left = elementRect.left + elementRect.width / 2 - tooltipRect.width / 2;
              break;
            case 'left':
              top = elementRect.top + elementRect.height / 2 - tooltipRect.height / 2;
              left = elementRect.left - tooltipRect.width - 20;
              break;
            case 'right':
              top = elementRect.top + elementRect.height / 2 - tooltipRect.height / 2;
              left = elementRect.left + elementRect.width + 20;
              break;
          }

          // Keep tooltip within viewport
          const padding = 20;
          top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));
          left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));

          setTooltipPosition({ top, left });
        }
      }
    };

    updateTargetPosition();
    window.addEventListener('resize', updateTargetPosition);
    window.addEventListener('scroll', updateTargetPosition);

    return () => {
      window.removeEventListener('resize', updateTargetPosition);
      window.removeEventListener('scroll', updateTargetPosition);
    };
  }, [isActive, currentStep]);

  if (!isActive || !currentStep || !targetRect) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Dark overlay with hole for highlighted element */}
      <svg className="absolute inset-0 w-full h-full pointer-events-auto" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
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
        <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0.5)" mask="url(#tour-mask)" />
      </svg>

      {/* Highlight border around target element */}
      <div
        className="absolute border-2 border-purple-400 rounded-xl animate-pulse"
        style={{
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
          boxShadow: '0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.3)',
        }}
      />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-xl shadow-2xl border border-purple-500/30 p-6 max-w-sm pointer-events-auto backdrop-blur-sm"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(168, 85, 247, 0.2)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-purple-300">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
          </div>
          <button
            onClick={onStop}
            className="text-gray-400 hover:text-purple-300 transition-colors p-1 rounded-lg hover:bg-purple-500/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
                : 'text-gray-300 hover:text-white hover:bg-purple-500/20 border border-gray-600 hover:border-purple-500/50'
            }`}
          >
            Previous
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStepIndex 
                    ? 'bg-gradient-to-r from-purple-400 to-blue-400 scale-125' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={onNext}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}; 
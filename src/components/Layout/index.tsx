import { Outlet, useLocation } from 'react-router-dom'; // ?? react-router
import { Header, Sidebar } from './components';
import { useMemo } from 'react';
import { TourProvider, useTourContext } from '../../utils/TourContext';
import { TourOverlay } from '../TourOverlay';

const LayoutContent = () => {
  const location = useLocation();
  const tour = useTourContext();

  const isLogin = useMemo(
    () => location.pathname === '/login',
    [location.pathname],
  );

  return (
    <>
      <div className="flex h-screen bg-background dark:bg-background bg-white transition-colors duration-300">
        {!isLogin && <Sidebar />}
        <div className="w-full max-w-[1560px] flex flex-col justify-start">
          {!isLogin && <Header />}
          <div className="h-full overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Global Tour Overlay */}
      <TourOverlay
        isActive={tour.isActive}
        currentStep={tour.currentStepData}
        currentStepIndex={tour.currentStep}
        totalSteps={tour.steps.length}
        isAutoMode={tour.isAutoMode}
        isPaused={tour.isPaused}
        onNext={tour.nextStep}
        onPrev={tour.prevStep}
        onStop={tour.stopTour}
        onGoToStep={tour.goToStep}
        onToggleAutoMode={tour.toggleAutoMode}
        onTogglePause={tour.togglePause}
        isLastStep={tour.isLastStep}
        isFirstStep={tour.isFirstStep}
        allSteps={tour.steps}
      />
    </>
  );
};

export const Layout = () => (
  <TourProvider>
    <LayoutContent />
  </TourProvider>
);

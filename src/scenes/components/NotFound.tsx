import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/Button';
import { RouteMap } from '@components/Layout/components/types';

export const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-blue">404</h1>
        <h2 className="text-3xl font-semibold text-white dark:text-white text-gray-800 mt-4">
          Page not found
        </h2>
        <p className="text-gray dark:text-gray text-gray-600 mt-2 mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div className="space-x-4">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="px-6 py-2"
          >
            Back
          </Button>
          <Button onClick={() => navigate(RouteMap.home)} className="px-6 py-2">
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

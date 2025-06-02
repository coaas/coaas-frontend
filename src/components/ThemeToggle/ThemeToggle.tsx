import { FC } from 'react';
import { useTheme } from '../../global/ThemeContext';

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-area dark:bg-area bg-gray-100 border border-stroke-gray dark:border-stroke-gray border-gray-300 hover:bg-area-dark dark:hover:bg-area-dark hover:bg-gray-200 transition-all duration-300 group text-white dark:text-white text-gray-700"
      aria-label={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
      title={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
    >
      {/* Иконка солнца */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-300 ${
          theme === 'light'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-180 scale-0'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* Иконка луны */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-300 ${
          theme === 'dark'
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 -rotate-180 scale-0'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
};

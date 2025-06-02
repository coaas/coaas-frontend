/**
 * Утилиты для работы с темами
 */

// Базовые классы для контейнеров
export const themeClasses = {
  // Фоны
  background: {
    primary: 'bg-background dark:bg-background bg-white',
    secondary: 'bg-area dark:bg-area bg-area-light',
    tertiary: 'bg-area-dark dark:bg-area-dark bg-area-light-dark',
  },
  
  // Текст
  text: {
    primary: 'text-white dark:text-white text-gray-900',
    secondary: 'text-gray dark:text-gray text-gray-600',
    accent: 'text-blue dark:text-blue text-blue',
  },
  
  // Границы
  border: {
    primary: 'border-stroke-gray dark:border-stroke-gray border-gray-200',
    secondary: 'border-stroke-gray-dark dark:border-stroke-gray-dark border-gray-300',
  },
  
  // Интерактивные элементы
  interactive: {
    hover: 'hover:bg-area-dark dark:hover:bg-area-dark hover:bg-gray-50',
    active: 'active:bg-area dark:active:bg-area active:bg-gray-100',
  },
  
  // Карточки
  card: {
    primary: 'bg-area dark:bg-area bg-white border border-stroke-gray dark:border-stroke-gray border-gray-200 shadow-card dark:shadow-card shadow-card-light',
    secondary: 'bg-area-dark dark:bg-area-dark bg-gray-50 border border-stroke-gray-dark dark:border-stroke-gray-dark border-gray-300',
  },
  
  // Общие переходы
  transition: 'transition-colors duration-300',
} as const;

/**
 * Функция для комбинирования классов темы
 */
export const combineThemeClasses = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Готовые комбинации для частых случаев
 */
export const commonThemeClasses = {
  // Стандартная карточка
  standardCard: combineThemeClasses(
    themeClasses.card.primary,
    themeClasses.text.primary,
    themeClasses.transition
  ),
  
  // Кнопка
  button: combineThemeClasses(
    themeClasses.background.secondary,
    themeClasses.text.primary,
    themeClasses.border.primary,
    themeClasses.interactive.hover,
    themeClasses.transition
  ),
  
  // Инпут
  input: combineThemeClasses(
    themeClasses.background.primary,
    themeClasses.text.primary,
    themeClasses.border.primary,
    'focus:border-blue',
    themeClasses.transition
  ),
  
  // Модальное окно
  modal: combineThemeClasses(
    themeClasses.background.primary,
    themeClasses.text.primary,
    themeClasses.border.secondary,
    'shadow-xl',
    themeClasses.transition
  ),
} as const; 
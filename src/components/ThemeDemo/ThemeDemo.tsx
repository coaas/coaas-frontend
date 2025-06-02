import { FC, useState } from 'react';
import { useTheme } from '../../global/ThemeContext';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { TextArea } from '@components/TextArea';

export const ThemeDemo: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <div className="p-6 space-y-6 min-h-screen bg-background dark:bg-background bg-white text-white dark:text-white text-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Демонстрация системы тем</h1>
          <p className="text-lg mb-4">
            Текущая тема:{' '}
            <span className="font-semibold text-blue">
              {theme === 'dark' ? 'Темная' : 'Светлая'}
            </span>
          </p>
          <button
            onClick={toggleTheme}
            className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-blue-lighter transition-colors"
          >
            Переключить тему
          </button>
        </div>

        {/* Тест текста */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Тестирование текста</h2>
          <div className="space-y-2">
            <p className="text-white dark:text-white text-gray-900">
              Основной текст (text-white / text-gray-900)
            </p>
            <p className="text-gray dark:text-gray text-gray-600">
              Вторичный текст (text-gray / text-gray-600)
            </p>
            <p className="text-blue">Акцентный текст (text-blue)</p>
            <p className="text-blue-light dark:text-blue-light text-blue">
              Светло-синий текст (text-blue-light / text-blue)
            </p>
          </div>
        </div>

        {/* Информационные карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-lg bg-area dark:bg-area bg-gray-50 border border-stroke-gray dark:border-stroke-gray border-gray-200 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Стандартная карточка</h3>
            <p className="text-gray dark:text-gray text-gray-600">
              Это пример стандартной карточки с адаптивным дизайном для темной и
              светлой темы.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-area-dark dark:bg-area-dark bg-gray-100 border border-stroke-gray-dark dark:border-stroke-gray-dark border-gray-300 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Вторичная карточка</h3>
            <p className="text-gray dark:text-gray text-gray-600">
              Карточка с немного другим фоном для создания визуальной иерархии.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white dark:bg-background border border-gray-200 dark:border-stroke-gray shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Инвертированная карточка
            </h3>
            <p className="text-gray-700 dark:text-gray">
              Карточка с инвертированными цветами для демонстрации.
            </p>
          </div>
        </div>

        {/* Кнопки */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Кнопки</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Основная кнопка</Button>

            <Button variant="secondary">Вторичная кнопка</Button>

            <Button variant="outline">Кнопка с обводкой</Button>

            <button className="px-6 py-3 bg-green text-white rounded-lg hover:opacity-80 transition-opacity">
              Успех
            </button>

            <button className="px-6 py-3 bg-error text-white rounded-lg hover:opacity-80 transition-opacity">
              Ошибка
            </button>
          </div>
        </div>

        {/* Формы */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Элементы форм</h2>
          <div className="bg-area dark:bg-area bg-gray-50 p-6 rounded-lg border border-stroke-gray dark:border-stroke-gray border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Компонент Input
                </label>
                <Input
                  placeholder="Введите текст..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Компонент TextArea
                </label>
                <TextArea
                  placeholder="Введите длинный текст..."
                  rows={4}
                  value={textareaValue}
                  onChange={e => setTextareaValue(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Обычный input
                </label>
                <input
                  type="text"
                  placeholder="Обычное поле ввода..."
                  className="w-full px-4 py-2 rounded-lg bg-background dark:bg-background bg-white text-white dark:text-white text-gray-900 border border-stroke-gray dark:border-stroke-gray border-gray-300 focus:border-blue transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Выпадающий список
                </label>
                <select className="w-full px-4 py-2 rounded-lg bg-background dark:bg-background bg-white text-white dark:text-white text-gray-900 border border-stroke-gray dark:border-stroke-gray border-gray-300 focus:border-blue transition-colors">
                  <option>Выберите опцию</option>
                  <option>Опция 1</option>
                  <option>Опция 2</option>
                  <option>Опция 3</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="checkbox1"
                  className="w-4 h-4 text-blue bg-background dark:bg-background bg-white border border-stroke-gray dark:border-stroke-gray border-gray-300 rounded focus:ring-blue"
                />
                <label htmlFor="checkbox1" className="text-sm">
                  Согласен с условиями
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Цветовая палитра */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Цветовая палитра</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-full h-16 rounded-lg bg-blue mb-2 flex items-center justify-center">
                <span className="text-white font-medium">Blue</span>
              </div>
              <span className="text-sm">#507EF5</span>
            </div>

            <div className="text-center">
              <div className="w-full h-16 rounded-lg bg-green mb-2 flex items-center justify-center">
                <span className="text-white font-medium">Green</span>
              </div>
              <span className="text-sm">#1EA574</span>
            </div>

            <div className="text-center">
              <div className="w-full h-16 rounded-lg bg-orange mb-2 flex items-center justify-center">
                <span className="text-white font-medium">Orange</span>
              </div>
              <span className="text-sm">#FFBB4F</span>
            </div>

            <div className="text-center">
              <div className="w-full h-16 rounded-lg bg-error mb-2 flex items-center justify-center">
                <span className="text-white font-medium">Error</span>
              </div>
              <span className="text-sm">#FF4F52</span>
            </div>
          </div>
        </div>

        {/* Статус индикаторы */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Статусы и бейджи</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue text-white rounded-full text-sm">
              Активен
            </span>
            <span className="px-3 py-1 bg-green text-white rounded-full text-sm">
              Успешно
            </span>
            <span className="px-3 py-1 bg-orange text-white rounded-full text-sm">
              Предупреждение
            </span>
            <span className="px-3 py-1 bg-error text-white rounded-full text-sm">
              Ошибка
            </span>
            <span className="px-3 py-1 bg-gray-500 text-white rounded-full text-sm">
              Неактивен
            </span>
          </div>
        </div>

        {/* Навигация */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Навигация</h2>
          <nav className="bg-area dark:bg-area bg-gray-50 p-4 rounded-lg border border-stroke-gray dark:border-stroke-gray border-gray-200">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#"
                  className="text-blue hover:text-blue-lighter transition-colors"
                >
                  Главная
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue transition-colors">
                  Услуги
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Тест фонов */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Тестирование фонов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-background dark:bg-background bg-white border border-stroke-gray dark:border-stroke-gray border-gray-200 rounded-lg">
              <h4 className="font-semibold mb-2">bg-background</h4>
              <p className="text-sm">Основной фон приложения</p>
            </div>
            <div className="p-4 bg-area dark:bg-area bg-gray-50 border border-stroke-gray dark:border-stroke-gray border-gray-200 rounded-lg">
              <h4 className="font-semibold mb-2">bg-area</h4>
              <p className="text-sm">Фон для областей контента</p>
            </div>
            <div className="p-4 bg-area-dark dark:bg-area-dark bg-gray-100 border border-stroke-gray-dark dark:border-stroke-gray-dark border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-2">bg-area-dark</h4>
              <p className="text-sm">Темный фон для выделения</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

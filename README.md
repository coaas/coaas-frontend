# COAAS (CloudOps as a Service)

[COAAS](https://coaas.ru) - облачная платформа, предоставляющая набор микросервисов для управления облачной инфраструктурой, развертываниями и операциями.

# Структура проекта

```
src/
├── api/                    # API интеграции и запросы
│   ├── authBeforeRequest/  # Middleware для авторизации
│   ├── deleteAccess/       # API для удаления доступа
│   ├── setAccess/         # API для установки доступа
│   ├── constants.ts       # API константы
│   ├── queries.ts         # API запросы
│   └── index.ts           # Экспорты API
├── assets/                # Статические ресурсы
├── components/            # Переиспользуемые компоненты
│   ├── Avatar/           # Компонент аватара
│   ├── Banner/           # Компонент баннера
│   ├── Button/           # Кнопки
│   ├── Card/             # Карточки
│   ├── Checkbox/         # Чекбоксы
│   ├── Hint/             # Подсказки
│   ├── Icon/             # Иконки
│   ├── Input/            # Поля ввода
│   ├── Layout/           # Компоненты разметки
│   ├── LazyGrid/         # Ленивая сетка
│   ├── Modal/            # Модальные окна
│   ├── Notification/     # Уведомления
│   ├── Popover/          # Всплывающие подсказки
│   ├── PopoverRadix/     # Всплывающие подсказки на Radix
│   ├── Search/           # Поиск
│   ├── Select/           # Выпадающие списки
│   ├── Table/            # Таблицы
│   ├── Tabs/             # Вкладки
│   └── TextArea/         # Текстовые области
├── global/               # Глобальные настройки и конфигурации
├── globalTypes/          # Глобальные типы TypeScript
├── scenes/               # Страницы приложения
│   ├── components/       # Компоненты страниц
│   ├── Scenes.tsx       # Основной компонент сцен
│   └── index.ts         # Экспорты сцен
├── utils/               # Утилиты и хелперы
├── App.tsx              # Корневой компонент приложения
├── globals.css          # Глобальные стили
├── main.tsx            # Точка входа приложения
└── vite-env.d.ts       # Типы для Vite
```

## Кодстайл

- Импорты/экспорты:

  - Используем именованный экспорт:

    ```typescript
    export const Component = () => <div />
    ```

  - Порядок импортов:

    ```typescript
    // вначале идут импорты из библиотек и сторонних модулей
    import { FC } from 'react';
    import { createBrowserRouter } from 'react-router-dom';

    // затем глобальные импорты
    // (при этом каждая секция отделяется друг от друга пустой строкой)
    import { utility } from '@utils/utility';

    // затем локальные импорты
    // при этом выше идут менее вложенные директории
    import { Component } from '../Component';
    import { Namespaces } from './components';
    ```

- Нейминг:

  - Название компонента/утилиты/переменной/типа должно быть говорящим:

    ```typescript
    const fetchUsersData = (params: FetchUsersDataParams) => fetch('/users');

    const Sidebar: FC<SidebarProps> = () => <div />;

    const rowsCount = tableData.rows.length;
    ```

  - Параметры-типы в дженериках имеют префикс T:

    ```typescript
    interface GenericData<TType, TData> {
      type: TType;
      data: TData;
    }
    ```

## [TBD](https://habr.com/ru/companies/avito/articles/680522/)

- Общий порядок работы:
  1) Подтягиваем актуальный `master` и создаем от него ветку согласно [конвенциям](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534)
  2) Выполняем таску
  3) Создаем коммит с комментарием на английском языке, придерживаясь [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/#summary): `git commit -m 'fix: fixed very important thing'` или `git commit -m 'feat: added new feature'`
  4) Пушим в одноименную remote ветку и создаем ПР в `master`
  5) Добавляем ревьюверов вручную и тегаем их в ТГ с просьбой глянуть ПР

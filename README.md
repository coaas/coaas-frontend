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

## Gitflow

- Общий порядок работы:
  1. Получаем задачу с id `$taskId`
  2) Подтягиваем актуальный `develop` и создаем от него ветку с названием `$taskId`
  3) Выполняем таску
  4) Создаем коммит с комментарием на русском языке, придерживаясь [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/#summary): `git commit -m 'fix: пофиксил кривую верстку в Header'` или `git commit -m 'feat: реализовал компонент таблицы'`
  5) Пушим в одноименную remote ветку и создаем ПР в `develop`
  6) Добавляем ревьюверов вручную и тегаем их в ТГ с просьбой глянуть ПР

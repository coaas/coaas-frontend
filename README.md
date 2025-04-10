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

## Gitflow ([TBD](https://habr.com/ru/companies/avito/articles/680522/))

- Общий порядок работы:
  1) Подтягиваем актуальный `master` и создаем от него ветку согласно [конвенциям](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534)
  2) Выполняем таску
  3) Создаем коммит с комментарием на английском языке, придерживаясь [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/#summary): `git commit -m 'fix: fixed very important thing'` или `git commit -m 'feat: added new feature'`
  4) Пушим в одноименную remote ветку и создаем ПР в `master`
  5) Добавляем ревьюверов вручную и тегаем их в ТГ с просьбой глянуть ПР

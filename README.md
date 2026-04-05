# Products App

SPA на React и TypeScript: вход через [DummyJSON Auth](https://dummyjson.com/docs/auth), таблица товаров с [DummyJSON Products](https://dummyjson.com/docs/products), поиск, сортировка, локальное добавление и правка строк (без POST на API).

**Демо (Vercel):** [https://products-table-tau.vercel.app](https://products-table-tau.vercel.app)

## Установка и скрипты

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production-сборка в dist/
npm run preview  # предпросмотр сборки
npm run lint     # ESLint
```

Переменные окружения не нужны: базовый URL API зашит в `src/api/client.ts` (`https://dummyjson.com`).

## Функциональность

- **Авторизация** — обязательные поля, сообщения об ошибках API, чекбокс «запомнить»: токен в `localStorage` (сессия после закрытия браузера) или `sessionStorage` (сброс при закрытии вкладки).
- **Товары** — загрузка списка с пагинацией, индикатор загрузки, поиск через API (`/products/search`).
- **Сортировка** по столбцам на клиенте; **ключ и порядок сортировки** сохраняются в `localStorage` (zustand `persist`).
- **Рейтинг ниже 3** — подсветка красным.
- **Добавить товар** — модальная форма (название, цена, бренд, SKU); после «сохранения» только toast, данные попадают в локальное состояние.
- **Редактирование / удаление** строк — локально (поверх данных API).

Тестовый пользователь DummyJSON (пример): `emilys` / `emilyspass` — см. [документацию](https://dummyjson.com/docs/auth#auth-login).

## Стек

| Инструмент | Назначение |
|------------|------------|
| React 19, TypeScript | UI и типизация |
| Vite 8 | сборка и dev-сервер |
| TanStack Query | запросы к API, кэш, фоновые обновления |
| Zustand | авторизация, таблица (поиск, сортировка, пагинация, локальные правки) |
| React Router 7 | `/login`, `/products`, редиректы для гостя/авторизованного |
| Tailwind CSS | стили |
| Radix UI | Dialog, Label, доступность |

## Структура `src/`

- `api/` — `client`, `auth`, `products`
- `features/auth` — форма входа, `useAuth`
- `features/products` — таблица, формы, запросы, store
- `features/ui` — toast
- `components/` — переиспользуемые UI-компоненты
- `pages/` — `LoginPage`, `ProductsPage`
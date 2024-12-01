
# Развёртывание приложения

Данный проект включает в себя серверную часть на Go и клиентскую часть на React. Следуйте инструкциям ниже для развёртывания приложения.
**Данные для входа:
Login: kholkin@mts.ru
Password: admin111**
## Требования
- **Node.js**: версия 18 или выше
- **npm**: версия 8 или выше
- **Go**: версия 1.21 или выше (необязательно)
- **PostgreSQL** (необязательно)

---
## Клонирование репозитория
```
git clone https://github.com/torderonex/mts-link.git
```

##  Frontend
Фронтенд написан с использованием библиотеки React и стейт менеджером Zustand.
### Развёртывание
1. Перейдите в директорию и установите зависимости:
```
cd client 
npm install 
```
или
```
yarn
```
2. Запустите приложение
```
npm run dev
``` 
или 
```
yarn dev
```
3. Конфигурация .env файла (необязательно)
```
VITE_API_URL = "https://7351aa66e670.vps.myjino.ru/"
```
4. Запустите веб-сайт в браузере по URL ``http://localhost:5137``
### Использование
**Данные для входа:
Login: kholkin@mts.ru
Password: admin111**
## Развёртывание Backend
**Запуск бекенда не является обязательным для работы приложения, т.к. уже запущен на нашем сервере. Воспользуйтесь url ``http://7351aa66e670.vps.myjino.ru``.**
Или разверните локально
### Развёртывание
1.  Перейдите в папку с бекендом и заполните .env файл по примеру .env.example
```
cd server
```
2. Примените миграции при помощи goose или вручную из папки db/migrations
```
go install github.com/pressly/goose/v3/cmd/goose@latest
```
```
make migrate-up
```
или
``` 
goose -dir db/migrations postgres postgresql://$(PG_USR):$(PG_PWD)@$(PG_HOST):$(PG_PORT)/$(PG_DB)?sslmode=disable up
```
3. Запустите приложение 
```
go run main.go
```
Приложение запущено на порту 6969!

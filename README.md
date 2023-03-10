Для работы необходимо:

БД: Запустить скрипт database.sql в postgres;

Сервер:

В терминале перейти в папку server (cd server);
В файле .env вставить свои данные для подключения к серверу;
Установить необходимые модули (npm install cors dotenv express nodemon pg pg-hstore sequelize);4
Запустить (npm run dev);Cancel changes
Клиент:

В новом терминале перейти в папку client (cd client);
В файле .env вставить свои данные для подключения к БД;
Установить необходимые модули (npm install ag-grid-community ag-grid-react axios mobx mobx-react-lite react react-router-dom);
Запустить (npm start);

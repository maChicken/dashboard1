Для работы необходимо:

БД: Запустить скрипт database.sql в postgres;

Сервер:

1. В терминале перейти в папку server (cd server);
2. В файле .env вставить свои данные для подключения к БД;
3. Установить необходимые модули (npm install cors dotenv express nodemon pg pg-hstore sequelize);
4. Запустить (npm run dev);

Клиент:

1. В новом терминале перейти в папку client (cd client);
2. В файле .env вставить свои данные для подключения к серверу;
3. Установить необходимые модули (npm install ag-grid-community ag-grid-react axios mobx mobx-react-lite react react-router-dom);
4. Запустить (npm start);

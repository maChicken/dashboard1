require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const router = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middleware/ErrorHandlingMiddlware')

// Если порт из окружения не доступен
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

//Запуск сервера и подключение бд
const start = async () => {
  try {
      await sequelize.authenticate() // устанавливается подключение к бд
      await sequelize.sync() // синхронизирует структуру бд с моделью
      app.listen(PORT, () => console.log('Server started on port', PORT))
  } catch (error) {
      console.log(error)
  }
}

start()
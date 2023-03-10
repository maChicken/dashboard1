const {Movie} = require('../models/models')
const {Character} = require('../models/models')
const ApiError = require('../error/ApiError')
const db = require('../db')

class TableController {
    // Получение информации о таблицах (название, атрибуты, записи)
    async getAllTables(req, res){
        const result = await db.transaction(async (t) => {
            // Атрибуты таблиц
            const movieTableAtr = await db.query(`SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'movies'
            ORDER BY ordinal_position;`)
            const characterTableAtr = await db.query(`SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'characters'
            ORDER BY ordinal_position;`)
            const tablesAtr = [movieTableAtr[0], characterTableAtr[0]]
            // Название таблиц
            const movieTableName = await Movie.getTableName()
            const characterTableName = await Character.getTableName()
            const tablesName = [movieTableName, characterTableName]
            // Все записи в таблицах
            const movieTableRows = await Movie.findAll({
                order: [['movie_id', 'ASC']]
            })
            const characterTableRows = await Character.findAll()
            const tablesRows = [movieTableRows, characterTableRows]
            // tablesName - массив имен таблиц, tablesRows - в массиве массивы записей(объектов)
            const tablesInfo = {
                tablesName: tablesName,
                tablesRows: tablesRows,
                tablesAtr: tablesAtr
            }

            return tablesInfo
        })
        return res.json(result)
    }

    // Удаление записи по id
    async deleteRows(req, res, next){
        const {rowsId} = req.body
        try {
            if (rowsId[0] === undefined){
                return next(ApiError.badRequest('Не выбрана строка для удаления'))
            } else {
                await Movie.destroy(
                    {where: {
                        movie_id: rowsId
                    }}
                )
                res.json("Успешно удалено!")
            }
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    // Создание записей
    async createRow(req, res, next) {
        try {
            const result = await db.transaction(async (t) => {
                const {movie_title, release_date, runtime, genre, rating} = req.body
                const [[{ max }]] = await db.query(`SELECT MAX("movie_id") AS max FROM public."movies";`)
                await db.query(`ALTER SEQUENCE public."movies_movie_id_seq" RESTART WITH ${max + 1};`)
                await Movie.create({movie_title, release_date, runtime, genre, rating})
                return
            })
            res.json("Успешно добалвено!")
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    // Изменения записей
    async putRows(req, res, next) {
        try{
            const rows= req.body
            await Movie.bulkCreate(rows, {updateOnDuplicate: ['movie_title', 'release_date', 'runtime', 'genre', 'rating'],})
            res.json("Успешно сохранено!")
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new TableController()

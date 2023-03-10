const Router = require('express')
const TableController = require('../controller/tablesController')
const router = new Router()

router.get('/', TableController.getAllTables)
router.delete('/', TableController.deleteRows)
router.post('/', TableController.createRow)
router.put('/', TableController.putRows)

module.exports = router
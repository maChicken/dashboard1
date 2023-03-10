const Router = require('express')
const router = new Router()

const tablesRouter = require('./tablesRouters')

router.use('/tables', tablesRouter)

module.exports = router
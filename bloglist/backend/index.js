const { PORT } = require('./utils/config')
const app = require('./app')
const http = require('http')
const logger = require('./utils/logger')

const server = http.createServer(app)
server.listen(PORT, () => logger.Info(`Server running on port ${PORT}`))

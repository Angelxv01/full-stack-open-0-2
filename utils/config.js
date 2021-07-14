require('dotenv').config()

const MONGODB_API = process.env.MONGODB_API
const PORT = process.env.PORT

module.exports = { MONGODB_API, PORT }

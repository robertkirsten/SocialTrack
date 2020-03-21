const sqlite3 = require('sqlite3')

const schema = require('./schema')

const DB_PATH = 'instance/db.db'

const db = module.exports = new sqlite3.Database(DB_PATH, err => {
  if (err)
    return console.log(err)
  console.log(`Connected to ${DB_PATH} database.`)
})

db.exec(schema, err => {
  if (err)
    return console.log(err)
})


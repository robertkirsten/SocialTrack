const sqlite3 = require('sqlite3');

const schema = require('./schema');

const DB_PATH = 'instance/db.db';

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Connected to ${DB_PATH} database.`);
});

module.exports = db;

db.exec(schema, (err) => {
  if (err) {
    console.log(err);
  }
});

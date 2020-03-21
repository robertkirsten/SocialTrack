module.exports = `CREATE TABLE IF NOT EXISTS person (
    id TEXT PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    infected INTEGER NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS contact (
    person1id TEXT NOT NULL,
    person2id TEXT NOT NULL,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (person1id) REFERENCES person (id),
    FOREIGN KEY (person2id) REFERENCES person (id)
  );
`

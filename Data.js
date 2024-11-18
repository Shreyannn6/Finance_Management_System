// dbConnection.js
const mysql = require('mysql2');

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'DS67@MCKVIE',
  database: 'registeredusers',
});

database.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the Database successfully');
});

module.exports = database; // Export the database connection

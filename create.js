// createTable.js
const database = require('./Data'); // Import the MySQL connection

// Define the SQL query for creating the Users table
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Run the query to create the table
database.query(createUsersTable, (error, result) => {
  if (error) {
    console.error('Error creating Users table:', error);
    return;
  }
  console.log('Users table created successfully.');
});

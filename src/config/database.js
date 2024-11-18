const mysql = require('mysql')
const express = require('express')
require('dotenv').config();
const createTableQuery = require('../model/User')

 const app = express()

const database = mysql.createConnection({
 host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

database.connect((error)=>{
    if(error){
        console.log(`The error occured during database connection is ${error} `)
    }
    else{
        console.log("Database has been connected successfully.......................")
        database.query(createTableQuery, (err, results) => {
            if (err) {
              console.error('Error creating table:', err);
              return;
            }
            console.log('Table `registeredusers` created or already exists.');
          });
    }
})



module.exports = database;
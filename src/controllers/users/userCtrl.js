const bcrypt = require('bcrypt');
// const expressAsyncHandler = require('express-async-handler')
const mysql = require('mysql')
const database = require('../../config/database'); // Ensure your database connection is set up properly
const expressAsyncHandler = require('express-async-handler');

const registerUser = expressAsyncHandler((req, res) => {
    const { firstName, lastName, email, mobile, password } = req.body;

    const query = `SELECT * FROM registeredusers WHERE email = ? OR mobile = ?`;
    database.query(query, [email, mobile], (error, results) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).send("Server error"); // Return to prevent further execution
        }
        
        if (results.length > 0) {
            const existingUser = results[0];
            if (existingUser.firstName === firstName && existingUser.lastName === lastName) {
                console.log("You are already registered.")
                return res.status(409).send("You are already registered."); // Return to prevent further execution
            } else {
                console.log("Email or Mobile already exists with different user details.")
                return res.status(409).send("Email or Mobile already exists with different user details."); // Return to prevent further execution
            }
        }

        // If no duplicate found, proceed with registration
        bcrypt.hash(password, 10, (error, hashedPassword) => {
            if (error) {
                console.error("Error hashing password:", error);
                return res.status(500).send("Error during registration."); // Return to prevent further execution
            }

            const insertQuery = `INSERT INTO registeredusers (firstName, lastName, mobile, email, password) VALUES (?, ?, ?, ?, ?)`;
            database.query(insertQuery, [firstName, lastName, mobile, email, hashedPassword], (error) => {
                if (error) {
                    console.error("Error inserting data:", error);
                    return res.status(500).send("Error during registration."); // Return to prevent further execution
                }

                console.log("Registration Successful!!!!!");
                res.status(200).send("Registration Successful!!!!");
            });
        });
    });
})

const fetchUsers = expressAsyncHandler((req, res) => {
    try {
        const query = 'SELECT * FROM registeredusers';
        database.query(query, (error, results) => {
            if (error) {
                console.error("Database query error:", error);
                return res.status(500).send("Server error"); // Return to prevent further execution
            }
            // Send only one response with a JSON object
            res.json({ message: "The list of users are:", users: results });
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = { registerUser, fetchUsers };

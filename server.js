// Import Express and MySQL
const express = require('express');
const mysql = require('mysql2');

// Adds PORT designation
const PORT = process.env.PORT || 3001;
const app = express();

// Add Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// _______________________________________________________ Connect to databse _________________________________________________________
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
        database: 'election',
    },
    console.log('Connected to the election database.')
);

// // Tests the connection
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });


//_________________________________________________________ Queries Section _________________________________________________________

// // Query: All Candidates
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// // Query: Single Candidate
// db.query(`SELECT * FROM candidates WHERE id = 5`, (err, rows) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(rows);
// });

// Query: Delete a Candidate
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

// Query: Create a Candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?, ?, ?, ?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});


// _________________________________________________________  404 Route _________________________________________________________
// Default response for any other request (Not Found)
// MUST BE THE LAST ROUTE AS IT WILL OVERRIDE ALL OTHERS
app.use((req, res) => {
    res.status(404).end();
});


// _________________________________________________________  Connection Function _________________________________________________________
// Connection Function to start the server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
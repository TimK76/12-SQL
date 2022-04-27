// Import Express and MySQL
const express = require('express');
const mysql = require('mysql2');

// Adds PORT designation
const PORT = process.env.PORT || 3001;
const app = express();

// Add Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to databse
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

// Default response for any other request (Not Found)
// MUST BE THE LAST ROUTE AS IT WILL OVERRIDE ALL OTHERS
app.use((req, res) => {
    res.status(404).end();
});

// Connection Function to start the server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
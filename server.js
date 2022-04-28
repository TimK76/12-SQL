// Import Express and MySQL
const express = require("express");
const mysql = require("mysql2");
const inputCheck = require('./utils/inputCheck');

// Adds PORT designation
const PORT = process.env.PORT || 3001;
const app = express();

// Add Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// _______________________________________________________ Connect to databse _________________________________________________________
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "67CH@plin2022",
    database: "election",
  },
  console.log("Connected to the election database.")
);

// // Tests the connection
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });

//_________________________________________________________ Queries Section _________________________________________________________

// Query: All Candidates
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT candidates.*, parties.name AS party_name  FROM candidates  LEFT JOIN parties  ON candidates.party_id = parties.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Query: Single Candidate
// Get a single candidate
app.get("/api/candidate/:id", (req, res) => {
  const sql =`SELECT candidates.*, parties.name  AS party_name  FROM candidates  LEFT JOIN parties  ON candidates.party_id = parties.id  WHERE candidates.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// Delete a candidate
app.delete("/api/candidate/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// Query: Create a Candidate
app.post("/api/candidate", ({ body }, res) => {
  const errors = inputCheck(body, "first_name", "last_name", "industry_connected");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});
// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

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

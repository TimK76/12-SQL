const mysql = require("mysql2");

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
  
  module.exports = db;
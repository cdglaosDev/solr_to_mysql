//mysql connection setup
const mysql = require('mysql2');
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "chan@234",
    database: "db_vrms",
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
});

module.exports = { connection };

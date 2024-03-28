const mysql = require('mysql2');

function connectToMySQL() {
  const connection = mysql.createConnection({
    host: 'mysql',
    port: 3306,
    user: 'root',
    password: 'redhat1234#',
    database: 'Three_Tier_Project',
    defaultAuthenticationPlugin: 'mysql_native_password'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL server: ' + err.stack);
      return null;
    }
    console.log('Connected to MySQL server as id ' + connection.threadId);
  });

  return connection;
}

function executeQuery(connection, query) {

  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      reject(err);
    }
    return results;
  });
}

function closeConnection(connection) {
  connection.end((err) => {
    if (err) {
      console.error('Error closing connection: ' + err.stack);
      return;
    }
    console.log('Connection closed successfully');
  });
}

module.exports = {
  connectToMySQL,
  executeQuery,
  closeConnection
};
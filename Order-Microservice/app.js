const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { connectToMySQL, executeQuery, closeConnection } = require('./utils/sql');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:3001' }));

app.get('/order', async (req, res) => {
    try {
        // Connect to SQL Server
        const connection = connectToMySQL();

        // Make HTTP request to the other service
        const response = await axios.get('http://threetierarchitecture-user-ms-1:8080/users');

        const results = parseResponse(JSON.stringify(response.data));
        results.map((result) => {
            var id = result.id;
            var totalPrice = result.numberOfBooks * result.price;
            executeQuery(connection, `INSERT INTO Three_Tier_Project.Orders(Customer_ID,PRICE) VALUES('${id}',${totalPrice})`);
        })
        connection.query(`SELECT * FROM Three_Tier_Project.Orders`, (err, results) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            res.json(results);
        });
        closeConnection(connection);
    } catch (error) {
        console.error('Error calling other service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

function parseResponse(data) {
    return JSON.parse(data);
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
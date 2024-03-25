const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to call another service and parse its response
app.get('/order', async (req, res) => {
    try {
        // Make HTTP request to the other service
        const response = await axios.get('http://threetierarchitecture-user-ms-1/users');

        // Parse the response
        const parsedResponse = parseResponse(response);
        
        // Return the parsed response
        res.json(parsedResponse);
    } catch (error) {
        console.error('Error calling other service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to parse the response from the other service
function parseResponse(data) {
    // Implement your parsing logic here
    // For example, if the response is JSON, you can parse it like this:
    return JSON.parse(data);
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
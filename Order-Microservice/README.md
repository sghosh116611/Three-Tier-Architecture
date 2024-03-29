# Node.js Order Management Application

## Description
This is a Node.js application built for managing orders. It interacts with a MySQL database and makes HTTP requests to another service to fetch user data for processing orders.

## Installation
1. Clone the repository:


2. Navigate into the project directory:


3. Install dependencies:

npm install

## Usage
1. Ensure you have MySQL installed and running.
2. Set up the MySQL connection details in the `utils/sql.js` file.
3. Start the Node.js server: node app.js

4. The server will run on port 3000 by default.

## Endpoints
- **GET /order**: Fetches order data by making an HTTP request to another service and storing processed data in the database.

## Configuration
- The server uses CORS middleware to allow requests from `http://localhost:3001`. Change the origin URL in `app.js` if necessary.
- Ensure proper MySQL connection details are set up in `utils/sql.js`.

## Author
Soumojit Ghosh
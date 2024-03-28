import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [result, setResult] = useState(null);

  // Function to call the Node.js API
  const callNodeApi = async () => {
    try {
      // Make a GET request to the Node.js API endpoint
      const response = await axios.get('http://localhost:3000/order');

      // Set the result state with the response data
      setResult(response.data);
    } catch (error) {
      console.error('Error calling Node.js API:', error);
    }
  };


  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Order Inventory</h1>
        <button className="button" onClick={callNodeApi}>Get Orders</button>
        {result && (
          <div className="result-container">
            <h2 className="result-title">Result:</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {result.map(item => (
                  <tr key={item.Customer_ID}>
                    <td>{item.ID}</td>
                    <td>{item.Price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>

  );
}

export default App;

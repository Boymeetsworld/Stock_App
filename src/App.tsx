import React, {useEffect, useState} from 'react'
import './App.css';

function App() {

const [stocks, setStocks] = useState <any[]>([]);

  useEffect (() => {
    const ws = new WebSocket('ws://localhost:3001');
    
    ws.onmessage = (event) => {
          const updatedPrices = JSON.parse(event.data);
          setStocks(updatedPrices);
        };


        return () => {
        ws.close();
      };
    }, []);


  return (
    <div className="App">
      <h1>Stock Price Streaming App</h1>
      <table className='stock-table'>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>${stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
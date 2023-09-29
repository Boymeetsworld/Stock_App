import WebSocket from "ws";
import fs from 'fs';

const http = require('http')
const express = require('express');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });



const stocksData = JSON.parse(fs.readFileSync('src/stock_list.json', 'utf-8'));

const interval = setInterval(() => {
    stocksData.forEach((stock:any) => {
      stock.price = (Math.random() * 1000).toFixed(2); 
    });



    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(stocksData));
        }
    });

},100);

wss.on("connection", (ws : any) => {
  console.log("client connected");


  ws.on("close", () => {
    console.log("Client Disconnected");
    clearInterval(interval);
  });
});

  server.listen(3001, () => {
    console.log("WebSocket server is running on port 3001");
  });


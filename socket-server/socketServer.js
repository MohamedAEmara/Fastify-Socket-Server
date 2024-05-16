import { WebSocketServer } from 'ws';
import * as dotenv from 'dotenv';
dotenv.config();

// Initialize WebSocket server
const wss = new WebSocketServer({ host: process.env.HOST, port: 8081 });

// Event handlers for WebSocket server
// NOTE: Port is a unique identifier for clients.
wss.on('connection', (ws, req) => {
    console.log(`A new client connected! #${req.socket.remotePort}`);
    
    // Error logger
    ws.on('error', console.error);

    // Message event handler
    ws.on('message', function message(data) {
        // Log the message from the client..
        console.log('A message from client received: %s', data);

        // Respond from the server..
        ws.send('We got your message; from server!');
    });

    // Close event handler
    ws.on('close', () => {
        console.log(`A client disconnected! #${req.socket.remotePort}`);
    })
});

console.log('WebSocket server is running on port 8081');
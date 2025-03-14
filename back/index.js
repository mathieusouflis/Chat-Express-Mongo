import express from 'express';
import { Server } from 'socket.io'; 
import dotenv from "dotenv";
import connectDB from './db/connectDB.js'
import MessageRouter from "./routes/messages.route.js";
import { sendMessageHandler } from './services/socket.service.js';

dotenv.config();
connectDB()

const app = express({
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    }
});
const PORT = process.env.PORT || 4865;

app.use(express.json());
app.use(MessageRouter);

const server = app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
}) ;

io.use(sendMessageHandler);

let userConnected = new Set();
io.on('connect', (socket) => {
  userConnected.add(socket.id);
  io.emit('total_user', userConnected.size)

  socket.on('disconnect', () =>{
      userConnected.delete(socket.id);
      io.emit('total_user', userConnected.size)

  })
});
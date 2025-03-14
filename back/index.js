import express from 'express'
import dotenv from 'dotenv'
import connectDB from './dbConnect.js'
import { createServer } from 'http'
import { Server } from 'socket.io'

import sendMessage from './sendMessage.js'

dotenv.config()
connectDB()
const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

app.use(express.json())

io.on('connection', (socket) => {
  console.log('Un client s\'est connecté');

  sendMessage(socket, io);

    socket.on('disconnect', () => {
      console.log('Un client s\'est déconnecté');
    });
});

const port = process.env.PORT || 4865;

server.listen(port, () =>
    console.log(`Le serveur est en écoute sur le port ${port}`)
  )


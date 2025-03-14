import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/db/dbConnect.js'

import sendMessage from './sendMessage.js'

dotenv.config()
connectDB()
const app = express()

app.use(express.json())

io.on('connection', (socket) => {
  console.log('Un client s\'est connecté');

  sendMessage(socket, io);

    socket.on('disconnect', () => {
      console.log('Un client s\'est déconnecté');
    });
});

const port = process.env.PORT || 4865;

app.listen(port, () =>
    console.log(`Le serveur est en écoute sur le port ${port}`)
  )
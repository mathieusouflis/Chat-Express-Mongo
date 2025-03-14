import express from 'express';
import { Server } from 'socket.io'; 
import dotenv from "dotenv";
import connectDB from './db/connectDB.js'
import MessageRouter from "./routes/messages.route.js";
import sendMessageHandler from './routes/sendMessagehandler.js'
import routerLogs from './back/routes/test.route.js';

dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT || 4865;
const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.use(express.json());
app.use(MessageRouter);
app.use(routerLogs);

const server = app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});




const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
}) ;

io.use(sendMessageHandler);

let userConnected = new Set();

function userEvent(socket){
    console.log(socket.id);
    
    userConnected.add(socket.id);
    io.emit('total_user', userConnected.size)

    socket.on('disconnect', () =>{
        userConnected.delete(socket.id);
        io.emit('total_user', userConnected.size)

    })
}

io.on('connection', userEvent);
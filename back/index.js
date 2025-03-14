//Import des modules utile
import express from 'express';
import { Server } from 'socket.io'; 
import dotenv from "dotenv";
import MessageRouter from "./routes/messages.route.js";

//lancement du serveur web
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4865;
const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.use(express.json());
app.use(MessageRouter);

const server = app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});




const io = new Server(server) ;
let userConnected = new Set();


//Fonction qui affiche le nombre d'utilisateur connecté
function userEvent(socket){
    console.log(socket.id); //Affiche le socket id dans la console
    
//Lorsqu'un utilisateur se connecte, son socket id est ajouté au nombre d'utilisateur connecté 
    userConnected.add(socket.id);
    io.emit('total_user', userConnected.size)

//Lorsqu'un utilisateur se déconnecte, son socket id est supprimé du nombre d'utilisateur connecté
    socket.on('disconnect', () =>{
        userConnected.delete(socket.id);
        io.emit('total_user', userConnected.size)

    })
}


io.on('connection', userEvent);
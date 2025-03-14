
import { Message } from "../model/modelMessage.js";
// Gère l'envoi d'un message par un utilisateur, le stock dans la base de données et l'envoie à tous les utilisateurs connectés
const sendMessageHandler = (socket, next) => {
    socket.on('sendMessage', async (Message) => {
        if (!Message || !Message.name || !Message.message || !Message.date || !Message.heure) {
        console.log('Données manquantes');
        return;
        }
        
        try {
        const messageData = {
            id: Message.id,
            name: Message.name,
            message: Message.message,
            date: Message.date,
            heure: Message.heure,
        } 
        const newMessage = new messageData(Message);
        await newMessage.save();
        socket.broadcast.emit('message', messageData);
    }
        catch (error) {
        console.log('Erreur lors de l\'envoi du message :', error);
        }
        next();
    });
    }

export default sendMessageHandler;
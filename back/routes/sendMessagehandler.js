
import { Message, messageValidation } from "../model/modelMessage.js";
// Gère l'envoi d'un message par un utilisateur, le stock dans la base de données et l'envoie à tous les utilisateurs connectés
import { Message, messageValidation } from "../model/modelMessage.js";

// Gère l'envoi d'un message par un utilisateur, le stock dans la base de données et l'envoie à tous les utilisateurs connectés
const sendMessageHandler = (socket, next) => {
    socket.on('sendMessage', async (Message) => {
        try {
            const { error } = messageValidation(data);
            if (error) {
                console.log('Validation échouée :', error.message);
                return;
            }

            const messageData = {
              id: Message.id,
              name: Message.name,
              message: Message.message,
              date: Message.date,
              heure: Message.heure,
            }
            const newMessage = new Message(data);

            await newMessage.save();

            socket.broadcast.emit('message', newMessage);
        } catch (error) {
            console.log('Erreur lors de l\'envoi du message :', error);
        }
        next();
    });
};

export default sendMessageHandler;
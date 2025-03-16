import { Message, messageValidation } from "../models/message.model.js";

export const sendMessageHandler = (socket, next) => {
    socket.on('message', async (data) => {        
        try {
            const { error } = messageValidation.validate(data);
            if (error) {
                console.log('Validation échouée :', error.message);
                return;
            }

            const newMessage = new Message(data);
            await newMessage.save();

            socket.broadcast.emit('message', data);
        } catch (error) {
            console.log('Erreur lors de l\'envoi du message :', error);
        }
    });
    next()
};



// Gère l'envoi d'un message par un utilisateur, le stock dans la base de données et l'envoie à tous les utilisateurs connectés

const sendMessageHandler = (socket, next) => {
    socket.on('sendMessage', async (data) => {
        if (!data || !data.id || !data.name || !data.message || !data.date || !data.heure) {
        console.error('Données manquantes');
        return next(new Error('Données manquantes'));
        }
        
        try {
        const Message = {
            id: data.id,
            name: data.name,
            message: data.message,
            date: data.date,
            heure: data.heure,
        } 
        const newMessage = new Message(Message);
        await newMessage.save();
        socket.broadcast.emit('newMessage', newMessage);
    }
        catch (error) {
        console.error('Erreur lors de l\'envoi du message :', error);
        }
        next();
    });
    }

export default sendMessageHandler;


// Gère l'envoi d'un message par un utilisateur, le stock dans la base de données et l'envoie à tous les utilisateurs connectés

const sendMessageHandler = (socket, next) => {
    socket.on('sendMessage', async (data) => {
        if (!data || !data.name || !data.message || !data.date || !data.heure) {
        console.log('Données manquantes');
        return;
        }
        
        try {
        const messageData = {
            id: data.id,
            name: data.name,
            message: data.message,
            date: data.date,
            heure: data.heure,
        } 
        const newMessage = new messageData(data);
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
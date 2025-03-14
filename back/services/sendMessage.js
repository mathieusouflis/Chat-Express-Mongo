import Message from '';

// Gère l'envoi d'un message par un utilisateur, le stock dans la base de données et l'envoie à tous les utilisateurs connectés

const sendMessage = (socket, io) => {
socket.on('sendMessage', async ({ data }) => {
    const { id, name, message, date, heure } = data;

    try {
      const newMessage = new Message({ id, name, message, date, heure });
      await newMessage.save();

      io.emit('message', newMessage);

    } catch (error) {
      console.error('Erreur, donnée introuvable ! :', error);
    }
  });
};  

export default sendMessage;

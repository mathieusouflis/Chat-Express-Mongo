// Gère l'neovi d'un message par un utilisateur

const sendMessage = (socket, io) => {
socket.on('sendMessage', ({ username, message }) => {
    if (!username || !message) 
        return;
    io.emit('message', message);
  });
};  

export default sendMessage;

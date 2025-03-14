import { Message } from "../models/message.model.js";


export const deleteMessage = async (req, res) => {
    const messageId = req.params.id;

    try {
        const deletedLog = await Message.findByIdAndDelete(messageId);

        if (!deletedLog) {
        return res.status(404).json({ message: 'Log non trouvé' });
        }

        res.status(200).json({ message: 'Log supprimé avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la suppression du log' });
    }
}
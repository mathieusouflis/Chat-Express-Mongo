const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/tchatDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.log('Erreur de connexion à MongoDB:', err));

const logSchema = new mongoose.Schema({
  id: String,
  name: String,
  message: String,
  date: String,
  heure: String,
});

const Log = mongoose.model('Log', logSchema);

app.use(express.json());

app.delete('/logs/:id', async (req, res) => {
  const logId = req.params.id;

  try {
    const deletedLog = await Log.findByIdAndDelete(logId);

    if (!deletedLog) {
      return res.status(404).json({ message: 'Log non trouvé' });
    }

    res.status(200).json({ message: 'Log supprimé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la suppression du log' });
  }
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
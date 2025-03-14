import Joi from "joi";
import mongoose from "mongoose";

// Définir le schéma mongoose pour un message de chat
const messageSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  heure: {
    type: String,
    required: true,
  }
});

// Créer un modèle basé sur le schéma
const Message = mongoose.model('Message', messageSchema);

// Validation avec Joi
const messageValidation = Joi.object({
  id: Joi.string()
    .required()
    .messages({
        
      'string.empty': 'Le nom est obligatoire',
    }),
  message: Joi.string()
    .required()
    .messages({
      'string.empty': 'Le message est obligatoire',
    }),
  date: Joi.string()
    .required()
    .messages({
      'string.empty': 'La date est obligatoire',
    }),
  heure: Joi.string()
    .required()
    .messages({
      'string.empty': 'L\'heure est obligatoire',
    }),
});

// Exporter le modèle et la fonction de validation
export { Message, messageValidation };

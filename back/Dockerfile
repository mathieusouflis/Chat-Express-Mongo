# Utiliser une image de base Node.js
FROM node

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port 4865
EXPOSE 4865

# Démarrer l'application
CMD ["npm", "start"]
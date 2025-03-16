# Message App
An app where we can send message in real time between 2 clients or more.... And manage the logs...
## Deploy (Dev)
Install all dependencies
```bash
cd front && npm install
```
```bash
cd back && npm install
```
Deploy localy the project
```bash
cd front && npm run dev
cd back && npm run dev
```
## Deploy (Prod)
You have to use Docker to deploy our project in prod
```bash
docker compose up --build
```    
## Environment Variables
To run this project, you will need to add the following environment variables to your .env file

`DB`

## API Reference
#### Get all messages
```http
  GET localhost:4865/messages
```
#### Delete a message
```http
  DELETE localhost:4865/messages/:id
```
## Tech Stack
**Client:** React, Socket.io/client

**Server:** Node, Express, Mongoose, Joi, Socket.io

# AUTHORS
- Nabil LMRABET
- Laurent DUBOIS
- Fara HOVOR
- Sarah PONNOURANGAME
- Mathieu SOUFLIS

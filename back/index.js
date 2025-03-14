import express from "express";
import MessageRouter from "./routes/messages.route.js";
const app = express();
const port = 3000;

app.use(express.json());

app.use(MessageRouter);

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
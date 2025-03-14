import express from 'express'
import routerLogs from './back/routes/test.route.js';

const port = 4865;
const app = express();
app.use(routerLogs);



app.listen(port, () =>
  console.log(`Le serveur est en écoute sur le port ${port}`)
);
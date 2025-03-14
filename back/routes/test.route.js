import express from 'express';
import { getLogs } from '../services/test.service.js';


const router = express.Router();
router.get('/Logs', getLogs);

export default router;
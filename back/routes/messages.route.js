import { Router } from "express";
import { deleteMessage } from "../services/message.service.js";

const router = Router()

router.delete("/messages/:id", deleteMessage)

export default router
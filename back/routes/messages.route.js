import { Router } from "express";
import { deleteMessage, getAllMessages } from "../services/message.service.js";

const router = Router()

router.delete("/messages/:id", deleteMessage)
router.get("/messages", getAllMessages)


export default router
import { Message } from "../models/modelMessage";

const getLogs = async (req, res) => {
    const Logs = await Message.find();
    res.send(Logs);
  }

export { getLogs };
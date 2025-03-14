import { Message, messageValidation } from "./modelMessage";

const printLogs = async (req, res) => {
    const Logs = await Message.find();
    res.send(Logs);
  }

  export { printLogs };
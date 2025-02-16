import { Message, Events } from "discord.js";
import createMessageInfo from "../utils/createMessageInfo";
import MessageQueue from "../class/ConnectMQ";

export = {
  name: Events.MessageCreate,
  async execute(message: Message) {
    try {
      if(message.author.bot) return;
      
      const messageQueue = MessageQueue.getInstance()
      messageQueue.pushMessage(createMessageInfo(message))
    } catch (err) {
      console.log(err)
    }
  }
}
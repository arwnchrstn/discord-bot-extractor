import { Message } from "discord.js";

const messageAttachmentChecker = (message: Message) => {
  return message.attachments.size > 0
}

export default messageAttachmentChecker
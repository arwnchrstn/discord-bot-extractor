import { Message } from "discord.js";
import checkMessageIfContainsUrl from "../utils/urlChecker";
import profaneWordChecker from "../utils/profaneWordChecker";
import { IMessageInfo } from "../interface/IMesageInfo";
import imageMessageChecker from "./imageMessageChecker";

const createMessageInfo = (message: Message): string => {
  const messageInfo: IMessageInfo = {
    authorId: message.author.id,
    dateSent: new Date().toISOString(),
    isMessageProfane: profaneWordChecker(message.content) ? 1 : 0,
    isMessageContainingUrl: checkMessageIfContainsUrl(message.content) ? 1 : 0,
    isMessageContainingImage: imageMessageChecker(message) ? 1 : 0
  }

  return JSON.stringify(messageInfo)
}

export default createMessageInfo
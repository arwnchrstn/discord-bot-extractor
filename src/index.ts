import { Client, Collection, GatewayIntentBits } from "discord.js"
import registerEvents from "./utils/registerEvents"
import MessageQueue from "./class/ConnectMQ"
import 'dotenv/config'
import DeadLetterMQ from "./class/DeadLetterMQ"
import Express, { Request, Response } from 'express'

const app = Express()

const client: any = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

client.commands = new Collection()

registerEvents(client)

client.login(process.env.token)

const messageQueue = MessageQueue.getInstance()
const deadQueue = DeadLetterMQ.getInstance()

deadQueue.init()
messageQueue.init()

app.listen(10000, () => {
  console.log('Listening on port 10000')
})

app.get('/health', (req: Request, res: Response) => {
  console.log('Health: ' + new Date().toISOString())
  res.send('Health')
})
import { Client, Events } from "discord.js";

export = {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client) {
    console.log(`${client.user?.username} is online`)
  }
}
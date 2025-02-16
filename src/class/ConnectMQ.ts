import * as amqplib from 'amqplib'

class MessageQueue {
  private static instance: MessageQueue;
  private connection: amqplib.Connection | null = null
  private channel: amqplib.Channel | null = null

  private constructor() { }

  static getInstance(): MessageQueue {
    if (!MessageQueue.instance) {
      MessageQueue.instance = new MessageQueue();
    }
    return MessageQueue.instance;
  }

  public async init(): Promise<void> {
    try {
      this.connection = await amqplib.connect(process.env.queue_url as string)
      this.channel = await this.connection.createChannel()
      
      await this.channel.assertQueue(process.env.queue_name as string, {
        durable: true,
        arguments: {
          "x-dead-letter-exchange": process.env.dead_letter_ex as string,
          "x-dead-letter-routing-key": process.env.dead_queue_routing_key as string,
          "x-message-ttl": 1000 * 60 * 60 * 24 * 7
        }
      });
  
      console.log('Message queue initialized')
    } catch(err: any) {
      console.log(err)
    }
  }

  public getConnection(): amqplib.Connection | null {
    return this.connection
  }

  public getChannel(): amqplib.Channel | null {
    return this.channel
  }

  public pushMessage(message: string): void {
    try {
      this.channel?.sendToQueue(process.env.queue_name as string, Buffer.from(message))
    } catch (err) {
      console.log(err)
    }
  }
}

export default MessageQueue
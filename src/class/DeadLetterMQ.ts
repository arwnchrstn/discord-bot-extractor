import * as amqplib from 'amqplib'

class DeadLetterMQ {
  private static instance: DeadLetterMQ;
  private connection: amqplib.Connection | null = null
  private channel: amqplib.Channel | null = null

  private constructor() { }

  static getInstance(): DeadLetterMQ {
    if (!DeadLetterMQ.instance) {
      DeadLetterMQ.instance = new DeadLetterMQ();
    }
    return DeadLetterMQ.instance;
  }

  public async init(): Promise<void> {
    try {
      this.connection = await amqplib.connect(process.env.queue_url as string)
      this.channel = await this.connection.createChannel()
      await this.channel.assertExchange(process.env.dead_letter_ex as string, 'direct', { durable: true })
      await this.channel.assertQueue(process.env.dead_queue as string, { durable: true })
      await this.channel.bindQueue(process.env.dead_queue as string, process.env.dead_letter_ex as string, process.env.dead_queue_routing_key as string);

      console.log('Dead letter queue initialized')
    } catch (err) {
      console.log(err)
    }
  }
}

export default DeadLetterMQ
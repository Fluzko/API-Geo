import { RmqOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { Env } from './contants';

export const getRMQConfig = (): RmqOptions => {
  const {
    RMQ_HOST,
    RMQ_USERNAME,
    RMQ_PASSWORD,
    RMQ_QUEUE,
    RMQ_PORT,
    NODE_ENV,
  } = process.env;

  if (NODE_ENV === Env.LOCAL) dotenv.config();

  const rmqUrl = `amqp://${RMQ_USERNAME}:${RMQ_PASSWORD}@${RMQ_HOST}:${RMQ_PORT}`;
  return {
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue: RMQ_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  };
};

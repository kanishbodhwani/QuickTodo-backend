// import amqp from 'amqplib';
// import { rabbitmqConfig } from '../../config';

// export const setupPublisher = async () => {
//   const connection = await amqp.connect(rabbitmqConfig.connection);
//   const channel = await connection.createChannel();
//   await channel.assertExchange(rabbitmqConfig.exchange, 'direct', {
//     durable: true
//   });

//   return channel;
// };

// export const setupSubscriber = async () => {
//   const connection = await amqp.connect(rabbitmqConfig.connection);
//   const channel = await connection.createChannel();
//   await channel.assertExchange(rabbitmqConfig.exchange, 'direct', {
//     durable: true
//   });

//   // Create queues
//   await channel.assertQueue(rabbitmqConfig.queues.userQueue, { durable: true });

//   // Bind queues to exchange with routing key (queue name)
//   await channel.bindQueue(
//   rabbitmqConfig.queues.userQueue,
//     rabbitmqConfig.exchange,
//     rabbitmqConfig.queues.userQueue
//   );

//   return channel;
// };
// import amqp from 'amqplib';
// import { rabbitmqConfig } from '../config';
// import { setupPublisher, setupSubscriber } from '../shared/rabbitmq';
// import { QueueMessage } from '../shared/types';
// import { fetchUserLocation } from './queries/users';

// const { exchange, queues } = rabbitmqConfig;

// const userQueueHandler = async (msg: amqp.ConsumeMessage | null) => {
//   if (msg) {
//     console.log('Received message in user service:', msg.content.toString());
//     const message: QueueMessage = JSON.parse(msg.content.toString());
//     const { userID , replyQueue } = message.data as { userID: string, replyQueue: string };
    
//     // Check the type of message and perform the appropriate action
//     switch (message.type) {
//       case 'FETCH_USER_LOCATION':
//         // const userLocation = await fetchUserLocation(userID);
//         const userLocation = {
//           latitude: 40.7128,
//           longitude: -74.006
//         }
//         console.log(userLocation);
//         const replyMessage = { type: 'USER_LOCATION', data: userLocation };
//         const replyChannel = await setupPublisher();
//         replyChannel.sendToQueue(replyQueue, Buffer.from(JSON.stringify(replyMessage)), { persistent: true });
//         break;

//       // Add more cases for other types of messages

//       default:
//         console.warn('Unknown message type:', message.type);
//     }
//     console.log('Received message in user service:', message.type);
//   }
// };

// const setupUserQueue = async () => {
//   const channel = await setupSubscriber();
//   await channel.assertQueue(queues.userQueue, { durable: true });
//   channel.consume(queues.userQueue, userQueueHandler, { noAck: true });
// };

// export const startConsumers = async () => {
//   await setupUserQueue();
// };

// export const publishToUserQueue = async (type: string, data: Object) => {
//   const channel = await setupPublisher();
//   const message = { type, data };
//   channel.sendToQueue(queues.userQueue, Buffer.from(JSON.stringify(message)), {
//     persistent: true
//   });
// };
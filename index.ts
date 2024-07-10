import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './src/routes';
import { SERVER_PORT } from './src/constants';
import { errorHandler } from './src/middlewares';

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: '*',
});

routes(fastify);

fastify.setErrorHandler(errorHandler);

const start = async () => {
  try {
    await fastify.listen({ port: SERVER_PORT });
    fastify.log.info(`Server listening on port ${SERVER_PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
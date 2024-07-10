declare module 'fastify-cors' {
    import { FastifyPluginCallback, FastifyPluginAsync } from 'fastify';
  
    interface FastifyCorsOptions {
      origin?: string | boolean | RegExp | (string | RegExp)[] | ((origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void);
      methods?: string[];
      allowedHeaders?: string[];
      exposedHeaders?: string[];
      credentials?: boolean;
      maxAge?: number;
      preflightContinue?: boolean;
      optionsSuccessStatus?: number;
      preflight?: boolean;
      strictPreflight?: boolean;
    }
  
    const fastifyCors: FastifyPluginCallback<FastifyCorsOptions> | FastifyPluginAsync<FastifyCorsOptions>;
  
    export default fastifyCors;
  }
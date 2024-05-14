import Fastify from 'fastify';
import * as dotenv from 'dotenv';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import prisma from './db/db.js';
import userRoutes from './routes/user.route.js';

dotenv.config();

const fastify = Fastify({
    logger: false,
});


const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

// Register Swagger plugin
fastify.register(swagger, {
    swagger: {
        info: {
            title: 'Fastify API',
            description: 'API documentation for the Fastify server',
            version: '1.0.0',
        },
        host: `${host}:${port}`,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    }
});

// Register SwaggerUI plugin
fastify.register(swaggerUi, {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Fastify API',
            description: 'API documentation for the Fastify server',
            version: '1.0.0',
        }
    },
    exposeRoute: true
});

fastify.register(userRoutes, {
    prefix: '/users'
});

fastify.get('/', (req, res) => {
    res.status(200).send({
        status: 'success',
        message: `Server is running on ${host}:${port}...`,
    })
})

// Test connection endpoint
fastify.get('/test-connection', async (request, reply) => {
    try {
      // Simple query to check the connection
      await prisma.$queryRaw`SELECT 1`;
      reply.send({ status: 'success', message: 'Database connection successful' });
    } catch (error) {
      reply.status(500).send({ status: 'error', message: 'Database connection failed', error: error.message });
    }
  });
fastify.listen({ host, port }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})
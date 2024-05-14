import Fastify from 'fastify';
import * as dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';

dotenv.config();

const fastify = Fastify({
    logger: true,
});

fastify.register(userRoutes, {
    prefix: 'users'
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

fastify.get('/', (req, res) => {
    res.status(200).send({
        status: 'success',
        message: `Server is running on ${host}:${port}...`,
    })
})

fastify.listen({ host, port }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})
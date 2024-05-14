
async function userRoutes(fastify, options) {
    // Test route.
    fastify.get('/', async (req, res) => {
        res.status(200).send({
            status: 'success',
            message: 'Welcome from userRouter',
        });
    })

    // >>>>>>>> TO-DO <<<<<<<<<
    // CRUD operations for user
}

export default userRoutes;
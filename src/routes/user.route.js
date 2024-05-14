import UserController from "../controllers/user.controller.js";
const userController = new UserController();

async function userRoutes(fastify, options) {
    // Test route.
    fastify.get('/', async (req, res) => {
        // res.status(200).send({
        //     status: 'success',
        //     message: 'Welcome from userRouter',
        // });
        await createUser('mohamed', '12344');
        res.send('hi');
    })

    // >>>>>>>> TO-DO <<<<<<<<<
    // CRUD operations for user
    // fastify.post('/', async (req, res) => {
    //     await 
    // })
    fastify.post('/', userController.createUser);
}

export default userRoutes;
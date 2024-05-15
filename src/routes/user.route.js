import UserController from "../controllers/user.controller.js";
const userController = new UserController();

async function userRoutes(fastify, options) {
    fastify.get('/', userController.getAllUsers);
    fastify.post('/', userController.createUser);
    fastify.post('/login', userController.login);
    fastify.delete('/', userController.deleteUser);
    fastify.get('/:usernameOrId', userController.getSingleUser);
    fastify.patch('/', userController.updateUser);
}

export default userRoutes;
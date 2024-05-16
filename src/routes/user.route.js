import UserController from "../controllers/user.controller.js";
const userController = new UserController();

async function userRoutes(fastify, options) {
    // Define the security scheme for Bearer authentication
    fastify.addSchema({
        $id: 'http://example.com/schema/security',
        type: 'object',
        properties: {
            security: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        bearerAuth: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }
    });
    fastify.get('/',{
        schema: {
            description: 'Get All Users',
            tags: ['Users'],
            summary: 'Get All Users id & name fields',
        }
    }, userController.getAllUsers);
    fastify.get('/:usernameOrId', {
        schema: {
            description: 'Get Single User',
            tags: ['Users'],
            summary: 'Get Single User by ID or username',
        }
    },userController.getSingleUser);
    fastify.post('/', {
        schema: {
            description: 'Create a new user',
            tags: ['Users'],
            summary: 'Create a new user',
            body: {
                type: 'object',
                required: ['email', 'password', 'name', 'username'],
                properties: {
                    email: {
                        type: 'string',
                        description: 'User email address',
                    },
                    password: {
                        type: 'string',
                        description: 'User password',
                    },
                    name: {
                        type: 'string',
                        description: 'User full name',
                    },
                    username: {
                        type: 'string',
                        description: 'User username',
                    }
                }
            },
        }
    }, userController.createUser);
    fastify.post('/login', {
        schema: {
            description: 'Login user',
            tags: ['Users'],
            summary: 'login user with email & password',
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: {
                        type: 'string',
                        description: 'User email',
                    },
                    password: {
                        type: 'string',
                        description: 'User password',
                    }
                }
            },
        }
    }, userController.login);
    fastify.delete('/', {
        schema: {
            description: 'Delete a user',
            tags: ['Users'],
            summary: 'Delete a user account (must have a token)',
            security: [
                {
                    bearerAuth: []
                }
            ]
        }
    }, userController.deleteUser);
    fastify.patch('/', {
        schema: {
            description: 'Update user fields',
            tags: ['Users'],
            summary: 'Update user fields (must have a token)',
            body: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'User name',
                    },
                    username: {
                        type: 'string',
                        description: 'User username',
                    },
                    password: {
                        type: 'string',
                        description: 'User password',
                    }
                }
            },
            security: [
                {
                    bearerAuth: []
                }
            ]
        }
    }, userController.updateUser);
}

export default userRoutes;
import UserService from "../services/user.service.js";
import asyncHandler from 'express-async-handler';

class UserController {
    constructor() {
        this.userService = new UserService();
    }
    createUser = asyncHandler(async (req, res) => {
        const {
            email,
            password,
            name,
            username,
        } = req.body;
        const user = await this.userService.createUser(email, password, name, username);
        res.status(200).send({
            status: 'success',
            user,
        });  
    });
    login = asyncHandler(async (req, res) => {
        const {
            email,
            password
        } = req.body;
        const token = await this.userService.login(email, password);
        res.status(200).send({
            status: 'success',
            token,
        });
    });
    deleteUser = asyncHandler(async (req, res) => {
        const token = req.headers.authorization;
        await this.userService.deleteUser(token);
        res.status(200).send({
            status: 'success',
            message: 'user deleted successfully',
        });
    });
    getAllUsers = asyncHandler(async (req, res) => {
        const users = await this.userService.getAllUsers();
        res.status(200).send({
            status: 'success',
            users,
        });
    });
    getSingleUser = asyncHandler(async (req, res) => {
        const usernameOrId = req.query.usernameOrId;
        const user = await this.userService.getSingleUser(usernameOrId);
        res.status(200).send({
            status: 'success',
            user,
        });
    });
    updateUser = asyncHandler(async (req, res) => {
        const token = req.headers.authorization;
        const fieldsToUpdate = req.body;
        const updatedUser = await this.userService.updateUser(token, fieldsToUpdate);
        res.status(200).send({
            status: 'success',
            updatedUser,
        })
    })
}

export default UserController;
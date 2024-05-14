import UserService from "../services/user.service.js";
import asyncHandler from 'express-async-handler';

class UserController {
    constructor() {
        this.userService = new UserService();
    }
    createUser = asyncHandler(async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        
        const user = await this.userService.createUser(username, password);
        res.status(200).send({
            status: 'success',
            user,
        });  
    })
}

export default UserController;
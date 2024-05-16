import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const salt = process.env.PASSWORD_SALT;

class UserService {
    constructor() {
        this.prisma = new PrismaClient();  
    }
    createUser = async (email, password, name, username) => {
        try {
            if(!username || !password || !email || !name) {
                const err = new Error();
                err.errorMessage = 'Please provide email, password, name, & username';
                throw err;
            }
            const hashedPassword = await bcrypt.hash(password, salt) 
            let existedUser = await this.prisma.user.findFirst({
                where: {
                    username,
                }
            });
            if(existedUser) {
                const err = new Error();
                err.errorMessage = 'This username already exists. Please choose another one.';
                throw err;
            }
            existedUser = await this.prisma.user.findFirst({
                where: {
                    email,
                }
            });
            if(existedUser) {
                const err = new Error();
                err.errorMessage = 'This email already exists. Please choose another one.'; 
                throw err;
            } 
            const user = await this.prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                    name,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    username: true,                    
                },
            });
            return user;
        } catch (err) {
            if(err.errorMessage) {
                throw new Error(err.errorMessage);
            }
            throw new Error('Something went wrong. Please try again later.');
        }
    }
    login = async (email, password) => {    
        try {
            if(!email || !password) {
                const err = new Error();
                err.errorMessage = 'Please provide your email & password';
                throw err;
            }
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await this.prisma.user.findFirst({
                where: {
                    email,
                    password: hashedPassword,
                }
            });
            if(!user) {
                const err = new Error();
                err.errorMessage = 'Wrong email or password.';
                throw err;
            }
            const jwtSecret = process.env.JWT_SECRET;
            const payloadd = {
                id: user.id,
            }
            const token = jwt.sign(payloadd, jwtSecret)
            return token;
        } catch (err) {
            if(err.errorMessage) {
                throw new Error(err.errorMessage);
            }
            throw new Error('Something went wrong. Please try again later.');
        }
    }
    getAllUsers = async () => {
        try {
            const users = await this.prisma.user.findMany({
                select: {
                    name: true,     // select only "name" filed.
                    id: true,
                }
            });
            return users;
        } catch (err) {
            if(err.errorMessage) {
                throw new Error(err.errorMessage);
            }
            throw new Error('Something went wrong. Please try again later.');
        }
    }
    getSingleUser = async (usernameOrId) => {
        try {
            // Get user based on ID
            let user = await this.prisma.user.findFirst({
                where: {
                    id: usernameOrId,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    username: true,
                }
            });
            if(!user) {
                // Get user based on username
                user = await this.prisma.user.findFirst({
                    where: {
                        username: usernameOrId,
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        username: true,
                    }
                });
            }
            if(!user) {
                const err = new Error();
                err.errorMessage = 'There is no such user. Please signup or double check user';
                throw err;
            }
            return user;
        } catch (err) {
            if(err.errorMessage) {
                throw new Error(err.errorMessage);
            }
            throw new Error('Something went wrong. Please try again later.');
        }
    }
    updateUser = async (token, fieldsToUpdate) => {
        try {
            if(!token) {
                const err = new Error();
                err.errorMessage = 'No token found. Please login to get the token';
                throw err;
            }
            const bearerToken = token.split(' ')[1];
            const jwtSecret = process.env.JWT_SECRET;
            const tokenObj = jwt.verify(bearerToken, jwtSecret);
            const id = tokenObj.id;
            const user = await this.prisma.user.findFirst({
                where: {
                    id,
                }
            });
            if(!user) {
                const err = new Error();
                err.errorMessage = 'There is no such user. Please try again.';
                throw err;
            }
            // Fields to update => {username, name, password}
            const updatedUser = await this.prisma.user.update({
                where: {
                    id,
                },
                data: {
                    name: fieldsToUpdate.name || user.name,
                    username: fieldsToUpdate.username || user.username,
                    password: (fieldsToUpdate.password) ? await bcrypt.hash(toString(fieldsToUpdate.password), salt) : user.password,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    username: true,
                }
            });
            return updatedUser;
        } catch (err) {
            console.log(err);
            if(err.errorMessage) {
                throw new Error(err.errorMessage);
            }
            throw new Error('Something went wrong. Please try again later.');
        }
    }
    deleteUser = async (token) => {
        try {
            if(!token) {
                const err = new Error();
                err.errorMessage = 'No token found. Please login to get the token';
                throw err;
            }
            const bearerToken = token.split(' ')[1];
            const jwtSecret = process.env.JWT_SECRET;
            const tokenObj = await jwt.verify(bearerToken, jwtSecret);
            const id = tokenObj.id;
            const user = await this.prisma.user.findFirst({
                where: {
                    id,
                }
            });
            if(!user) {
                const err = new Error();
                err.errorMessage = "This user doens't exist";
                throw err;
            }
            await this.prisma.user.delete({
                where: {
                    id,
                }
            });
            return;
        } catch (err) {
            if(err.errorMessage) {
                throw new Error(err.errorMessage);
            }
            throw new Error('Something went wrong. Please try again later.');
        }
    }
}

export default UserService;


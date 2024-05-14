import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const salt = process.env.PASSWORD_SALT;

class UserService {
    constructor() {
        this.prisma = new PrismaClient();  
    }
    createUser = async (username, password) => {
        if(!username || !password) {
            throw new Error('Please provide username & password');
        }
        const hashedPassword = await bcrypt.hash(password, salt) 
        try {
            const existedUser = await this.prisma.user.findFirst({
                where: {
                    username,
                }
            });
            if(existedUser) 
                throw new Error('This username already exists. Please choose another one.');
            const user = await this.prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                },
                select: {
                    id: true,
                    username: true,
                },
            });
            return user;
        } catch (err) {
            if(err.message) {
                throw new Error(err.message);
            }
            throw new Error('Something went wrong during creating the user. Please try again later.');
        }
    }
}

export default UserService;


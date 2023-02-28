import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/Login.dto';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class UsersService {

    constructor (private readonly prisma: PrismaService) {}

    async create(data: CreateUserDTO) {

        const id = uuid();

        //Check if user already exists
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (userExists) {
            //throw new Error('User already exists');
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User already exists"})
        }

        //Hashin password
        const hashedPassWord = await bcrypt.hash(data.password, 8) 

        data.password = hashedPassWord

        const user = await this.prisma.user.create({ 
            data: {
                id: id,
                email: data.email,
                password: data.password,
                name: data.name,
                bornDate: new Date(),
                gender: data.gender,
                n_dell: data.n_dell,
                managerId: data.managerId,
                habilities: data.habilities,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        return {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    }

    async Login(data: LoginDTO) {
        //Check if user exists
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!user) {
            throw new UnauthorizedException("Something bad happened", {cause: new Error(), description: "Email or Password doesn't match"})
        }

        //Check if password is correct
        const passwordMatch = await bcrypt.compare(data.password, user.password)

        if (!passwordMatch) {
            throw new UnauthorizedException("Something bad happened", {cause: new Error(), description: "Email or Password doesn't match"})
        }

        let token = jwt.sign({
            email: user.email
        }, process.env.USER_LOGIN_HASH, {
            subject: user.id,
            expiresIn: "30m"
        });
        
        return {
            token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        }
    }

    async getOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                projects: true,
                projectsColeader: true
            }
        });

        if (!user) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User not found"})
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            bornDate: user.bornDate,
            gender: user.gender,
            n_dell: user.n_dell,
            managerId: user.managerId,
            habilities: user.habilities,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            projects: user.projects,
            projectsColeader: user.projectsColeader
        }
    }

    async getAll() {
        return this.prisma.user.findMany();
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/Login.dto';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

function exclude(user, keys) {
    for (let key of keys) {
      delete user[key]
    }
    return user
}

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


        try {
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
                    photoURL: data.photoURL,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });

            return {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        } catch {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: "Problems on creation"})
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

    async Auth(id: string) {
        console.log(id)
        let user = null;
        try {
            const user1 = this.prisma.user.findUnique({
                where: {
                    id: id
                },
            });

            user = exclude(user1, ['password']);
            console.log(user)
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }
        
        if (!user) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User not found"})
        }

        return user
    }

    async update(id: string, data: any) {
        //Verify if user already exists
        const userExists = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!userExists) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User doesn't exists"})
        }

        //Verify if new email already exists
        if (data.email) {
            const emailExists = await this.prisma.user.findUnique({
                where: {
                    email: data.email
                }
            })

            if (emailExists) {
                throw new BadRequestException("Something bad happened", {cause: new Error(), description: "Email already exists"})
            }
        }
        
        data.updatedAt = new Date()

        //Efetua a atualição
        try {
            await this.prisma.user.update({
                data,
                where: {
                    id: id
                }
            })
        } catch {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: "Problems on update"})
        }
        
        return "Atualização efetuada com sucesso"

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
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                bornDate: true,
                n_dell: true,
                gender: true,
                habilities: true,
                managerId: true,
                updatedAt: true,
                createdAt: true,
            }
        });
    }

    async getUserByName(name: string) {
        return this.prisma.user.findMany({
            where: {
                name: name
            },
            select: {
                id: true,
                name: true,
                n_dell: true
            }
        })
    }

    async delete(id: string) {
        //Verify if user already exists
        const userExists = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!userExists) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User doesn't exists"})
        }

        try {
            await this.prisma.user.delete({
                where: {
                    id: id
                }
            })
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }
        
        return "Usuário deletado com sucesso"
    }
}

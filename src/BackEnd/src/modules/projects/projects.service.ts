//this file contains all the functions that are called in the routes in the projects.controller.ts file

/* eslint-disable prettier/prettier */
import { BadRequestException, InternalServerErrorException, UnauthorizedException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProjectDTO } from './dto/Project.dto';
import { v4 as uuid } from 'uuid';
import { Catch } from '@nestjs/common/decorators';
import * as nodemailer from 'nodemailer';
import { smtpConfig } from '../../Common/SMTP/SMTPconfig';
import { html } from 'src/Common/SMTP/HTML/htmlSendForgot';
import { htmlApprove } from 'src/Common/SMTP/HTML/htmlSendApprove';


const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: false,
    auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass
    },
    tls: {
        rejectUnauthorized: false
    }
})

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {}

    async createProject(ownerId: string, data: ProjectDTO){

        let projectExists = await this.prisma.project.findMany({
            where: {
                name: data.name,
            }
        })

        if(projectExists.length > 0) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "Project already exists"})
        }
    
        let project: any;

        //Doing the creation
        try {
            project = await this.prisma.project.create({
                data: {
                    projectId: uuid(),
                    name: data.name,
                    start: new Date(),
                    end: new Date(),
                    tags: data.tags,
                    endSubscription: data.endSubscription,
                    badge: data.badge,
                    roles: data.roles,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    description: data.description,
                    coleaderId: data.coleaderId,
                    ownerId: ownerId,
                    blockedSubscription: true,
                    status: "Pending"
                }
            });
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }

        //Sending Email to Manager authorizing the project
        const person = await this.prisma.user.findUnique({
            where: {
                id: ownerId,
            }
        })

        const managerId = person.managerId;

        const manager = await this.prisma.user.findUnique({
            where: {
                id: managerId,
            }
        })

        const email = manager.email;
        const name = manager.name;

        try {
            const emailSent = await transporter.sendMail({
                from: '"NoReply DELLPROJECTS" <noreply@dellprojects.com>', 
                to: email, // list of receivers
                subject: "Reset Password", // Subject line
                html: htmlApprove(name) // html body
            });

            console.log("Message sent: %s", emailSent.messageId);
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }

        return project;
    }

    async getAllProjects(){
        try {
            const allProjects = await this.prisma.project.findMany({
                include: {
                    applies: true
                }
            });
            return allProjects;
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }
        
    }

    async getProjectById(projectId: string){
        //Verify if the project exists
        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        if(!projectExists) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "Project not found"})
        }

        
        try {
            const project = await this.prisma.project.findUnique({
                where: {
                    projectId,
                }
            })
            return project;
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }
        
    }

    async updateProject(projectId: string, data: any) {
        //Verify if the project exists
        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        if(!projectExists) {
            throw new Error('Project does not exist!')
        }

        data.updateAt = new Date()

        //Doing the update
        try {
            const updateProject = await this.prisma.project.update({
                where: {
                    projectId,
                },
                data: {
                    ...data,
                }
            })
    
            //Returning the updated project
            return updateProject;
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }
        
    }

    async deleteProject(projectId: string){
        //Verify if the project exists
        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        if(!projectExists) {
            throw new Error('Project does not exist!')
        }

        try {
            const deleted = await this.prisma.project.delete({
                where: {
                    projectId,
                }
            })

            return deleted;
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }
    }

    async filterProject(data: any) {
        //Filtering the projects
        try {
           const project = await this.prisma.project.findMany({
                where: data,
            })

            return project; 
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }
        
    }

    async approveProject(projectId: string, id) {

        //Getting the project
        const project = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        //Verifying if the project exists
        if(!project) {
            throw new Error('Project does not exist!')
        }

        //Verifying if the project is already approved
        if(project.status) {
            throw new Error('Project already approved!')
        }

        //verifying if the owner manager's of the project is the same that is approving the project
        const owner = await this.prisma.user.findUnique({
            where: {
                id: project.ownerId,
            }
        })

        if(owner.managerId !== id) {
            throw new UnauthorizedException("Something bad happened", {cause: new Error(), description: "You can't approve this project"});
        }

        //Updating the project
        try {
            const project = await this.prisma.project.update({
                where: {
                    projectId,
                },
                data: {
                    status: "Approved",
                }
            })

            return project;
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }

        
    }

    async cancelProject(projectId: string, id: string) {
        //Getting the project
        const project = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        //Verifying if the project exists
        if(!project) {
            throw new Error('Project does not exist!')
        }

        //Verifying if is the owner that is canceling the project
        if(project.ownerId !== id) {
            throw new UnauthorizedException("Something bad happened", {cause: new Error(), description: "You can't cancel this project"});
        }

        //Updating the project
        try {
            const project = await this.prisma.project.update({
                where: {
                    projectId,
                },
                data: {
                    blockedSubscription: true,
                }
            })
            return project;
        } catch (err) {
            throw new InternalServerErrorException("Something bad happened", {cause: new Error(), description: err})
        }
    }
}

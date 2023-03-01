//this file contains all the functions that are called in the routes in the projects.controller.ts file

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProjectDTO } from './dto/Project.dto';
import { v4 as uuid } from 'uuid';


@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {}

    async createProject(data: ProjectDTO){
        const projectExists = await this.prisma.project.findFirst({
            where: {
                projectId: data.projectId
            }
        })

        if(projectExists) {
            throw new Error('Project already exists');
        }

        const project = await this.prisma.project.create({
            data: {
                projectId: uuid(),
                name: data.name,
                start: new Date(),
                end: new Date(),
                tasks: data.tasks,
                createdAt: new Date(),
                updatedAt: new Date(),
                description: data.description,
                coleaderId: data.coleaderId,
                ownerId: data.ownerId,
                blockedSubscription: data.blockedSubscription,
                projectType: data.projectType,
            }
        });
    
        return project;
    }

    async getAllProjects(){
        const allProjects = await this.prisma.project.findMany({});
        return allProjects;
    }

    async getProjectById(projectId: string){
        const project = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })
        return project;
    }

    async updateProject(projectId: string, data: ProjectDTO) {
        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        if(!projectExists) {
            throw new Error('Project does not exist!')
        }

        const updateProject = await this.prisma.project.update({
            where: {
                projectId,
            },
            data: {
                ...data,
            }
        })
        return updateProject;
    }

    async deleteProject(projectId: string){

        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        if(!projectExists) {
            throw new Error('Project does not exist!')
        }

        return await this.prisma.project.delete({
            where: {
                projectId,
            }
        })
    }
}

//this file contains all the routes for the project module and the requests that are made to the database

/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Delete, Get, Put } from '@nestjs/common';
import { ProjectDTO } from './dto/Project.dto';
import { ProjectsService } from './projects.service';

@Controller('Project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() data: ProjectDTO) {
    console.log(data.blockedSubscription);
    return this.projectsService.createProject(data);
  }

  @Get()
  async findAll() {
    return this.projectsService.getAllProjects()
  }

  @Get(":projectId")
  async findOne(@Param("projectId") projectId: string){
    return this.projectsService.getProjectById(projectId);
  }


  @Put(":projectId")
  async update(@Param("projectId") projectId: string, @Body() data: ProjectDTO) {
    return this.projectsService.updateProject(projectId, data);
  }

  @Delete(":projectId")
  async delete(@Param("projectId") projectId: string) {
    return this.projectsService.deleteProject(projectId);
  }

  @Get("/filter")
  async filterProjectByParam(@Body() data: any) {
    return this.projectsService.filterProject(data);
  }
}


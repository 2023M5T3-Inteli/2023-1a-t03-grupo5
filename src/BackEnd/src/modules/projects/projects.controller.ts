/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Delete, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ProjectDTO } from './dto/Project.dto';
import { ProjectsService } from './projects.service';
import { ApiTags, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('Project')
@Controller('Project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  //api header
  @ApiHeader({
    name: 'createProject',
    description: 'create a new project',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post("/create")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 409, description: 'Error: Conflict'})
  @ApiResponse({ status: 400, description: 'Error: Bad Request'})
  @ApiResponse({ status: 422, description: 'Error: Unprocessable Entity'})
  @ApiResponse({ status: 401, description: 'Error: Unauthorized'})
  async create(@Req() req, @Body() data: ProjectDTO) {
    return this.projectsService.createProject(req.user.id, data);
  }

  //api header
  @ApiHeader({
    name: 'findAll',
    description: 'search for all projects',
  })
  @Get("/findAll")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  @ApiResponse({ status: 400, description: 'Error: Bad Request'})
  async findAll() {
    return this.projectsService.getAllProjects()
  }


  @Get("/findByID/:projectId")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  @ApiResponse({ status: 400, description: 'Error: Bad Request'})
  async findOne(@Param("projectId") projectId: string){
    return this.projectsService.getProjectById(projectId);
  }


  @Put("/update/:projectId")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  @ApiResponse({ status: 400, description: 'Error: Bad Request'})
  async update(@Param("projectId") projectId: string, @Body() data: any) {
    return this.projectsService.updateProject(projectId, data);
  }


  @Delete("/delete/:projectId")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  async delete(@Param("projectId") projectId: string) {
    return this.projectsService.deleteProject(projectId);
  }

  //api header
  @ApiHeader({
    name: 'filter',
    description: 'filter projects',
  })
  
  @Get("/filter")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 400, description: 'Error: Bad Request'})
  async filter(@Body() data: any) {
    return this.projectsService.filterProject(data);
  }

  @Put("/approve/:token")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 403, description: 'Error: Forbidden'})
  async approve(@Param("token") token: string, @Body() data: any) {
    if(data.status != "approved" || data.status != "rejected") {
      return {error: "Invalid status"};
    }
    return this.projectsService.approveProject(token, data.status);
  }

  @Put("/cancel/:projectId")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  @ApiResponse({ status: 403, description: 'Error: Forbidden'})
  async cancel(@Req() req: any, @Param("projectId") projectId: string) {
    return this.projectsService.cancelProject(projectId, req.user.id);
  }

  @Put("/Blocked/:projectId")
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  @ApiResponse({ status: 403, description: 'Error: Forbidden'})
  async blocking(@Param("projectId") projectId: string, @Body() data: any) {
    if (typeof(data.status) != "boolean") {
      return {error: "Invalid status"};
    }
    return this.projectsService.receivingSubscription(projectId, data.status);
  }
}


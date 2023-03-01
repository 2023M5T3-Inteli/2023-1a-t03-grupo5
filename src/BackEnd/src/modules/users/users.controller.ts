import { Body, Controller, Post, Get, Param, Req, Delete, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { LoginDTO } from './dto/Login.dto';
import { Request, Response, NextFunction } from 'express';

@Controller('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/Create")
  async create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }

  @Post("/Login")
  async login(@Body() data: LoginDTO) {
    return this.usersService.Login(data);
  }

  @Put("/Update/:id")
  async update(@Param("id") id: string, @Body() data: any) {
    if(!id) {
      throw new BadRequestException("Something bad happened", {cause: new Error(), description: "ID must be included"})
    }
    
    if (typeof id == "string") {
      return this.usersService.update(id, data)
    } else {
      throw new BadRequestException("Something bad happened", {cause: new Error(), description: "ID must be a string"})
    }
  }

  @Get("/Info/:id")
  async getOne(@Param("id") id: string) {
    if (typeof id === "string") {
      return this.usersService.getOne(id);
    } else {
      throw new BadRequestException("Something bad happened", {cause: new Error(), description: "ID must be a string"});
    }
  }

  @Get("/getAll")
  async getAll() {
    return this.usersService.getAll();
  }

  @Get("/Auth")
  async Auth(@Req() req: Request) {
    return this.usersService.Auth(req.id);
  }

  @Get("/getByName/:name")
  async getByName(@Param("name") name: string) {
    if(typeof name === "string") {
      return this.usersService.getUserByName(name);
    } else {
      throw new BadRequestException("Something Bad Happened", {cause: new Error(), description: "Name must be a String"})
    }
  }

  @Delete("/Delete/:id")
  async delete(@Param("id") id: string) {
    if(typeof id === "string") {
      return this.usersService.delete(id);
    } else {
      throw new BadRequestException("Something Bad Happened", {cause: new Error(), description: "ID must be a String"})
    }
  }
}

import { Body, Controller, Post, Get, Param, Req, Delete, Put, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { LoginDTO } from './dto/Login.dto';
import { Request, Response, NextFunction } from 'express';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/Create")
  async create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }

  // @Post("/Login")
  // async login(@Body() data: LoginDTO) {
  //   return this.usersService.Login(data);
  // }

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
  async Auth() {
    return "Authenticated"
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

  @Get("/sendForgotEmail/:email")
  async sendForgotEmail(@Param("email") email: string) {
    if(typeof email === "string") {
      return this.usersService.sendForgotPasswordEmail(email);
    } else {
      throw new BadRequestException("Something Bad Happened", {cause: new Error(), description: "Email must be a String"})
    }
  }

  @Post("/resetForgotPassword")
  async resetPassword(@Body() data: ResetPasswordDTO) {
    return this.usersService.resetPassword(data);
  }
}

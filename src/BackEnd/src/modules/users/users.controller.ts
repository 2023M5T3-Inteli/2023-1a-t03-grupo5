import { Body, Controller, Post, Get, Param, Req, Delete, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { LoginDTO } from './dto/Login.dto';
import { Request, Response, NextFunction } from 'express';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
import { ApiTags, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('User')
@Controller('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //api header
  @ApiHeader({
    name: 'createUser',
    description: 'Create a new user',
  })
  @Post("/Create")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 409, description: 'Error: Conflict'})
  @ApiResponse({ status: 400, description: 'Error: Bad Request'})
  @ApiResponse({ status: 422, description: 'Error: Unprocessable Entity'})
  async create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }

  //api header
  @ApiHeader({
    name: 'login',
    description: 'Log in to the website',
  })
  @Post("/Login")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 401, description: 'Error: Unauthorized'})
  async login(@Body() data: LoginDTO) {
    return this.usersService.Login(data);
  }


  @Put("/Update/:id")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  @ApiResponse({ status: 409, description: 'Error: Conflict'})
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
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  async getOne(@Param("id") id: string) {
    if (typeof id === "string") {
      return this.usersService.getOne(id);
    } else {
      throw new BadRequestException("Something bad happened", {cause: new Error(), description: "ID must be a string"});
    }
  }

  //api header
  @ApiHeader({
    name: 'getAll',
    description: 'Get all users',
  })
  @Get("/getAll")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  async getAll() {
    return this.usersService.getAll();
  }

  //api header
  @ApiHeader({
    name: 'Auth',
    description: 'User authentication',
  })
  @Get("/Auth")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 401, description: 'Error: Unauthorized'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})

  async Auth(@Req() req: Request) {
    return this.usersService.Auth(req.id);
  }


  @Get("/getByName/:name")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  async getByName(@Param("name") name: string) {
    if(typeof name === "string") {
      return this.usersService.getUserByName(name);
    } else {
      throw new BadRequestException("Something Bad Happened", {cause: new Error(), description: "Name must be a String"})
    }
  }


  @Delete("/Delete/:id")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 404, description: 'Error: Not Found'})
  async delete(@Param("id") id: string) {
    if(typeof id === "string") {
      return this.usersService.delete(id);
    } else {
      throw new BadRequestException("Something Bad Happened", {cause: new Error(), description: "ID must be a String"})
    }
  }


  @Get("/sendForgotEmail/:email")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  async sendForgotEmail(@Param("email") email: string) {
    if(typeof email === "string") {
      return this.usersService.sendForgotPasswordEmail(email);
    } else {
      throw new BadRequestException("Something Bad Happened", {cause: new Error(), description: "Email must be a String"})
    }
  }

  //api header
  @ApiHeader({
    name: 'resetForgotPassword',
    description: 'Create new password',
  })
  @Post("/resetForgotPassword")
  //possible error responses
  @ApiResponse({ status: 500, description: 'Error: Internal Server Error'})
  @ApiResponse({ status: 401, description: 'Error: Unauthorized'})
  async resetPassword(@Body() data: ResetPasswordDTO) {
    return this.usersService.resetPassword(data);
  }
}

import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { LoginDTO } from './dto/Login.dto';

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

  @Get("/Info/:id")
  async getOne(@Param("id") id: string) {
    if (typeof id === "string") {
      return this.usersService.getOne(id);
    } else {
      throw new BadRequestException("Something bad happened", {cause: new Error(), description: "ID must be a string"});
    }
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Unit test for the "get all users" endpoint function
  it('Should return all users', () => {
    expect(service.getUsers()).toEqual([
      { id: 1, name: 'test', email: 'test@test', password: 'test1234' },
      { id: 2, name: 'test', email: 'test2@test', password: 'test1234' }
    ])  
  });

  // Unit test for the "get a specific user by id" endpoint function
  it('Should return a user', () => {
    expect(service.getUser("id")).toEqual([
      { id: 1, name: 'test', email: 'test@test', password: 'test1234' }
    ])
  });

  // Unit test for the "create user" endpoint function
  it('Should create a user', () => {
    expect(service.createUser("name", "email", "password")).toEqual([
      { id: 3, name: 'name', email: 'email', password: 'password' }
    ])
  });

  // Unit test for the "update user" endpoint function 
  it('Should update a user', () => {
    expect(service.updateUser("id", "name", "email", "password")).toEqual([
      { id: 1, name: 'testing', email: 'email@test', password: 'password' }
    ])
  });

  // Unit test for the user login endpoint function
  it('Should login a user', () => {
    expect(service.login("email", "password")).toEqual(
      "User logged in"
    )
  });

  // Unit test for the user authentication endpoint function
  it('Should autenticate a user', () => {
    expect(service.authenticate("email", "password")).toEqual(
      "User authenticated"
    )
  });
});

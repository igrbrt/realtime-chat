import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('findById/:id')
  get(@Param() params) {
    return this.userService.findById(params.id);
  }

  @Post('create')
  create(@Body() user: User) {
    try {
      return this.userService.create(user);
    } catch (error) {
      return error;
    }
  }

  @Put('update')
  update(@Body() user: User) {
    try {
      return this.userService.update(user);
    } catch (error) {
      return error;
    }
  }

  @Delete('delete/:id')
  remove(@Param() params) {
    try {
      return this.userService.remove(params.id);
    } catch (error) {
      return error;
    }
  }
}

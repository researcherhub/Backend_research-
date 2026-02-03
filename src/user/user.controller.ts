import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Req,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
) {}

@UseGuards(JwtAuthGuard)
  @Post()
  async createUser(
    @Body() body: { createUserDto: CreateUserDto },
  ) {
    const user = await this.usersService.create(body.createUserDto);

    return {
      message: 'User created successfully',
      user
  }
};

}
   

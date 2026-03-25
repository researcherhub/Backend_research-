import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { CreateUserBodyDto } from './dto/create.user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create user', description: 'Create a new user.' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async createUser(@Body() body: CreateUserBodyDto) {
    const user = await this.usersService.create(body.createUserDto);

    return {
      message: 'User created successfully',
      user,
    };
  };

  @Get('/me')
  @ApiOperation({ summary: 'Get current user', description: 'Get the currently authenticated user.' })
  @ApiResponse({ status: 200, description: 'Current user retrieved successfully' })
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(  @Param('userId') userId: string ) {
    const user = await this.usersService.findById(userId); 

    return {
      message: 'Current user retrieved successfully',
      user,
    };
}
}
   

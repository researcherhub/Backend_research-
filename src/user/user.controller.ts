import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { CreateUserBodyDto } from './dto/create.user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Create a new user.' })
  @ApiBody({ type: CreateUserBodyDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async createUser(@Body() body: CreateUserBodyDto) {
    const user = await this.usersService.create(body.createUserDto);

    return {
      message: 'User created successfully',
      user,
    };
  }
}
   

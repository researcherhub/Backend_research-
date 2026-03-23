import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { CreateUserBodyDto } from './dto/create.user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user', description: 'Create a new user. Requires JWT authentication.' })
  @ApiBody({ type: CreateUserBodyDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - valid JWT required' })
  async createUser(@Body() body: CreateUserBodyDto) {
    const user = await this.usersService.create(body.createUserDto);

    return {
      message: 'User created successfully',
      user,
    };
  }
}
   

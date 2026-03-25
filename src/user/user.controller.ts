import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './user.service';
import { CreateUserBodyDto } from './dto/create.user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

type JwtRequest = Request & { user: { userId: string } };

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Sign up',
    description: 'Create a new user. No authentication required.',
  })
  @ApiBody({ type: CreateUserBodyDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async createUser(@Body() body: CreateUserBodyDto) {
    const user = await this.usersService.create(body.createUserDto);

    return {
      message: 'User created successfully',
      user,
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current user',
    description: 'Requires a valid JWT (Bearer header or accessToken cookie).',
  })
  @ApiResponse({ status: 200, description: 'Current user retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCurrentUser(@Req() req: JwtRequest) {
    const user = await this.usersService.findById(req.user.userId);

    return {
      message: 'Current user retrieved successfully',
      user,
    };
  }
}
   

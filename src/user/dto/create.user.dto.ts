import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password (min 8 characters)', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;
}

/** Wrapper for create user request body */
export class CreateUserBodyDto {
  @ApiProperty({ type: CreateUserDto, description: 'User data to create' })
  createUserDto: CreateUserDto;
}

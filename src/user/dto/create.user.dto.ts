import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Tommy Adeoye', description: 'User full name' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'Computer Science', description: 'User field of study' })
  @IsString()
  @IsNotEmpty()
  fieldOfStudy: string;

  @ApiProperty({ example: 'I am a passionate researcher in AI.', description: 'User bio' })
  @IsString()
  @IsNotEmpty()
  bio: string;

  @ApiProperty({ example: 'U I', description: 'University Of Ibad' })
  @IsString()
  @IsNotEmpty()
  institution: string;

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

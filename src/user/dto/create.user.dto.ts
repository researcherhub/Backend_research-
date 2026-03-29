import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'Tommy Adebakin', description: 'User full name' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'tommy.adebakin@example.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '********', description: 'User password' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class ResearchStepDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  areaOfInterest: string[];

  @IsString()
  @IsNotEmpty()
  briefResearchFocus: string;
}


export class AcademicStepDto {
  @IsString()
  @IsNotEmpty()
  fieldOfStudy: string;

  @IsString()
  @IsNotEmpty()
  institution: string;

  @IsString()
  @IsNotEmpty()
  bio: string;
}

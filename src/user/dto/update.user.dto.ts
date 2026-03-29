import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export class OnboardingDto {
  @ApiProperty({ example: 'Computer Science', description: 'User field of study' })
  @IsString()
  fieldOfStudy?: string;

  @ApiProperty({ example: 'I am a passionate researcher in AI.', description: 'User bio' })
  @IsString()
  bio?: string;

  @ApiProperty({ example: ['Machine Learning', 'Data Science'], description: 'User areas of interest' })
  @IsArray()
  @IsString({ each: true })
  areaOfInterest?: string[];

  @ApiProperty({ example: 'My research focuses on developing novel algorithms for natural language processing.', description: 'User brief research focus' })
  @IsString()
  briefResearchFocus?: string;

  @ApiProperty({ example: 2023, description: 'User year of graduation' }) 
  @IsNumber()
  yearOfGraduation?: number;
  
  @ApiProperty({ example: 'University of Ibadan', description: 'User institution' })
  @IsString()
  institution?: string;
}
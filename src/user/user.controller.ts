import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AcademicStepDto, ResearchStepDto, SignupDto } from "./dto/create.user.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./user.service";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Step 1: Signup user',
    description: 'Creates a new user and returns onboarding step = 1',
  })
  @ApiBody({
    type: SignupDto,
    examples: {
      example1: {
        value: {
          fullName: 'Tommy Adebayo',
          email: 'tommy@example.com',
          password: 'password123',
        },
      },
    },
  })
  async signup(@Body() dto: SignupDto) {
    const user = await this.usersService.signup(dto);

    return {
      success: true,
      message: 'User created successfully',
      data: {
        userId: user._id,
        onboardingStep: user.onboardingStep,
      },
    };
  }

  @Put('onboarding/research/:userId')
  @ApiOperation({
    summary: 'Step 2: Submit research info',
    description: 'User submits area of interest and research focus',
  })
  @ApiBody({
    type: ResearchStepDto,
    examples: {
      example1: {
        value: {
          areaOfInterest: ['AI', 'Blockchain'],
          briefResearchFocus: 'AI in decentralized finance',
        },
      },
    },
  })
  async updateResearch(
    @Param('userId') userId: string, 
    @Body() dto: ResearchStepDto,
  ) {
    const user = await this.usersService.updateResearchStep(userId, dto);

    return {
      success: true,
      message: 'Research step completed',
      data: {
        onboardingStep: user.onboardingStep,
      },
    };
  }

  @Put('onboarding/academic/:userId')
  @ApiOperation({
    summary: 'Step 3: Submit academic & bio info',
    description: 'Final step of onboarding',
  })
  @ApiBody({
    type: AcademicStepDto,
    examples: {
      example1: {
        value: {
          fieldOfStudy: 'Computer Science',
          institution: 'University of Ibadan',
          bio: 'AI enthusiast and backend developer',
        },
      },
    },
  })
  async updateAcademic(
    @Param('userId') userId: string, 
    @Body() dto: AcademicStepDto,
  ) {
    const user = await this.usersService.updateAcademicStep(userId, dto);

    return {
      success: true,
      message: 'Onboarding completed',
      data: {
        onboardingCompleted: user.onboardingCompleted,
      },
    };
  }

  @Get(':userId')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Returns user info and onboarding progress',
  })
  async getUserById(@Param('userId') userId: string) {
    const user = await this.usersService.findById(userId);

    return {
      success: true,
      message: 'User retrieved successfully',
      user,
    };
  }
}
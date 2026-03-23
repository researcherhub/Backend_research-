import {
  Controller,
  Post,
  Body,
  Res,
  Req,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create.auth.dto';
import { Client } from 'src/common/decorator/client.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description:
      'Authenticate with email and password. Mobile clients receive JSON tokens. Web clients receive httpOnly cookies.',
  })
  @ApiBody({ type: LoginDto })
  @ApiHeader({
    name: 'X-Client',
    description: 'Client type: "mobile" for tokens, "web" for cookies',
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Login successful (mobile: tokens in body; web: cookies + message)' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() dto: LoginDto,
    @Client() client: string,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.login(dto.email, dto.password);

    if (client === 'mobile') {
      return res.json({
        ...tokens,
        expiresIn: 900,
      });
    }

    // WEB (cookies)
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: 'Logged in' });
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh tokens',
    description:
      'Exchange a refresh token for new access and refresh tokens. Token can be sent via cookie (refreshToken) or Authorization header.',
  })
  @ApiResponse({ status: 200, description: 'New tokens issued (cookies set for web)' })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const token =
      req.cookies?.refreshToken ||
      req.headers.authorization?.split(' ')[1];

    const tokens = await this.authService.refresh(token);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json(tokens);
  }
}

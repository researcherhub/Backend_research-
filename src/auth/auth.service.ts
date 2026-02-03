import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(
      { sub: user._id },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user._id },
      { expiresIn: '7d' },
    );

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateRefreshToken(user._id, refreshTokenHash);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);

    const user = await this.usersService.findById(payload.sub);
    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException();
    }

    const isValid = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );

    if (!isValid) throw new UnauthorizedException();

    // Rotate refresh token
    const newRefreshToken = this.jwtService.sign(
      { sub: user._id },
      { expiresIn: '7d' },
    );

    const newHash = await bcrypt.hash(newRefreshToken, 10);
    await this.usersService.updateRefreshToken(user._id, newHash);

    const newAccessToken = this.jwtService.sign(
      { sub: user._id },
      { expiresIn: '15m' },
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(userId: string) {
    await this.usersService.clearRefreshToken(userId);
  }
}

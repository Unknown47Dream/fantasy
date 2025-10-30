import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ||
        'your-secret-key-change-this',
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const admin = await this.authService.getAdminById(payload.sub);
      if (!admin || !admin.isActive) {
        throw new UnauthorizedException('Admin not found or inactive');
      }
      return admin;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

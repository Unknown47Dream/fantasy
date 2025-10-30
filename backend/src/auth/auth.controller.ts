import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, AdminRole, RefreshTokenDto } from './dto';
import { JwtAuthGuard, RolesGuard } from './guards';
import { CurrentAdmin, Roles } from './decorators';
import type { AdminUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.SUPER_ADMIN)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.logout(refreshTokenDto.refreshToken);
  }

  @Post('revoke-all')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async revokeAll(@CurrentAdmin() admin: AdminUser) {
    return this.authService.revokeAllRefreshTokens(admin.id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentAdmin() admin: AdminUser): AdminUser {
    return admin;
  }

  @Get('test-protected')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  testProtected(@CurrentAdmin() admin: AdminUser) {
    return {
      message: 'This is a protected route',
      admin,
    };
  }
}

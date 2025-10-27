import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { validate, parse, InitData, User } from '@telegram-apps/init-data-node';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: User }>();
    const authHeader = request.headers.authorization;
    if (
      !authHeader ||
      typeof authHeader !== 'string' ||
      !authHeader.startsWith('tma ')
    ) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }
    const initDataRaw = authHeader.slice(4);
    const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (!botToken) {
      throw new UnauthorizedException('Bot token not configured');
    }
    try {
      // Validate with 1-hour expiration to prevent replays
      validate(initDataRaw, botToken, { expiresIn: 3600 });
      const initData: InitData = parse(initDataRaw);
      request.user = initData.user; // Attach user to request (e.g., { id: 123, first_name: 'John' })
      return true;
    } catch {
      throw new UnauthorizedException('Invalid initData');
    }
  }
}

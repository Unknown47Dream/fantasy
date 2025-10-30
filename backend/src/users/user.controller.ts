import {
  Controller,
  Get,
  UseGuards,
  Request,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User as TelegramUser } from '@telegram-apps/init-data-node';
import { UsersService } from './users.service';
import { TelegramAuthGuard } from '../common/guards/telegram-auth.guard';
import { User } from 'generated/prisma/client';
import { generateReferralCode } from '../common/utils/referral';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(TelegramAuthGuard)
  async getUser(
    @Request() req: Request & { user?: TelegramUser },
  ): Promise<User> {
    const telegramUser = req.user;
    if (!telegramUser || !telegramUser.id) {
      throw new UnauthorizedException('User data not found in init data');
    }
    try {
      let user = await this.userService.getUser({
        telegramId: telegramUser.id.toString(),
      });
      if (!user) {
        let referralCode = '';
        let isCodeUnique = false;
        const maxRetries = 10;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
          referralCode = generateReferralCode();
          const existingUserWithCode = await this.userService.getUser({
            referralCode,
          });
          if (!existingUserWithCode) {
            isCodeUnique = true;
            break;
          }
        }
        if (!isCodeUnique) {
          throw new InternalServerErrorException(
            'Unable to generate unique referral code',
          );
        }
        user = await this.userService.createUser({
          telegramId: telegramUser.id.toString(),
          username: telegramUser.username,
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name,
          photoUrl: telegramUser.photo_url,
          languageCode: telegramUser.language_code,
          isPremium: telegramUser.is_premium || false,
          referralCode,
        });
      }
      return user;
    } catch (error) {
      console.error('Error fetching or creating user:', error);
      throw new InternalServerErrorException('Failed to fetch or create user');
    }
  }
}

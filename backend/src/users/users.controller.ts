import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  ) {
    return this.userService.getUsers({ page, take });
  }
}

import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
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

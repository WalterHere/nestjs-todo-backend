import { Controller, UseGuards, Get, Patch } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  updateUser() {}
}

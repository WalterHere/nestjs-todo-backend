import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDTO) {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: { email: dto.email, hash },
    });

    delete user.hash;

    return user;
  }

  signin() {}
}

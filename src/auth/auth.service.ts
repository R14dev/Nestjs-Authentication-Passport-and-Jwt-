import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const mathPassword = await compare(password, user.password);
    if (!mathPassword) {
      throw new UnauthorizedException();
    }
    const { password: has, ...result } = user;
    return result;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }

  /**
   * Create user account!
   * @param data User input date
   * @returns Promise new User Object
   */
  async singup(data: Auth) {
    const findUserName = await this.userService.findOne(data.username);
    // check username already exists
    if (!findUserName) {
      const user: Prisma.UserCreateInput = {
        username: data.username,
        password: data.password,
      };
      // add send mail to queue
      return this.userService.create(user);
    }
  }
}

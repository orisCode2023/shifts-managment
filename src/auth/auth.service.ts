import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = this.usersService.findOneByUsername(username);
    console.log('BODY USERNAME:', username);
    console.log('BODY PASSWORD:', password);
    console.log('DB USER:', user);
    console.log('DB PASSWORD:', user?.password);
    if (user && user.password === password) {
      const payload = { username: user.name, sub: user.id };
      return {
        access_token: await this.jwtService.sign(payload),
      };
    }
    throw new Error('Invalid credentials');
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }
  async signIn(
    name: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = this.usersService.findOneByUsername(name);
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { username: user.name, sub: user.id };
      return {
        access_token: await this.jwtService.sign(payload),
      };
    }
    throw new Error('Invalid credentials');
  }
  async signUp(user: { name: string; email: string; password: string; role: string }) {

    const existingUser = this.usersService.findOneByUsername(user.name);
    if (existingUser) {
      throw new Error('User already exists');
    } else {
      return await this.usersService.createUser(user);
    }
  }
}

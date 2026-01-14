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
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = this.usersService.findOneByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { username: user.name, sub: user.id };
      return {
        access_token: await this.jwtService.sign(payload),
      };
    }
    throw new Error('Invalid credentials');
  }
  async signUp(
    name: string,
    email: string,
    password: string,
    role: string,
  ) {
    const user = await this.usersService.createUser({ name, email, password, role });
    return { user };
  }
}

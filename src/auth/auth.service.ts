import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common'; // For proper HTTP error handling
import { UserService } from '../user/user.service'; // Assuming you have a UserService to validate users

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService, // Injecting the user service to validate the user
  ) {}

  async login(name: string, password: string) {
    const user = await this.userService.findByUsername(name);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { name, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
  
}

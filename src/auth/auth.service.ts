import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    // Validate user (mock validation for now)
    const isValidUser = username === 'admin' && password === 'password';

    if (!isValidUser) {
      throw new Error('Invalid credentials');
    }

    const payload = { username, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

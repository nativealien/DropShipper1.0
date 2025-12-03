import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-dev-secret', // same as in JwtModule
    });
  }

  async validate(payload: any) {
    // Whatever you return here becomes req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}

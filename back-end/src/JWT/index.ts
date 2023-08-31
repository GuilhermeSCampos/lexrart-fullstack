import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { TUser } from '../schemas/user.schema';
import AuthModel from '../api/auth/auth.model';

export default class JWT {
  private secret: string;

  constructor(private authModel: AuthModel = new AuthModel()) {
    this.secret = process.env.JWT_SECRET as string;

    if (!this.secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
  }

  public create(data: Partial<TUser>, expiresIn: string = '7d'): string {
    try {
      return jwt.sign(data, this.secret, { expiresIn });
    } catch (error) {
      throw new Error('Create Token Failed');
    }
  }

  public async validate(token: string) {
    try {
      if (token.startsWith('Bearer ')) token = token.slice(7);

      const blackListedToken = await this.authModel.findBlacklistedToken(token);
      if (blackListedToken) throw new Error( 'Token expirado!');

      const data = this.verify(token);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Validate Token Failed');
    }
  }

  public verify(token: string) {
    try {
      return jwt.verify(token, this.secret) as Partial<TUser>;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token has expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      }
      throw new Error('Verify Token Failed');
    }
  }
}

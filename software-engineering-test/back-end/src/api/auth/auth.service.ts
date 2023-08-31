import { TUser } from "@/schemas/user.schema";
import AuthModel from "./auth.model";
import { compare } from 'bcryptjs';
import JWT from "@/JWT";

export default class AuthService {
  constructor(
    private authModel: AuthModel = new AuthModel(),
    private jwt: JWT = new JWT()
    ){}

    public async login(user: TUser): Promise<{user_name: string, token: string}> {
    const userExists = await this.authModel.findByUserCriteria({ user_name: user.user_name });
    if (!userExists) throw new Error( 'Wrong user name or password');

    const validPassword = await compare(user.password, userExists.password);
   
    if (!validPassword)
      throw new Error('Wrong user name or password');

    return {
      user_name: userExists.user_name,
      token: this.jwt.create({
        user_name: userExists.user_name,
      })
    };
  }

  public async logout(token: string): Promise<void> {
    return await this.authModel.blacklistToken(token);
  }

  public async createUser(data: TUser) {
    return await this.authModel.create(data);
  }
}
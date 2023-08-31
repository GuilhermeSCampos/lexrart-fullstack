import { User } from "@/database/entity/User";
import { BlacklistRepository } from "@/database/repository/black-list-repository";
import { UserRepository } from "@/database/repository/user-repository";
import { TUser } from "@/schemas/user.schema";

const bcrypt = require('bcryptjs');

export default class AuthModel {

  public async create(data: TUser) {
    const userExists = await UserRepository.findOneBy({ user_name: data.user_name });
    if (userExists) throw new Error('User with this user name exists');
    const saltRounds = 14;
    const password = await bcrypt.hash(data.password, saltRounds);

    const user = {
      user_name: data.user_name,
      password,

    };

    const newUser = UserRepository.create(user);

    await UserRepository.save(newUser);

  }

  public async findByUserCriteria(criteria: Partial<User>) {
    const user = await UserRepository.findOneBy(criteria);
    if (!user) throw new Error(`User not found using provided ${Object.keys(criteria)[0]}`)

    return user;
  }

  public async findBlacklistedToken(token: string) {
    const blackListedToken = await BlacklistRepository.findOneBy({ token });

    return blackListedToken;
  }

  public async blacklistToken(token: string) {
    const tokenToBlackList = BlacklistRepository.create({token});

    await BlacklistRepository.save(tokenToBlackList);
  }
}

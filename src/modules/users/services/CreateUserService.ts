import UsersRepository from "../../../shared/infra/database/mongoose/repositories/implementations/UsersRepository";

export interface ICreateUser {
  name: string;
  username: string;
}

export default class CreateUserService {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = new UsersRepository();
  }

  public async execute({ name, username }: ICreateUser): Promise<any> {
    const userToFind = await this.usersRepository.findOneAndUpdateUser({
      username,
      name,
    });

    return userToFind;
  }
}

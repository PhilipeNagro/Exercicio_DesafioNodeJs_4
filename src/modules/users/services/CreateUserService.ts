import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";

export interface ICreateUser {
  name: string;
  username: string;
}

export default class CreateUserService {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = new UsersRepository();
  }

  public async execute({ name, username }: ICreateUser): Promise<any> {
    const verifyUserExists = await this.usersRepository.findClient(username);

    if (verifyUserExists) {
      throw new AppError("Usuário já existe");
    }

    const userToFind = await this.usersRepository.createClient({
      username,
      name,
    });

    return userToFind;
  }
}

import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import { IUserInterface } from "@shared/infra/database/mongoose/schemas/User";

export interface ICreateUser {
  name: string;
  username: string;
}

export default class CreateUserService {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = new UsersRepository();
  }

  public async execute({
    name,
    username,
  }: ICreateUser): Promise<IUserInterface> {
    const verifyUserExists = await this.usersRepository.findClient(username);
    console.log(verifyUserExists);

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

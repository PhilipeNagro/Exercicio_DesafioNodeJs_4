import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import { IUserInterface } from "@shared/infra/database/mongoose/schemas/User";

interface IRequestDTO {
  username: string;
  deadline: string;
  title: string;
}

export default class CreateTodoService {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = new UsersRepository();
  }

  public async execute({
    deadline,
    title,
    username,
  }: IRequestDTO): Promise<IUserInterface | null> {
    // const usuario = users.find((user) => user.username === username);

    const usuario = await this.usersRepository.findClient(username);

    if (!usuario) {
      throw new AppError("Usuário não existe");
    }
    const updateUserTodo = await this.usersRepository.createTodos({
      username,
      title,
      deadline,
    });

    return updateUserTodo;
  }
}

import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import { ITodos } from "@shared/infra/database/mongoose/schemas/User";

export default class FindAllTodosService {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = new UsersRepository();
  }

  public async execute(username: string): Promise<ITodos[]> {
    const todos = await this.usersRepository.findTodos(username);

    if (!todos) {
      throw new AppError("Usuario não encontrado");
    }

    return todos;
  }
}

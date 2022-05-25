import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import {
  ITodos,
  IUserInterface,
} from "@shared/infra/database/mongoose/schemas/User";
import { IDeleteTodo } from "../dtos/ITodosDTO";

export default class DeleteTodoService {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = new UsersRepository();
  }

  public async execute({
    username,
    id,
  }: IDeleteTodo): Promise<IUserInterface | null> {
    const findUser = await this.usersRepository.findClient(username);
    const findTodo = findUser?.todos.find((todo) => todo._id === id);

    if (!findTodo) {
      throw new AppError("ID de Todo não encontrado");
    }

    const deleteTodos = await this.usersRepository.deleteTodo({
      username,
      id,
    });

    return deleteTodos;
  }
}

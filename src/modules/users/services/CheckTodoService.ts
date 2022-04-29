import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import {
  ITodos,
  IUserInterface,
} from "@shared/infra/database/mongoose/schemas/User";
import { IFindAndCheckTodo } from "../dtos/ITodosDTO";

export default class CheckTodoService {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = new UsersRepository();
  }

  public async execute({
    username,
    id,
    done,
  }: IFindAndCheckTodo): Promise<IUserInterface | null> {
    const CheckTodo = await this.usersRepository.findAndCheckTodo({
      username,
      id,
      done,
    });
    return CheckTodo;
  }
}

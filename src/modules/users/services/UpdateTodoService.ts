import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import {
  ITodos,
  IUserInterface,
} from "@shared/infra/database/mongoose/schemas/User";
import { ICreateTodo, IUpdateByID } from "../dtos/ITodosDTO";

export default class UpdateTodoService {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = new UsersRepository();
  }

  public async execute({
    username,
    title,
    deadline,
    id,
  }: IUpdateByID): Promise<IUserInterface | null> {
    const updateTodo = await this.usersRepository.findAndUpdateTodo({
      username,
      deadline,
      id,
      title,
    });
    return updateTodo;
  }
}

import {
  ICreateTodo,
  IDeleteTodo,
  IFindAndCheckTodo,
} from "@modules/users/dtos/ITodosDTO";
import { ITodos, IUserInterface } from "../../schemas/User";

export interface ICreateUser {
  name: string;
  username: string;
}

export interface IFindAndUpdateTodo {
  username: string;
  title: string;
  deadline: string;
  id: string;
}

export default interface IUsersRepository {
  createClient({ name, username }: ICreateUser): Promise<IUserInterface>;

  findClient(username?: string): Promise<IUserInterface | null>;
  createTodos({
    username,
    title,
    deadline,
  }: ICreateTodo): Promise<IUserInterface | null>;

  findTodos(username?: string): Promise<ITodos[] | null>;

  findAndUpdateTodo({
    username,
    deadline,
    title,
    id,
  }: IFindAndUpdateTodo): Promise<ITodos | null>;

  findAndCheckTodo({ username, id }: IFindAndCheckTodo): Promise<ITodos | null>;
  deleteTodo({ username, id }: IDeleteTodo): Promise<IUserInterface | null>;
}

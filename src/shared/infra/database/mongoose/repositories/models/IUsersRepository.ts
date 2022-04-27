import { ICreateTodo } from "@modules/users/dtos/ITodosDTO";
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
  findTodos(username?: string): Promise<ITodos[] | null>;

  findClient(username?: string): Promise<IUserInterface | null>;

  createClient({ name, username }: ICreateUser): Promise<IUserInterface>;

  createTodos({
    username,
    title,
    deadline,
  }: ICreateTodo): Promise<IUserInterface | null>;

  findAndUpdateTodo({
    username,
    deadline,
    title,
    id,
  }: IFindAndUpdateTodo): Promise<IUserInterface | null>;
}

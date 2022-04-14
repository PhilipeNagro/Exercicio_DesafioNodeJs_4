import { ITodos, IUserInterface } from "../../schemas/User";

export interface ICreateUser {
  name: string;
  username: string;
}

export default interface IUsersRepository {
  findTodos(username?: string): Promise<ITodos[] | null>;

  findClient(username?: string): Promise<IUserInterface | null>;

  createClient({ name, username }: ICreateUser): Promise<IUserInterface>;
}

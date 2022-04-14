import { v4 as uuidv4 } from "uuid";
import User, { ITodos, IUserInterface } from "../../schemas/User";
import IUsersRepository, { ICreateUser } from "../models/IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  async findTodos(username?: string): Promise<ITodos[] | null> {
    const user = await User.findOne({
      username,
    });

    if (!user) {
      return null;
    }

    return user.todos;
  }

  async findClient(username: string): Promise<IUserInterface | null> {
    const user = await User.findOne({
      username,
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async createClient({ name, username }: ICreateUser): Promise<IUserInterface> {
    const user = await User.create({
      _id: uuidv4(),
      name,
      username,
      todos: [],
    });

    return user;
  }
}

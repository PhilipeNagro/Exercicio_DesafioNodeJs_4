import { v4 as uuidv4 } from "uuid";
import User, { ITodos, IUserInterface } from "../../schemas/User";
import IUsersRepository, {
  ICreateTodo,
  ICreateUser,
  IFindAndUpdateTodo,
} from "../models/IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  async findAndUpdateTodo({
    username,
    deadline,
    title,
    id,
  }: IFindAndUpdateTodo): Promise<IUserInterface | null> {
    const novoTodo = await User.findOneAndUpdate(
      { username, "todos.id": id },
      { $set: { "todos.$.title": title, "todos.$.deadline": deadline } },
      { new: true }
    );

    if (!novoTodo) {
      return null;
    }

    return novoTodo;
  }

  async createTodos({
    username,
    title,
    deadline,
  }: ICreateTodo): Promise<IUserInterface | null> {
    const newTodo = {
      id: uuidv4(),
      title,
      done: false,
      deadline: new Date(deadline),
      created_at: new Date(),
    };

    const todo = await User.findOneAndUpdate(
      {
        username,
      },
      {
        $setOnInsert: {
          _id: uuidv4(),
        },
        $addToSet: { todos: newTodo },
      }
    );
    return todo;
  }

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

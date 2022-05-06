import {
  ICreateTodo,
  IDeleteTodo,
  IFindAndCheckTodo,
} from "@modules/users/dtos/ITodosDTO";
import { v4 as uuidv4 } from "uuid";
import User, {
  ITodos,
  IUserInterface,
  ITodosInterface,
} from "../../schemas/User";
import IUsersRepository, {
  ICreateUser,
  IFindAndUpdateTodo,
} from "../models/IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  async deleteTodo({
    username,
    id,
  }: IDeleteTodo): Promise<IUserInterface | null> {
    const findTodo = await User.findOneAndUpdate(
      {
        username,
      },
      {
        $pull: { todos: { _id: id } },
      },
      {
        new: true,
      }
    );

    return findTodo;
  }

  async findAndCheckTodo({
    username,
    id,
  }: IFindAndCheckTodo): Promise<ITodos | null> {
    const findUser = await User.findOne({ username });
    const findTodo = findUser?.todos.find((todo) => todo._id === id);

    if (!findUser || !findTodo) {
      return null;
    }

    findTodo.done = true;
    findUser.save();

    return findTodo;
  }

  async findAndUpdateTodo({
    username,
    deadline,
    title,
    id,
  }: IFindAndUpdateTodo): Promise<ITodos | null> {
    const findUser = await User.findOne({ username });
    const findTodo = findUser?.todos.find((todo) => todo._id === id);

    if (!findUser || !findTodo) {
      return null;
    }

    findTodo.deadline = new Date(deadline);
    findTodo.title = title;
    findUser.save();

    return findTodo;
  }

  async createTodos({
    username,
    title,
    deadline,
  }: ICreateTodo): Promise<IUserInterface | null> {
    const newTodo = {
      _id: uuidv4(),
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
      },
      {
        new: true,
        upsert: true,
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

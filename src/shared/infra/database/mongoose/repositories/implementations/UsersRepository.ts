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
  /// AJUSTAR AQUI

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

    console.log(findTodo);
    return findTodo;
  }

  async findAndCheckTodo({
    username,
    id,
    done,
  }: IFindAndCheckTodo): Promise<IUserInterface | null> {
    const novoTodo = await User.findOneAndUpdate(
      { username, "todos._id": id },
      { $set: { "todos.$.done": true } },
      { new: true }
    );

    if (!novoTodo) {
      return null;
    }

    return novoTodo;
  }

  async findAndUpdateTodo({
    username,
    deadline,
    title,
    id,
  }: IFindAndUpdateTodo): Promise<IUserInterface | null> {
    const novoTodo = await User.findOneAndUpdate(
      { username, "todos._id": id },
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

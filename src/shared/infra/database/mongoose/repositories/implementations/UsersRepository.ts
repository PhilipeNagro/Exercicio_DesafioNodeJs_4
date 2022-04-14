import { v4 as uuidv4 } from "uuid";
import User, { IUserInterface } from "../../schemas/User";
import IUsersRepository from "../models/IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  async findOneAndUpdateUser({ name, username }: any): Promise<IUserInterface> {
    const user = await User.findOneAndUpdate(
      {
        username,
      },
      {
        $setOnInsert: {
          _id: uuidv4(),
          todos: [],
        },
        $set: {
          name,
          username,
        },
      },
      {
        upsert: true,
      }
    );

    return user;
  }
}

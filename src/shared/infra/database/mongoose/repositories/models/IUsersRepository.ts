import { IUserInterface } from "../../schemas/User";

export default interface IUsersRepository {
  findOneAndUpdateUser({ name, username }: any): Promise<IUserInterface>;
}

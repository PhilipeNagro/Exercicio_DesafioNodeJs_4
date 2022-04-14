import { Request, Response } from "express";
import UsersRepository from "../../../../../shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import CreateUserService from "../../../services/CreateUserService";

export default class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, username } = request.body;

    const usersRepository = new UsersRepository();

    const createUserService = new CreateUserService(usersRepository);

    const user = await createUserService.execute({
      username,
      name,
    });

    return response.status(200).json(user);
  }
}

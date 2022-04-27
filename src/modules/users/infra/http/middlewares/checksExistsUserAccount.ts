import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import { Request, Response, NextFunction } from "express";

export default async function checksExistsUserAccount(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { username } = request.headers;

  const userRepository = new UsersRepository();

  const userToFind = await userRepository.findClient(String(username));

  console.log(userToFind);
  if (!userToFind) {
    throw new AppError("Usuário não tem registro");
  }

  return next();
}

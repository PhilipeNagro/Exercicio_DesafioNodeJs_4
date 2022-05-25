import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import User from "@shared/infra/database/mongoose/schemas/User";
import MongoMock from "@shared/tests/MongoMock";
import CreateUserService from "../services/CreateUserService";

let usersRepository: UsersRepository;
let createUser: CreateUserService;

describe("Create Clients", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepository();
    createUser = new CreateUserService(usersRepository);

    await User.deleteMany({});
  });

  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it("should be able to create client", async () => {
    const userToCreate = {
      username: "rafael",
      name: "Rafael Vieira",
    };

    const user = await createUser.execute({
      name: userToCreate.name,
      username: userToCreate.username,
    });

    const userToVerify = await User.findOne({
      username: userToCreate.username,
    });

    expect(userToVerify?.username).toBe(user.username);
  });

  it("it should not be able to create client if the username do not exists", async () => {
    const userToCreate = {
      username: "rafael-vieira",
      name: "Rafael Vieira",
    };

    await User.create({
      _id: "123",
      username: "rafael-vieira",
      name: "Rafael Vieira",
      todos: [],
    });

    await expect(
      createUser.execute({
        name: userToCreate.name,
        username: userToCreate.username,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import User from "@shared/infra/database/mongoose/schemas/User";
import MongoMock from "@shared/tests/MongoMock";
import CreateTodoService from "../services/CreateTodoService";
import CreateUserService from "../services/CreateUserService";

let usersRepository: UsersRepository;
let createTodos: CreateTodoService;

describe("Create Todos", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepository();
    createTodos = new CreateTodoService(usersRepository);

    await User.deleteMany({});
  });

  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it("should be able to create a todo", async () => {
    const user = await User.create({
      _id: "123",
      username: "rafael-vieira",
      name: "Rafael Vieira",
      todos: [],
    });

    const deadline = "2021-02-27";
    const title = "title teste";
    const todoToCreate = await createTodos.execute({
      deadline,
      title,
      username: user.username,
    });
    expect(todoToCreate?.username).toBe(user.username);
  });
  it("should not be able to create todo if the user do not exists", async () => {
    const deadline = "2021-02-27";
    const title = "title teste";

    await expect(
      createTodos.execute({
        deadline,
        title,
        username: "not name",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

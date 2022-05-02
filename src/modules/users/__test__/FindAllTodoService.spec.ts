import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import User from "@shared/infra/database/mongoose/schemas/User";
import MongoMock from "@shared/tests/MongoMock";
import FindAllTodosService from "../services/FindAllTodosService";

let usersRepository: UsersRepository;

let findAllTodo: FindAllTodosService;

describe("Find All Todos", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepository();
    findAllTodo = new FindAllTodosService(usersRepository);

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
      todos: [
        {
          _id: "4568",
          title: "tarefa Teste",
          done: false,
          deadline: "2021-02-27",
          created_at: new Date(),
        },
      ],
    });
    const findAllTodoForTest = await findAllTodo.execute(user.username);
    expect(findAllTodoForTest[0]?._id).toBe(user.todos[0]._id);
  });

  it("cannot find a todo if the user does not exist", async () => {
    await expect(findAllTodo.execute("")).rejects.toBeInstanceOf(AppError);
  });
});

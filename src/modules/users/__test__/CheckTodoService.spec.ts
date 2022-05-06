import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import User from "@shared/infra/database/mongoose/schemas/User";
import MongoMock from "@shared/tests/MongoMock";
import CheckTodoService from "../services/CheckTodoService";

let usersRepository: UsersRepository;

let checkTodo: CheckTodoService;

describe("Check Todo", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepository();
    checkTodo = new CheckTodoService(usersRepository);

    await User.deleteMany({});
  });

  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it("sould be able to check a todo", async () => {
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

    const done = true;
    const username = "rafael-vieira";
    const id = "4568";
    const checkTodoForTest = await checkTodo.execute({
      username,
      id,
      done,
    });

    const verificaCheckTodo = await User.findOne({ _id: "123" });
    expect(verificaCheckTodo?.todos[0].done).toBe(done);
  });
});

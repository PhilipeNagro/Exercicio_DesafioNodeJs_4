import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import User from "@shared/infra/database/mongoose/schemas/User";
import MongoMock from "@shared/tests/MongoMock";
import UpdateTodoService from "../services/UpdateTodoService";

let usersRepository: UsersRepository;

let updateTodoService: UpdateTodoService;

describe("Update Todo", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepository();
    updateTodoService = new UpdateTodoService(usersRepository);

    await User.deleteMany({});
  });
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it("should be able to update a todo", async () => {
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

    const username = "rafael-vieira";
    const title = "title teste";
    const deadline = "2021-03-30";
    const id = "4568";

    const updateTodo = await updateTodoService.execute({
      username,
      title,
      deadline,
      id,
    });

    const verificaUpdate = await User.findOne({ _id: "123" });

    expect(verificaUpdate?.todos[0].title).toBe(title);
  });
});

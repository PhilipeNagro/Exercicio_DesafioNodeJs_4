import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import User from "@shared/infra/database/mongoose/schemas/User";
import MongoMock from "@shared/tests/MongoMock";
import DeleteTodoService from "../services/DeleteTodoService";

let usersRepository: UsersRepository;

let deleteTodo: DeleteTodoService;

describe("Delete Todos", () => {
  beforeEach(async () => {
    usersRepository = new UsersRepository();
    deleteTodo = new DeleteTodoService(usersRepository);

    await User.deleteMany({});
  });

  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it("should be able to delete a todo", async () => {
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
    const id = "4568";
    const username = "rafael-vieira";

    const deleteTodos = await deleteTodo.execute({
      username,
      id,
    });

    const verifyDelete = await User.findOne({ _id: "123" });

    expect(verifyDelete?.todos[0]).toBeFalsy();
  });

  it("cannot find a id todo ", async () => {
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
    const idToNotFind = "0000";

    await expect(
      deleteTodo.execute({
        username: "rafael-vieira",
        id: idToNotFind,
      })
    ).rejects.toEqual(new AppError("ID de Todo não encontrado", 400));
  });
});

import AppError from "@shared/errors/AppError";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import { ITodos } from "@shared/infra/database/mongoose/schemas/User";

// export default class UpdateTodoByIDService {
//   // Construtor
//   constructor(private usersRepository: UsersRepository) {
//     this.usersRepository = new UsersRepository();
//   }

//   public async execute(
//     username: string,
//     deadline: Date,
//     title: string,
//     id: string
//   ): Promise<IUserInterface> {
//     const user = await this.usersRepository.findClient(username);
//     if (!user) {
//       throw new AppError("Usuario não existe");
//     }

//     // const;
//   }
// }

// // const{username} = request.headers;
// // const {deadline,title} = request.body;
// // const {id} = request.params;

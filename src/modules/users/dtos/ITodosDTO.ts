export interface ITodoDTO {
  taxIDTodo: string;
  title: string;
  done: boolean;
  deadline: Date;
  created_at: Date;
}

export interface ICreateTodo {
  username: string;
  title: string;
  deadline: string;
}

// export interface IFindTodos {
//   username: string;
// }

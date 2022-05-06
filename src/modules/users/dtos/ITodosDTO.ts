export interface ITodoDTO {
  taxIDTodo: string;
  title: string;
  done: boolean;
  deadline: Date;
  created_at: Date;
}

export interface IDeleteTodo {
  username: string;
  id: string;
}
export interface ICreateTodo {
  username: string;
  title: string;
  deadline: string;
}

export interface IUpdateByID {
  username: string;
  title: string;
  deadline: string;
  id: string;
}

export interface IFindAndCheckTodo {
  username: string;
  id: string;
}

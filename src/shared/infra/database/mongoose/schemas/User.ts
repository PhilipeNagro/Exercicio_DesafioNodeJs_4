import { Schema, Document, model } from "mongoose";

interface ITodos {
  _id: string;
  title: string;
  deadline: string;
  done: boolean;
  createdAt: Date;
}

export interface IUserInterface extends Document {
  _id: string;
  name: string;
  username: string;
  todos: ITodos[];
}

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    todos: {
      type: [
        {
          _id: {
            type: String,
          },
          title: {
            type: String,
          },
          deadline: {
            type: String,
          },
          done: {
            type: Boolean,
          },
          createdAt: {
            type: Date,
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);

const User = model<IUserInterface>("User", UserSchema, "User");

export default User;

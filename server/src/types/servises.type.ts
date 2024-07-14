import { Request } from "express";
import { IUser } from "./users.type";

export interface IError extends Error {
  status: number;
}

export type RequestType = {
  user: IUser;
} & Request;

export interface IParams {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// export interface IRespondTodosWithCount {
//   todos: ITodo[];
//   totalCount: number;
// }

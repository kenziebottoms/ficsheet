import type { Request } from "express";
import type { User, WithId } from "../src/types";

export type UserRequest = Request<{ user: User }>;
export type YearRequest = UserRequest & Request<{ year: string }>;
export type RequestWithId = UserRequest & Request<{ id: string }>;

export type ApiError = {
  status: number;
  message?: string;
};

export type Password = {
  hash: string;
  salt: string;
};

export type PassportCallback = (
  error: unknown | null,
  user?: WithId<Pick<User, "username">> | false,
  context?: { message: string } | null,
) => void;

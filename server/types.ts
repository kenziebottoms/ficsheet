import type { Request } from "express";
import type { User, WithId } from "../src/types";

export type YearRequest = Request<{ year: string }>;
export type RequestWithId = Request<{ id: string }>;

export type ApiError = {
  status: number;
  message?: string;
};

export type Password = {
  hash: string;
  salt: string;
};

export type PassportCallback = (
  error: ApiError | null,
  user?: WithId<Pick<User, "username">> | false,
) => void;

export type UserWithPassword = User & {
  salt: string;
  hashedPassword: string;
};

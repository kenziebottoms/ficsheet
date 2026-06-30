import type { Request } from "express";

export type YearRequest = Request<{ year: string }>;
export type RequestWithId = Request<{ id: string }>;

export type ApiError = {
  status: number;
  message?: string;
};

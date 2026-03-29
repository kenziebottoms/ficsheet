import type { Request } from "express";

export type YearRequest = Request<{ year: string }>;

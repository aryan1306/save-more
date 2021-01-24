import { Request, Response } from "express";
import { SessionData } from "express-session";

declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}

export interface MyContext {
  req: Request & { session: SessionData };
  res: Response;
}

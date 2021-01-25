import { Request, Response } from "express";
import { SessionData } from "express-session";

declare module "express-session" {
  export interface SessionData {
    userId: string;
    vendorId: string;
  }
}

export interface MyContext {
  req: Request & { session: SessionData };
  res: Response;
}

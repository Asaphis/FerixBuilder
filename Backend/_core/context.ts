import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { getUserFromToken } from "./auth";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: any | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: any | null = null;

  try {
    const token = opts.req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      user = await getUserFromToken(token);
    }
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}

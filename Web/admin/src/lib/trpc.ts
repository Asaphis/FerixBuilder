import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../Backend/routers";

export const trpc = createTRPCReact<AppRouter>();

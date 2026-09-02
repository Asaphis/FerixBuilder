import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  getUserFromToken,
  isAdmin as checkIsAdmin,
  verifyEmail,
} from "../_core/auth";

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().optional(),
        role: z.enum(["CUSTOMER", "ADMIN"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await registerUser(input);
        return {
          success: true,
          user: {
            id: result.user.id,
            email: result.user.email,
            name: result.user.name,
            role: result.user.role,
          },
          emailSent: result.emailSent,
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error instanceof Error ? error.message : "Registration failed",
        });
      }
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await loginUser(input.email, input.password);
        return {
          success: true,
          user: {
            id: result.user.id,
            email: result.user.email,
            name: result.user.name,
            role: result.user.role,
          },
          tokens: result.tokens,
        };
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: error instanceof Error ? error.message : "Login failed",
        });
      }
    }),

  refresh: publicProcedure
    .input(
      z.object({
        refreshToken: z.string(),
      })
    )
    .mutation(({ input }) => {
      const accessToken = refreshAccessToken(input.refreshToken);
      
      if (!accessToken) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid or expired refresh token",
        });
      }

      return {
        success: true,
        accessToken,
      };
    }),

  me: publicProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await getUserFromToken(input.token);
      
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid token",
        });
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
      };
    }),

  verifyAdmin: publicProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .query(({ input }) => {
      const isAdmin = checkIsAdmin(input.token);

      if (!isAdmin) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Admin access required",
        });
      }

      return {
        success: true,
        isAdmin: true,
      };
    }),

  verifyEmail: publicProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await verifyEmail(input.token);
        return {
          success: true,
          alreadyVerified: result.alreadyVerified,
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error instanceof Error ? error.message : "Verification failed",
        });
      }
    }),
});

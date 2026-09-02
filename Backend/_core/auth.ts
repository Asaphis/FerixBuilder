import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";
const SALT_ROUNDS = 12;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate JWT access token
 */
export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Generate refresh token (longer-lived)
 */
export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Register a new user
 */
export async function registerUser(data: {
  email: string;
  password: string;
  name?: string;
  role?: "CUSTOMER" | "ADMIN";
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email.toLowerCase() },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      email: data.email.toLowerCase(),
      passwordHash,
      name: data.name,
      role: data.role || "CUSTOMER",
      emailVerified: false,
    },
  });

  const tokens: AuthTokens = {
    accessToken: generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    }),
    refreshToken: generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    }),
  };

  return { user, tokens };
}

/**
 * Login user with email and password
 */
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user || !user.passwordHash) {
    throw new Error("Invalid credentials");
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  // Update last signed in
  await prisma.user.update({
    where: { id: user.id },
    data: { lastSignedIn: new Date() },
  });

  const tokens: AuthTokens = {
    accessToken: generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    }),
    refreshToken: generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    }),
  };

  return { user, tokens };
}

/**
 * Refresh access token using refresh token
 */
export function refreshAccessToken(refreshToken: string): string | null {
  const payload = verifyToken(refreshToken);
  
  if (!payload) {
    return null;
  }

  return generateAccessToken(payload);
}

/**
 * Get user from token
 */
export async function getUserFromToken(token: string) {
  const payload = verifyToken(token);
  
  if (!payload) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  return user;
}

/**
 * Verify admin role
 */
export function isAdmin(token: string): boolean {
  const payload = verifyToken(token);
  return payload?.role === "admin";
}

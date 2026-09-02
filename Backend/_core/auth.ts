import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";
import { Resend } from "resend";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";
const SALT_ROUNDS = 12;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

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
 * Send verification email with link
 */
export async function sendVerificationEmail(email: string, userId: string) {
  if (!resend) {
    console.warn("Resend not configured - skipping email verification");
    return false;
  }

  const verificationToken = generateAccessToken({ userId, email, role: "CUSTOMER" });
  const verificationLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify?token=${verificationToken}`;

  try {
    await resend.emails.send({
      from: "FerixBuilder <noreply@ferixbuilder.com>",
      to: email,
      subject: "Verify your email address",
      html: `
        <h1>Welcome to FerixBuilder</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 4px;">Verify Email</a>
        <p>Or copy and paste this link into your browser:</p>
        <p>${verificationLink}</p>
        <p>This link will expire in 7 days.</p>
      `,
    });
    return true;
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return false;
  }
}

/**
 * Verify email with token
 */
export async function verifyEmail(token: string) {
  const payload = verifyToken(token);

  if (!payload) {
    throw new Error("Invalid or expired verification link");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.emailVerified) {
    return { success: true, alreadyVerified: true };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true },
  });

  return { success: true, alreadyVerified: false };
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

  // Send verification email
  const emailSent = await sendVerificationEmail(user.email, user.id);

  return { user, emailSent };
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

  // Check if email is verified
  if (!user.emailVerified) {
    throw new Error("Please verify your email before logging in");
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

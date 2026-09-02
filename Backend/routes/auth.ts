import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../_core/prisma.js';
import { resend } from '../_lib/resend.js';
import { ENV } from '../_core/env.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role: 'user',
        emailVerified: false,
      },
    });

    // Generate verification token
    const verificationToken = jwt.sign(
      { userId: user.id },
      ENV.cookieSecret,
      { expiresIn: '24h' }
    );

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${verificationToken}`;
    
    await resend.emails.send({
      from: 'FerixBuilder <noreply@ferixas.com>',
      to: email,
      subject: 'Verify your email',
      html: `
        <h1>Welcome to FerixBuilder!</h1>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link expires in 24 hours.</p>
      `,
    });

    res.json({ message: 'Registration successful. Please check your email to verify.' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if email verified
    if (!user.emailVerified) {
      return res.status(403).json({ error: 'Please verify your email first' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      ENV.cookieSecret,
      { expiresIn: '7d' }
    );

    // Update last signed in
    await prisma.user.update({
      where: { id: user.id },
      data: { lastSignedIn: new Date() },
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify email
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: 'Token required' });
    }

    // Verify token
    const decoded = jwt.verify(token as string, ENV.cookieSecret) as { userId: string };

    // Update user
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { emailVerified: true },
    });

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(400).json({ error: 'Invalid or expired token' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, ENV.cookieSecret) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;

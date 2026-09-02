import express from 'express';
import { prisma } from '../_core/prisma.js';

const router = express.Router();

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalRequests, pendingRequests, activeProjects] = await Promise.all([
      prisma.user.count(),
      prisma.projectRequest.count(),
      prisma.projectRequest.count({ where: { status: 'pending' } }),
      prisma.projectRequest.count({ where: { status: 'approved' } }),
    ]);

    res.json({
      totalUsers,
      totalRequests,
      pendingRequests,
      activeProjects,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        lastSignedIn: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;

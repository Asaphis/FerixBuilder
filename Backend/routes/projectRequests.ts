import express from 'express';
import { prisma } from '../_core/prisma.js';

const router = express.Router();

// Create project request
router.post('/', async (req, res) => {
  try {
    const { name, businessName, email, serviceType, message, userId } = req.body;

    const projectRequest = await prisma.projectRequest.create({
      data: {
        name,
        businessName,
        email,
        serviceType,
        message,
        userId: userId || null,
        status: 'pending',
      },
    });

    res.json(projectRequest);
  } catch (error) {
    console.error('Create project request error:', error);
    res.status(500).json({ error: 'Failed to create project request' });
  }
});

// Get all project requests (admin)
router.get('/', async (req, res) => {
  try {
    const requests = await prisma.projectRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(requests);
  } catch (error) {
    console.error('Get project requests error:', error);
    res.status(500).json({ error: 'Failed to fetch project requests' });
  }
});

// Get project requests by user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const requests = await prisma.projectRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(requests);
  } catch (error) {
    console.error('Get user project requests error:', error);
    res.status(500).json({ error: 'Failed to fetch project requests' });
  }
});

// Update project request status (admin)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.projectRequest.update({
      where: { id },
      data: { status },
    });

    res.json(updated);
  } catch (error) {
    console.error('Update project request error:', error);
    res.status(500).json({ error: 'Failed to update project request' });
  }
});

// Delete project request (admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.projectRequest.delete({
      where: { id },
    });

    res.json({ message: 'Project request deleted' });
  } catch (error) {
    console.error('Delete project request error:', error);
    res.status(500).json({ error: 'Failed to delete project request' });
  }
});

export default router;

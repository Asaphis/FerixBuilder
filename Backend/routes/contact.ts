import express from 'express';
import { resend } from '../_lib/resend.js';

const router = express.Router();

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, business, email, serviceType, message } = req.body;

    // Send email via Resend
    await resend.emails.send({
      from: 'FerixBuilder Contact <contact@ferixas.com>',
      to: 'info@ferixas.com',
      subject: `New Project Request from ${name}`,
      html: `
        <h2>New Project Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Business:</strong> ${business}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

export default router;

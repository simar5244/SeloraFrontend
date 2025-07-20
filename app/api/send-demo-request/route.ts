import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, company, companySize, message } = await request.json();

    // Create a test account if you don't have one
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`, // Sender address
      to: process.env.EMAIL_USER, // Your email address
      subject: `New Demo Request from ${company}`, // Subject line
      text: `
        New Demo Request:
        
        Name: ${name}
        Email: ${email}
        Company: ${company}
        Company Size: ${companySize}
        Message: ${message || 'No additional information provided'}
        
        Timestamp: ${new Date().toISOString()}
      `,
      html: `
        <h1>New Demo Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Company Size:</strong> ${companySize}</p>
        <p><strong>Message:</strong> ${message || 'No additional information provided'}</p>
        <br/>
        <p><em>Sent on: ${new Date().toLocaleString()}</em></p>
      `,
    });

    console.log('Message sent: %s', info.messageId);
    return NextResponse.json({ success: true, message: 'Demo request sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send demo request' },
      { status: 500 }
    );
  }
}

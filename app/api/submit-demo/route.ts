import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create Gmail transporter with App Password
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'helloselora@gmail.com',
      pass: 'mkfnqlknbyvivugv' // Your App Password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

export async function POST(request: Request) {
  let transporter;
  try {
    const formData = await request.json();
    console.log('Received form data:', formData);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.company || !formData.companySize) {
      throw new Error('Please fill in all required fields');
    }

    // Create transporter
    transporter = await createTransporter();

    // Verify connection configuration
    await transporter.verify();
    console.log('Server is ready to take our messages');

    // Email options
    const mailOptions = {
      from: `"${formData.name}" <helloselora@gmail.com>`,
      to: 'helloselora@gmail.com',
      replyTo: formData.email,
      subject: `New Demo Request from ${formData.name}`,
      text: `
        New demo request received:

        Name: ${formData.name}
        Email: ${formData.email}
        Company: ${formData.company}
        Company Size: ${formData.companySize}
        Message: ${formData.message || 'No additional message provided'}

        Received at: ${new Date().toLocaleString()}
      `,
      html: `
        <h2>New demo request received</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
        <p><strong>Company Size:</strong> ${formData.companySize}</p>
        <p><strong>Message:</strong> ${formData.message || 'No additional message provided'}</p>
        <p><em>Received at: ${new Date().toLocaleString()}</em></p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return NextResponse.json({ 
      success: true,
      message: 'Demo request sent successfully! We\'ll get back to you soon.',
      previewUrl: nodemailer.getTestMessageUrl(info)
    });
    
  } catch (error) {
    console.error('Error details:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
      code: (error as any).code,
      command: (error as any).command
    });

    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to submit form. Please try again or contact us directly.',
        error: error instanceof Error ? error.message : 'Unknown error',
        details: {
          code: (error as any).code,
          command: (error as any).command
        }
      },
      { status: 500 }
    );
  } finally {
    // Close the transporter when done
    if (transporter) {
      transporter.close();
    }
  }
}

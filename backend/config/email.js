const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendOrderConfirmation = async (email, order) => {
  const mailOptions = {
    from: `"Culinary Excellence" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Order Confirmation - Order #${order.orderNumber}`,
    html: `
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <p><strong>Order Number:</strong> ${order.orderNumber}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <h3>Items:</h3>
      <ul>
        ${order.items.map(item => `<li>${item.menuName} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
      </ul>
      <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
      <p><strong>Delivery Type:</strong> ${order.deliveryType}</p>
      ${order.deliveryAddress ? `<p><strong>Delivery Address:</strong> ${order.deliveryAddress}</p>` : ''}
      <p>We will notify you when your order is ready!</p>
    `
  };

  try {
    console.log(`Attempting to send Order Confirmation to: ${email}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('ORDER CONFIRMATION EMAIL ERROR:', error);
    throw error;
  }
};

const sendPasswordResetOTP = async (email, otp) => {
  const mailOptions = {
    from: `"Culinary Excellence" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset OTP - Culinary Excellence',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #004E89 0%, #FF6B35 100%); padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Password Reset</h1>
          <p style="color: #FFE5D9; margin: 10px 0 0 0; font-size: 16px;">Culinary Excellence Restaurant</p>
        </div>

        <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">Your Reset Code</h2>

          <p style="color: #666; line-height: 1.6; margin: 0 0 30px 0; font-size: 16px;">
            We received a request to reset your password for your Culinary Excellence account.
            Use the verification code below to reset your password.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <div style="background: linear-gradient(135deg, #004E89 0%, #FF6B35 100%);
                        color: white;
                        padding: 20px 40px;
                        border-radius: 12px;
                        font-weight: bold;
                        font-size: 32px;
                        display: inline-block;
                        letter-spacing: 8px;
                        box-shadow: 0 4px 15px rgba(0, 78, 137, 0.3);">
              ${otp}
            </div>
          </div>

          <p style="color: #666; line-height: 1.6; margin: 30px 0 20px 0; font-size: 14px;">
            This code will expire in 10 minutes for security reasons.
          </p>

          <p style="color: #666; line-height: 1.6; margin: 20px 0; font-size: 14px;">
            If you didn't request this password reset, please ignore this email.
            Your password will remain unchanged.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <div style="text-align: center; color: #999; font-size: 12px;">
            <p>For security reasons, never share this code with anyone.</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© 2024 Culinary Excellence Restaurant. All rights reserved.</p>
        </div>
      </div>
    `
  };

  try {
    console.log(`Attempting to send Password Reset OTP to: ${email}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    return true;
  } catch (error) {
    console.error('DETAILED EMAIL ERROR:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      stack: error.stack
    });
    throw error;
  }
};

const sendAdminOrderNotification = async (order) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@restaurant.com';
  const mailOptions = {
    from: `"Culinary Excellence" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `New Order Received - Order #${order.orderNumber}`,
    html: `
      <h2>New Order Received</h2>
      <p><strong>Order Number:</strong> ${order.orderNumber}</p>
      <p><strong>Customer:</strong> ${order.guestName || 'Registered User'}</p>
      <p><strong>Email:</strong> ${order.guestEmail || 'N/A'}</p>
      <p><strong>Phone:</strong> ${order.guestPhone || 'N/A'}</p>
      <h3>Items:</h3>
      <ul>
        ${order.items.map(item => `<li>${item.menuName} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
      </ul>
      <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
      <p><strong>Delivery Type:</strong> ${order.deliveryType}</p>
      ${order.deliveryAddress ? `<p><strong>Delivery Address:</strong> ${order.deliveryAddress}</p>` : ''}
      ${order.notes ? `<p><strong>Special Notes:</strong> ${order.notes}</p>` : ''}
      <p><strong>Order Time:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin order notification sent');
    return true;
  } catch (error) {
    console.error('Error sending admin email:', error);
    throw error;
  }
};

const sendOrderStatusUpdate = async (email, order, oldStatus) => {
  const mailOptions = {
    from: `"Culinary Excellence" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Order Update - Order #${order.orderNumber}`,
    html: `
      <h2>Order Status Update</h2>
      <p>Your order #${order.orderNumber} status has been updated!</p>
      <p><strong>Previous Status:</strong> ${oldStatus}</p>
      <p><strong>Current Status:</strong> ${order.status}</p>
      ${order.status === 'ready' ? '<p>Your order is ready for pickup/delivery!</p>' : ''}
      ${order.status === 'delivered' ? '<p>Your order has been delivered. Thank you for your order!</p>' : ''}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order status update email sent');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendReservationConfirmation = async (email, reservation) => {
  const mailOptions = {
    from: `"Culinary Excellence" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Reservation Confirmation - Reservation #${reservation.reservationNumber}`,
    html: `
      <h2>Reservation Confirmation</h2>
      <p>Thank you for your reservation!</p>
      <p><strong>Reservation Number:</strong> ${reservation.reservationNumber}</p>
      <p><strong>Date:</strong> ${new Date(reservation.reservationDate).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${reservation.reservationTime}</p>
      <p><strong>Number of Guests:</strong> ${reservation.numberOfGuests}</p>
      <p><strong>Status:</strong> ${reservation.status}</p>
      ${reservation.specialRequests ? `<p><strong>Special Requests:</strong> ${reservation.specialRequests}</p>` : ''}
      <p>We look forward to serving you!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reservation confirmation email sent');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  transporter,
  sendOrderConfirmation,
  sendOrderStatusUpdate,
  sendReservationConfirmation,
  sendAdminOrderNotification,
  sendPasswordResetOTP
};

import config from '../../../config';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const success = (data: any) => {
  return ` 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Payment Success</title>
  <style>
    /* Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    /* Body Styling */
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f9;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      color: #333;
    }

    .container {
      background: white;
      width: 100%;
      max-width: 600px;
      padding: 40px;
      text-align: center;
      border-radius: 8px;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    }

    .success-icon {
      font-size: 80px;
      color: #28a745;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 28px;
      color: #333;
      margin-bottom: 10px;
    }

    p {
      font-size: 18px;
      color: #666;
      margin-bottom: 30px;
    }

    .order-details {
      background-color: #f8f8fb;
      padding: 20px;
      border-radius: 5px;
      text-align: left;
      margin-bottom: 20px;
      font-size: 16px;
    }

    .order-details h3 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    .order-details .detail-item {
      margin-bottom: 5px;
    }

    .btn {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      font-size: 18px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      margin-top: 20px;
      cursor: pointer;
    }

    .btn:hover {
      background-color: #0056b3;
    }

    .footer {
      margin-top: 20px;
      font-size: 14px;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Success Icon -->
    <div class="success-icon">✔️</div>
    
    <!-- Success Message -->
    <h1>Payment Successful!</h1>
    <p>Thank you for your payment. Your transaction was completed successfully.</p>
    
    <!-- Order Details -->
    <div class="order-details">
      <h3>Order Details</h3>
      <div class="detail-item">Order ID: <strong>${data?.mer_txnid}</strong></div>
      <div class="detail-item">Amount Paid: <strong>${data?.amount}</strong></div>
      <div class="detail-item">Payment Method: <strong>${data?.payment_processor}</strong></div>
    </div>

    <!-- Back to Home Button -->
    <a href="${config.client_url}" class="btn">Go to Home</a>
    
    <!-- Footer -->
    <div class="footer">If you have any questions, contact us at support@example.com</div>
  </div>
</body>
</html>
`;
};

// Failed
export const failedPayment = () => {
  return ` 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Payment Failed</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f8f9fa;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      color: #333;
      text-align: center;
    }

    .container {
      background-color: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      padding: 40px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 36px;
      color: #e63946;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      color: #555;
      margin-bottom: 30px;
    }

    .button {
      background-color: #e63946;
      color: #fff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }

    .button:hover {
      background-color: #d62839;
    }

    .icon {
      font-size: 50px;
      color: #e63946;
      margin-bottom: 20px;
    }

    .contact {
      margin-top: 20px;
      font-size: 14px;
      color: #666;
    }

    .contact a {
      color: #e63946;
      text-decoration: none;
    }

    .contact a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">⚠️</div>
    <h1>Payment Failed</h1>
    <p>Unfortunately, your payment was not successful. Please check your payment details and try again.</p>
    <a href="${config.client_url}"  class="button">Go Home</a>
    <p class="contact">Need help? <a href="#">Contact Support</a></p>
  </div>
</body>
</html>

`;
};

// cancelled
export const cancelledPayment = () => {
  return ` 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Payment Cancelled</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f8f9fa;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
      color: #333;
    }

    .container {
      background-color: #fff;
      border: 1px solid #e0e0e0;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 40px;
      max-width: 500px;
      width: 100%;
    }

    h1 {
      font-size: 36px;
      color: #ff4b5c;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      color: #555;
      margin-bottom: 30px;
    }

    .button {
      background-color: #ff4b5c;
      color: #fff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      transition: background-color 0.3s;
    }

    .button:hover {
      background-color: #ff333f;
    }

    .icon {
      font-size: 48px;
      color: #ff4b5c;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">❌</div>
    <h1>Payment Cancelled</h1>
    <p>Your payment process has been cancelled. If you believe this was a mistake, you can try again or contact our support team.</p>
    <a href="${config.client_url}"  class="button">Go Back to Homepage</a>
  </div>
</body>
</html>

`;
};

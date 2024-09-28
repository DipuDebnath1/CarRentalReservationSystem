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

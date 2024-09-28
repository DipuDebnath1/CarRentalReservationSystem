/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from '../../../config';

export const initialPayment = async (paymentData: any) => {
  const res = await axios.post(config.paymentUrl!, {
    store_id: config.storeId,
    signature_key: config.signatureKey,
    tran_id: paymentData.transactionId,
    success_url: paymentData.paymentSuccessUrl,
    fail_url: paymentData.paymentFailedUrl,
    cancel_url: paymentData.paymentCancelledUrl,
    amount: paymentData.totalPrice,
    currency: 'BDT',
    desc: 'Merchant Registration Payment',
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: 'N/A',
    cus_city: 'N/A',
    cus_state: 'N/A',
    cus_postcode: 'N/A',
    cus_country: 'N/A',
    cus_phone: paymentData.customerPhone,
    type: 'json',
  });

  return res.data;
};

export const verifyPayment = async (txnId: string) => {
  const res = await axios.get(config.paymentVerifyUrl!, {
    params: {
      store_id: config.storeId,
      request_id: txnId,
      signature_key: config.signatureKey,
      type: 'json',
    },
  });
  return res.data;
};

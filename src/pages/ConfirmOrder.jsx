/* eslint-disable react/no-unescaped-entities */

import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Home, Package } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
export default function OrderConfirmation() {
  const location = useLocation();
  const { orderNumber, success, orderData } = location.state || {};

  // If no order data is present, show error state
  if (!orderNumber || !success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Package className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-2">Order Not Found</h1>
        <p className="text-gray-600 text-center max-w-md mb-6">
          We couldn't find your order details. This might happen if you refresh the page or access it directly.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Return Home
        </Link>
      </div>
    );
  }

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '1234567890';
  const whatsappMessage = `Hi! I'd like to check on my order #${orderNumber}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const summationOrderFromCart = orderData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Success Icon */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. We'll process your order right away.
          </p>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          {/* Order Number */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium mb-1">Order Number</p>
            <p className="text-lg font-mono font-bold text-blue-900">{orderNumber}</p>
          </div>

          {/* Order Summary */}
          {/* {orderDetails && (
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold text-gray-900 mb-3">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product</span>
                  <span className="font-medium text-gray-900">{orderDetails.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-medium text-gray-900">£ {orderDetails.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium text-gray-900">{orderDetails.paymentMethod}</span>
                </div>
              </div>
            </div>
          )} */}

          {/* summation Order From Cart */}
          {summationOrderFromCart && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="divide-y divide-gray-200">
                {summationOrderFromCart.items.map((item) => {
                  const unitPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price || 0);
                  const totalPrice = unitPrice * item.quantity;
                  const discount = summationOrderFromCart.discount || 0; 
                  const discountedPrice = totalPrice * (1 - discount / 100);
                  // const savedAmount = totalPrice - discountedPrice;

                  return (
                    <div key={item.id} className="py-4">
                      
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <span className="text-gray-500 text-sm">
                          {discount > 0 ? `Coupon Discount: ${discount}%` : ''}
                        </span>
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-500">
                        <p>Unit Price: £{unitPrice.toFixed(2)}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>
                          Total Price: <span>£{totalPrice.toFixed(2)}</span>{' '}
                          {discount > 0 && (
                            <span className="text-green-600 font-semibold">
                              £{discountedPrice.toFixed(2)}
                            </span>
                          )}
                        </p>
                        {/* {discount > 0 && (
                          <p className="text-sm text-red-600">You saved: £{savedAmount.toFixed(2)}</p>
                        )} */}
                      </div>
                      {discount > 0 ? '' : 'you haven’t any coupons yet'}
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-gray-900 font-semibold text-lg">
                  <span>Total Before Discount</span>
                  <span>£{summationOrderFromCart.subtotal.toFixed(2)}</span>
                </div>
                {summationOrderFromCart.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Total Discount</span>
                    <span>- £{(summationOrderFromCart.subtotal * summationOrderFromCart.discount / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-xl mt-2">
                  <span>Grand Total</span>
                  <span>£{summationOrderFromCart.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </a>
            
            <Link
              to="/"
              className="flex items-center justify-center w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-gray-500 text-center">
            You'll receive an email confirmation shortly with your order details.
          </p>
        </div>
      </div>
    </div>
  );
}
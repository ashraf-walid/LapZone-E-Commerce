import { CreditCard,Truck,Package,Clock} from 'lucide-react';

export const generateOrderNumber = () => {
    const now = new Date(); 
    const year = now.getFullYear(); 
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0'); 
    const randomPart = Math.floor(Math.random() * 10000); 
    return `ORD-${day}${month}${year}-${randomPart}`;
  }

  export const shippingOptions = [
    { id: 'standard', name: 'Standard Delivery', price: 0, time: '3-5 business days', icon: Truck },
    { id: 'express', name: 'Express Delivery', price: 50, time: '1-2 business days', icon: Clock },
  ];
  
  export const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'cod', name: 'Cash on Delivery', icon: Package },
  ];
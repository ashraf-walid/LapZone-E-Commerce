// import { useContext, useState } from 'react';
// import { ShopContext } from '../context/shop-context';
// import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    // const { cartItem, products, clearCart } = useContext(ShopContext); // Fetch cart items from context
    // const navigate = useNavigate();
    // const [formData, setFormData] = useState({
    //     fullName: '',
    //     email: '',
    //     address: '',
    //     city: '',
    //     paymentMethod: 'cash',
    // });

    // const handleInputChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Order Submitted', formData);
    //     clearCart(); 
    //     navigate('/confirmation'); 
    // };

    // const cartItems = Object.keys(cartItem).map((key) => {
    //     const product = products.find((p) => p.id === parseInt(key));
    //     if (!product) return null;

    //     return (
    //         <div key={product.id} className="cart-item">
    //             <p>{product.productName}</p>
    //             <p>{cartItem[product.id]} x {product.price} EGP</p>
    //         </div>
    //     );
    // });

    // const totalAmount = Object.keys(cartItem).reduce((acc, key) => {
    //     const product = products.find((p) => p.id === parseInt(key));
    //     if (!product) return acc;
    //     return acc + product.price * cartItem[key];
    // }, 0);

    return (
        <div className="checkout-container p-8 mx-auto w-3/4">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>

            {/* Cart Summary */}
            {/* <div className="cart-summary mb-6">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                {cartItems.length > 0 ? cartItems : <p>Your cart is empty.</p>}
                <div className="total mt-4">
                    <p className="font-bold">Total: {totalAmount.toLocaleString()} EGP</p>
                </div>
            </div> */}

            {/* Checkout Form */}
            {/* <form className="checkout-form" onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
                <div className="form-group mb-2">
                    <label htmlFor="fullName" className="block">Full Name</label>
                    <input 
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="email" className="block">Email</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="address" className="block">Address</label>
                    <input 
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="city" className="block">City</label>
                    <input 
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                        required
                    />
                </div> */}

                {/* Payment Method */}
                {/* <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
                <div className="form-group mb-2">
                    <input 
                        type="radio"
                        id="cash"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="cash" className="ml-2">Cash on Delivery</label>
                </div>
                <div className="form-group mb-2">
                    <input 
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="card" className="ml-2">Credit Card</label>
                </div> */}

                {/* Submit Button */}
                {/* <button 
                    type="submit" 
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Submit Order
                </button>
            </form> */}
        </div>
    );
}

/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/shop-context';

export const ProductInCart = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { addToCart, cartItem, removeFromCart, updateCartItem } = useContext(ShopContext);
    const cartItemAmount = cartItem[id] || 0;
    // {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}

    const [inputValue, setInputValue] = useState(cartItemAmount);

    useEffect(() => {
        setInputValue(cartItemAmount);
    }, [cartItemAmount]);

    const handleInputChange = (e) => {
        // parseInt("08") without the radix could return 0 (interpreted as octal), but with parseInt("08", 10) it correctly returns 8.
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setInputValue(value);
        }
    };

    const handleBlurOrEnter = () => {
        updateCartItem(id, inputValue);
    };

    return (
        <div key={id} className="flex justify-start items-center container mx-auto mb-6 w-1/2 shadow-xl hover:shadow-2xl p-6 rounded-lg  duration-700 max-lg:w-3/4 max-sm:w-full max-sm:mx-4">
            <img src={productImage} alt="product" className="w-48 mr-8 max-sm:w-36 max-sm:mr-6" />
            
            <div>
                <div className="text-center">
                    <p><b>{productName}</b></p>
                    <p className="my-4">${(price * inputValue).toFixed(1)}</p>
                </div>
                
                <button className='bg-slate-300 w-6 max-sm:w-4' onClick={() => addToCart(id)}> + </button>
                
                <input 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    onBlur={handleBlurOrEnter}
                    onKeyPress={(e) => e.key === 'Enter' && handleBlurOrEnter()}
                    className="w-20 text-center max-sm:w-8" 
                />
                
                <button className='bg-slate-300 w-6 max-sm:w-4' onClick={() => removeFromCart(id)}> - </button>
            </div>
        </div>
    );
};



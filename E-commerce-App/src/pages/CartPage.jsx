import { ShopContext } from '../context/shop-context'
import { useContext, useState, useEffect } from 'react';
import { Products } from '../products'
import { ProductInCart } from '../components/ProductInCart'
import { Link } from 'react-router-dom';


function CartPage() {
    const { cartItem } = useContext(ShopContext);
    const [totalAmount , setTotalAmount] = useState(0);
    // {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}

    useEffect(() => {
        let subtotal = 0;
        Products.forEach((product) => {
            if (cartItem[product.id] > 0) {
                subtotal += product.price * cartItem[product.id];
            }
        });
        setTotalAmount(subtotal);
    }, [cartItem]); 

    return (
        <>
            <h1 className='w-fit mx-auto text-4xl my-20'>Your cart item</h1>
            <div>
                {Products.map((e)=> {if(cartItem[e.id] > 0) {return <ProductInCart key={e.id} data={e}/>}} )}
            </div>
            {totalAmount > 0 ? (
            <div>
                <p className="flex items-center justify-center mb-8">Subtotal : ${totalAmount.toFixed(2)}</p>
                
                <div className="flex items-center justify-center gap-x-5">
                    <Link to='/' className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 duration-300">continue shopping</Link>
                    <Link to='/checkout' className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 duration-300">checkout</Link>
                </div>
            </div>) : (<h1 className='w-fit mx-auto text-4xl mb-20'>Your cart is empty</h1>)}

            <div className='h-52'></div>
        </>
        

    )
}

export default CartPage


import { ShopContext } from '../context/shop-context'
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export const Product = (props) => {
    // eslint-disable-next-line react/prop-types
    const {id, productName, price, productImage} = props.data;

    // <ShopContext.Provider value={contextValue}></ShopContext.Provider>
    const {addToCart, cartItem} = useContext(ShopContext);
    const cartItemAmount = cartItem[id] || 0;

    const formattedPrice = price.toLocaleString('en-US', { minimumFractionDigits: 2 });


    return (
        <>
            {/* THE PRODUCT */}
            <div key={id} 
            className=
            "product-card h-72 flex flex-col justify-between items-center pb-4 border border-gray-200 duration-300 hover:shadow-[0_3px_3px_3px_rgba(0,0,0,0.3)] bg-white">
                <Link to={`/products/${id}`}>
                <img src={productImage} alt="product" className="w-44"/>
                </Link>
                
                <div>
                    <p className='text-sm font-light'><b>{productName}</b></p>
                    <p className="mt-3 font-bold">{formattedPrice}<span className='text-xs font-mono'> EGP</span></p>
                    <button onClick={()=> addToCart(id)} className="border border-green-500 rounded-lg px-3 py-1 mt-3 hover:bg-green-500 text-sm font-semibold hover:text-white w-full">
                        Add To cart <span>{' '}</span>{cartItemAmount > 0 && <>({' '}{ cartItemAmount }{' '})</>}
                    </button>
                </div>                
            </div>
        </>
        
    )
}


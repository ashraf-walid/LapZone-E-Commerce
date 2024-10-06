
import { useParams } from 'react-router-dom';
import { Products } from '../products';
import { useContext, useState } from 'react';
import { ShopContext } from '../context/shop-context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faWallet } from '@fortawesome/free-solid-svg-icons';



export default function ProductDetails(){

    const { id } = useParams(); // Get the product ID from the URL
    const {addToCart, cartItem} = useContext(ShopContext);
    const cartItemAmount = cartItem[id] || 0;

    const product = Products.find((p) => p.id === parseInt(id));
    const [displayImages , setDisplayImages] = useState(product.productImage);

    function addUrl(url){
        setDisplayImages(url);
    }

    if (!product) {
        return <div>Product not found</div>; // Handle case where product is not found
    }

    const formattedPrice = product.price.toLocaleString('en-US', { minimumFractionDigits: 2 });

    return (
        <>
            <div className="product-details p-4 flex mx-auto w-3/5 gap-x-4 max-xl:w-3/4 max-lg:w-[85%] max-md:w-[97%] max-sm:flex-col ">
                <div className="flex gap-x-4 max-sm:mb-6">
                    <div className='moreImages'>
                        {product.imageDetails.map((imgDetail , i)=> {
                            const imageUrl = Object.values(imgDetail)[0]; // Extract the image URL
                            return (<img key={i} src={imageUrl} onClick={()=> addUrl(imageUrl)} 
                            className="w-28 h-auto mb-1 rounded-lg cursor-pointer duration-300 hover:scale-105 hover:shadow" />)
                        })}
                    </div>


                    <div className='flex flex-col items-center'>
                        <img src={displayImages} alt={product.productName} 
                        className="w-96 h-auto rounded-lg duration-300 hover:scale-105 hover:shadow" />



                        <div className='flex text-center gap-x-4 mt-4 max-sm:gap-x-1 max-sm:mt-2'>
                            <div>
                                <FontAwesomeIcon icon={faWallet} className="text-green-500 w-3 h-3" />
                                <p className='text-[14px]'>Cash on delivery</p>
                                <span className='text-gray-400 text-[12px] max-sm:pr-2'>Cash or card</span>
                            </div>
                            <div className='border-l pl-4 max-sm:pl-2'>
                                <FontAwesomeIcon icon={faRotateLeft} className="text-green-500 w-3 h-3"/>
                                <p className='text-[14px]'>Return for free</p>
                                <span className='text-gray-400 text-[12px]'>Up to 30 days</span>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

                <div>
                    <h2 className="text-xl font-bold">{product.productName}</h2>
                    <p className="text-lg">Description : {product.description}</p>
                    <p className="mt-3 font-bold">{formattedPrice}<span className='text-xs font-mono'> EGP</span></p>
                    <p className="text-lg">CPU : {product.cpu}</p>
                    <p className="text-lg">Display Size : {product.displaySize}</p>

                    <button 
                        onClick={()=> addToCart(id)} 
                        className=
                        "border border-green-500 rounded-lg px-3 py-1 mt-3 hover:bg-green-500 text-sm duration-300 font-semibold hover:text-white w-72 mx-auto block">
                        Add To cart <span>{' '}</span>
                        {cartItemAmount > 0 && <>({' '}{ cartItemAmount }{' '})</>}
                    </button>
                </div>
                
            </div>
        </>
    )
}
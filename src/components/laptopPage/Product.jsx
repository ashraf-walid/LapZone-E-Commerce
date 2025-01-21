import { motion } from 'framer-motion';
import { ShopContext } from '../../context/shop-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '../ui-Tooltip';
import {  ShoppingCart, Info, Cpu } from 'lucide-react';

export const Product = (props) => {
const { id, name, price, images, cpu, ram, discount, originalPrice } = props.data;

const { addToCart } = useContext(ShopContext);

const formattedPrice = price.toLocaleString('en-US', { minimumFractionDigits: 2 });

return (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}  
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden group relative">
        
        <Link to={`/products/laptopCollection/${id}`}> 
            <img 
                src={images} 
                alt={name}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
        </Link>

        <div className="absolute top-2 right-2">
          {discount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              -{discount}%
            </span>
          )}
        </div>

        <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{name}</h3>
            
            <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                    <Cpu className="w-4 h-4 mr-2" />
                    <span>{cpu}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Info className="w-4 h-4 mr-2" />
                    <span>{ram} RAM</span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-blue-600">£ {formattedPrice}</span>
                    {originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                        {originalPrice} 
                    </span>
                    )}
                </div>
                <Tooltip content="Add to Cart">
                    <button onClick={() => addToCart(id)} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </Tooltip>
            </div>
        </div>
    </motion.div>
);
};


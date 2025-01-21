import { ShoppingCart } from 'lucide-react';
import { ShopContext } from '../../context/shop-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';


export default function AccessoryCard({ accessory }) {
  const mainImage = accessory.images?.[0] || accessory.image;
  const { addToCart } = useContext(ShopContext);
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
      <div className="relative">
        <Link to={`/products/laptop-accessories/${accessory.id}`}>
          <img 
            src={mainImage}
            alt={accessory.name}
            className="w-full h-48 object-cover transform transition-transform group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 right-2">
          {accessory.discount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              -{accessory.discount}%
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{accessory.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{accessory.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">£ {accessory.price}</span>
            {accessory.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {accessory.originalPrice} 
              </span>
            )}
          </div>
          
          <button onClick={() => addToCart(accessory.id)} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Additional Details */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 text-xs">
            <div>
              <span className="text-gray-500">Brand:</span>
              <span className="ml-1 text-gray-700">{accessory.brand}</span>
            </div>
            {accessory.warranty && (
              <div>
                <span className="text-gray-500">Warranty:</span>
                <span className="ml-1 text-gray-700">{accessory.warranty}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

export default function CartItem({
  id,
  name,
  price,
  images,
  quantity,
  collection,
  onQuantityChange,
  onIncrement,
  onDecrement
}) {
  const [inputValue, setInputValue] = useState(quantity);
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    setInputValue(quantity);
  }, [quantity]);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setInputValue(value);
    }
  };

  const handleBlur = () => {
    if (inputValue === 0) {
      setShowConfirmDialog(true);
    } else {
      onQuantityChange(id, inputValue);
    }
  };

  const handleRemove = () => {
    onQuantityChange(id, 0);
  };

  return (
    <>
    <div 
      className="flex items-center gap-6 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${collection}/${id}`} className="shrink-0 relative group">
        <img 
          src={images} 
          alt={name} 
          className="w-32 h-32 object-cover rounded-md transition-transform duration-300 group-hover:scale-105" 
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black/5 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm text-white bg-black/50 px-2 py-1 rounded">View Details</span>
          </div>
        )}
      </Link>
      
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <Link 
            to={`/products/${collection}/${id}`}
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
          >
            {name}
          </Link>
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-2 text-gray-600 font-medium">
          £{(parseFloat(price) * quantity).toFixed(2)}
          <span className="text-xs text-gray-400 ml-2">
            (£{parseFloat(price).toFixed(2)} each)
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => onDecrement(id)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <input
            type="number"
            min="0"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-16 text-center border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <button
            onClick={() => onIncrement(id)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
          if (inputValue === 0) {
            setInputValue(1);
            onQuantityChange(id, 1);
          }
        }}
        onConfirm={handleRemove}
        title="Remove Item"
        message="Are you sure you want to remove this item from your cart?"
    />
    </>
  );
}

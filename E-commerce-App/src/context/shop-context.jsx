/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import { Products } from '../products'

export const ShopContext = createContext(null);

const getDefaultCart = ()=> {
    let cart = {};
    for (let i = 1; i < Products.length + 1; i++){
        cart[i] = 0;
    }
    return cart;
}
// {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}

export const ShopContextProvider = (props) => {
    const [cartItem, setCartItem] = useState(getDefaultCart());
    const [filteredProductsList, setFilteredProductsList] = useState(Products); // State to hold filtered products

    const addToCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const updateCartItem = (itemId, newAmount) => {
        setCartItem((prev) => ({
            ...prev,
            [itemId]: newAmount,
        }));
    };

    const filteredProducts = (searchTerm) => {
        if (!searchTerm) {
            setFilteredProductsList(Products); // Reset to all products
        } else {
            const filterList = Products.filter((product) =>
                product.productName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProductsList(filterList); // Update the filtered list
        }
    };

    const contextValue = {
        cartItem,
        addToCart,
        removeFromCart,
        updateCartItem,
        filteredProductsList, // Provide filtered products to other components
        filteredProducts,     // Provide the filter function to the context
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};




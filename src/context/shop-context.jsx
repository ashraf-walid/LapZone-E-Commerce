import { createContext, useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { onSnapshot, collection, addDoc, query, where, getDocs, getDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

const collections = ["laptopCollection", "laptop-accessories"];

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {

    const [cartItem, setCartItem] = useState(() => {
      const storedCart = localStorage.getItem('cartItems'); 
      return storedCart ? JSON.parse(storedCart) : {}; 
    });
    const [cartProducts, setCartProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [laptopsList, setLaptopsList] = useState([]);
    const [accessoriesList, setAccessoriesList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [favorites, setFavorites] = useState([]); 
    const [trending, setTrending] = useState([]);

    // update cartItems in localStorage
    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItem)); 
    }, [cartItem]); 

    // Sign in with Google
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setCurrentUser(result.user);
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    };

    // [ One ] 
    // Function that receives the productId and return all Data for this product from any collection
    const getProductDetails = async (productId) => {
      for (const collectionName of collections) {
        const productRef = doc(db, collectionName, productId);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
          return { ...productSnapshot.data(), collection: collectionName, productId }; 
        }
      }
        return null;
    };

    // [ Two ]
    // Firebase Authentication: Update user status 
    useEffect(() => {
        const auth = getAuth();
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user);
        } else {
            setCurrentUser(null);
            setFavorites([]); // Clear favorites when user logs out
        }
        });
        return () => unsubscribeAuth();
    }, []);

    // [ Three ]
    // Fetch favorites products and update favorites
    useEffect(() => {
      if (!currentUser) return;
      // query if user have a favorite product
      const favoritesQuery = query(
        collection(db, "favorites"),
        where("userId", "==", currentUser.uid)
      );

      // using onSnapshot (real time) To listen to changes in favorites collection
      const unsubscribe = onSnapshot(favoritesQuery, async (snapshot) => {
      // Track changes to favorites
      const favoriteProductPromises = snapshot.docs.map(async (favDoc) => {
        const productId = favDoc.data().productId;
        const productDetails = await getProductDetails(productId);
        return productDetails // if (productDetails) {
          ? { 
              ...productDetails, 
              favId: favDoc.id 
            } 
          : null;
      });

      // Wait until all promises are completed before proceeding. 
      // Returns a new promise containing an array of results.
      const favoriteProducts = await Promise.all(favoriteProductPromises);
      
      // Update favorites status with filtering out missing values
      setFavorites(favoriteProducts.filter(product => product !== null));
      }, (error) => {
        console.error("Error listening to favorites:", error);
        toast.error("Failed to sync favorites");
      });

      // Unsubscribe when component is removed
      return () => unsubscribe();
    }, [currentUser]);

    // [ Four ]
    // Fetch Trending products
    useEffect(() => {
    const fetchTrendingProducts = async () => {
      if (favorites.length > 0) return;

      try {
      let trendingProducts = [];
      // query about Trending products
      for (const collectionName of collections) {
          const trendingQuery = query(
          collection(db, collectionName),
          where("isTrending", "==", true)
          );

        const snapshot = await getDocs(trendingQuery);

        // Extract data from snapshot
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        trendingProducts = [...trendingProducts, ...products];
      }
      
      // Filter out empty values
        setTrending(trendingProducts.filter((product) => product !== null));
      } catch (error) {
        console.error("Error fetching trending products:", error);
        toast.error("Failed to fetch trending products");
      }
      };

        fetchTrendingProducts();
    }, [currentUser,favorites]);

    // [ Five ]
    // Favorite toggle function
    const toggleFavorite = async (productId) => {
      if (!currentUser) {
        toast.error("You need to be logged in to manage favorites.");
        return null;
      }

      try {
        const favQuery = query(
          collection(db, "favorites"),
          where("userId", "==", currentUser.uid),
          where("productId", "==", productId)
        );
    
        const snapshot = await getDocs(favQuery);
    
        if (!snapshot.empty) {
          // Remove from favorites
          const favId = snapshot.docs[0].id;
          await deleteDoc(doc(db, "favorites", favId));
          toast.info("Removed from favorites.", {
            autoClose: 1500, 
          });
          return false;
        } else {
          // Add to favorites
          const newFavorite = {
            userId: currentUser.uid,
            productId,
          };
          await addDoc(collection(db, "favorites"), newFavorite);
          toast.success("Added to favorites!" , {
            autoClose: 1500, 
          });
          return true;
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
        toast.error("Failed to update favorites.");
        return null;
      }
    };
    
    // [ Six ]
    // Check if the product is preferred
    const isFavorite = (productId) => {
      if (!favorites || favorites.length === 0) return false;
      return favorites.some((fav) => fav.productId === productId);
    };

    // [ Seven ]
    // fetch all products 
    // Setting up shopping cart ( initialCart )
    useEffect(() => {
        const unsubscribeProducts = onSnapshot(collection(db, 'laptopCollection'), (snapshot) => {
            const Laptops = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                category: 'laptopCollection',
            }));
            setLaptopsList(Laptops);

            const unsubscribeAccessories = onSnapshot(
                collection(db, 'laptop-accessories'),
                (snapshot) => {
                    const accessories = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        category: 'laptop-accessories',
                    }));
                    setAccessoriesList(accessories);
                    const combinedProducts = [...Laptops, ...accessories];
                    setProducts(combinedProducts);

                    // Prepare Cart data { id:0, id:0, id:0 ........} id for each product
                    // with save current data
                    setCartItem((prevCart) => {
                      const initialCart = { ...prevCart }; 
                      combinedProducts.forEach((item) => {
                          if (!(item.id in initialCart)) {
                              initialCart[item.id] = 0; // adding just new elements 
                          }
                      });
                      return initialCart; // update `cartItem`
                    });
                    
                },
                (error) => {
                    console.error("Error fetching accessories:", error);
                }
            );
    
            return () => unsubscribeAccessories();
        }, (error) => {
            console.error("Error fetching products:", error);
        });
    
        return () => unsubscribeProducts();
    }, []);

    // Fetch Products in cart 
    useEffect(() => {
      if(cartItem){
        // Get cart items with product details
        const productsInCart = products.filter(
          (product) => cartItem[product.id] > 0
        ).map(product => 
          ({
          ...product,
          quantity: cartItem[product.id]
        }));
        setCartProducts(productsInCart);
      }
    }, [cartItem, products]);

    // Calculate subtotal whenever cart items or products change
    useEffect(() => {
      const total = products.reduce((sum, product) => {
        const quantity = cartItem[product.id] || 0;
        return sum + product.price * quantity;
      }, 0);
      
      setSubtotal(total);
    }, [cartItem, products]);
    
    // [ Eight ]
    // Add item to cart
    const addToCart = (itemId) => {
      if (!itemId) {
        console.error("Invalid itemId provided");
        return;
      }
      setCartItem((prev) => {
        const newCart = { 
          ...prev, 
          [itemId]: (prev[itemId] || 0) + 1 
        };
        localStorage.setItem('cartItems', JSON.stringify(newCart));
        return newCart;
      });
    };
    
    // [ Nine ]
    // Compute total items in cart
    const cartItemCount = Object.values(cartItem).filter(value => value > 0).length;

    // [ Ten ]
    // Remove item from cart
    const removeFromCart = (itemId) => {
      setCartItem((prev) => {
          const updatedCart = { ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) };
  
          if (updatedCart[itemId] === 0) {
              delete updatedCart[itemId];
          }
  
          localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  
          return updatedCart;
      });
    };

    // clearCart
    function clearCart() {
      console.log("Cart before clearing:", cartItem);
      setCartItem({});
      localStorage.setItem('cartItems', JSON.stringify({})); 
      console.log("Cart has been cleared.");
    }
    
    // [ eleven ]
    // Update the quantity for a specific item in the cart
    const updateQuantityCartItem = (itemId, newAmount) => {
      setCartItem((prev) => {
          const updatedCart = { ...prev, [itemId]: newAmount };
          if (newAmount === 0) {
              delete updatedCart[itemId];
          }
          localStorage.setItem('cartItems', JSON.stringify(updatedCart));
          return updatedCart;
      });
    };
  
    // Values to be shared
    const contextValue = {
        currentUser, 
        cartItemCount,
        cartProducts,
        cartItem,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantityCartItem,
        laptopsList,
        accessoriesList,
        products,
        favorites,
        trending,
        toggleFavorite,
        isFavorite,
        clearCart,
        signInWithGoogle,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
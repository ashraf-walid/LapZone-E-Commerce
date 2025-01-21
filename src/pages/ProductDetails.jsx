import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { ShopContext } from '../context/shop-context';
import { toast } from 'react-toastify';
import { AccessoryFields, LaptopsFields } from '../Dashboard/constants';

import ImageGallery from '../components/productDetail/ImageGallery';
import ProductInfo from '../components/productDetail/ProductInfo';
import ProductActions from '../components/productDetail/ProductActions';
import SpecificationTable from '../components/productDetail/SpecificationTable';
import Footer from '../components/footer/Footer';
import CheckoutModal from '../components/checkout/CheckoutModal';

const COLLECTION_CONFIG = {
  laptop: {
    collection: 'laptopCollection',
    fields: LaptopsFields,
  },
  accessory: {
    collection: 'laptop-accessories',
    fields: AccessoryFields,
  }
};

export default function ProductDetails({ productType }) {
  const [product, setProduct] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const { id } = useParams();
  const { 
    addToCart, 
    cartItem, 
    currentUser, 
    toggleFavorite, 
    favorites,
    isFavorite 
  } = useContext(ShopContext);

  // Fetch product using id from URL
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        toast.error("Invalid product ID", { autoClose: 2500 });
        return;
      }

      const config = COLLECTION_CONFIG[productType];
      if (!config) {
        toast.error("Invalid product type");
        return;
      }

      try {
        const docRef = doc(db, config.collection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast.error("Product not found", { autoClose: 2500 });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
      }
    };
    fetchProduct();
  }, [id, productType]);

  // Check if product is in favorites
  useEffect(() => {
    const checkFavoriteStatus = () => {
      if (product && favorites) {
        if (productType === 'laptop') {
          const isFav = favorites.some((fav) => fav.productId === product.id);
          setIsFavoriteProduct(isFav);
        } else {
          setIsFavoriteProduct(isFavorite(product.id));
        }
      }
    };

    checkFavoriteStatus();
  }, [product, favorites, productType, isFavorite]);

  // Toggle favorite handler
  const handleToggleFavorite = async () => {
    if (!currentUser) {
      toast.warning('Please log in to add items to favorites');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await toggleFavorite(product.id);
      if (productType === 'laptop' && result !== null) {
        setIsFavoriteProduct(result);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      toast.warning('Please log in to proceed with purchase');
      return;
    }
    setIsBuying(true);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  const fields = COLLECTION_CONFIG[productType].fields;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb navigation could go here */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ImageGallery 
              images={product.images || []} 
              productName={product.name || 'Unknown'} 
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
              <ProductInfo
                name={product.name || 'Unknown'}
                description={product.description || 'No description available'}
                brand={product.brand || 'Unknown'}
                price={product.price || 0}
              />

              <div className="border-t border-gray-100 pt-6">
                <ProductActions
                  onAddToCart={() => addToCart(product.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onBuyNow={handleBuyNow}
                  cartItemCount={cartItem[product.id] || 0}
                  isFavorite={isFavoriteProduct}
                  isProcessing={isProcessing}
                  isInBuyingProcess={isBuying}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h2>
              <SpecificationTable
                specifications={fields
                  .filter(field => field.type !== 'checkbox')
                  .map(field => ({
                    name: field.name,
                    placeholder: field.placeholder,
                    value: product[field.name],
                  }))}
              />
            </div>
          </div>
        </div>
      </div>

      {isBuying && (
        <CheckoutModal
          onClose={() => setIsBuying(false)} 
          product={product}
        />
      )}

      <Footer />
    </div>
  );
}


  // return (
  //   <div className="min-h-screen bg-gray-100">
  //     <div className="max-w-7xl mx-auto px-4 py-8">
  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  //         <ImageGallery 
  //           images={product.images || []} 
  //           productName={product.name || 'Unknown'} 
  //         />

  //         <div className="space-y-8">
  //           <ProductInfo
  //             name={product.name || 'Unknown'}
  //             description={product.description || 'No description available'}
  //             brand={product.brand || 'Unknown'}
  //             price={product.price || 0}
  //           />

  //           <ProductActions
  //             onAddToCart={() => addToCart(product.id)}
  //             onToggleFavorite={handleToggleFavorite}
  //             onBuyNow={handleBuyNow}
  //             cartItemCount={cartItem[product.id] || 0}
  //             isFavorite={isFavoriteProduct}
  //             isProcessing={isProcessing}
  //             isInBuyingProcess={isBuying}
  //           />

  //           <SpecificationTable
  //             specifications={fields
  //               .filter(field => field.type !== 'checkbox')
  //               .map(field => ({
  //               name: field.name,
  //               placeholder: field.placeholder,
  //               value: product[field.name],
  //             }))}
  //             />
  //         </div>
  //       </div>
  //     </div>

  //     {isBuying && (
  //       <CheckoutModal
  //         onClose={()=> setIsBuying(false)} 
  //         product={product}
  //       />
  //     )}

  //     <Footer />
  //   </div>
  // );

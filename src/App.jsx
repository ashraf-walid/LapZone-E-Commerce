import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useParams } from "react-router-dom";
import Header from './components/header/Header'
import { ShopContextProvider } from './context/shop-context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const ReturnsPolicy = lazy(() => import('./pages/ReturnsPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const Dashboard = lazy(() => import('./Dashboard/dashboard'));
const NotFound = lazy(() => import('./pages/NotFound')); 
const ConfirmOrder = lazy(() => import('./pages/ConfirmOrder'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Contact = lazy(() => import('./pages/Contact'));
const Laptops = lazy(() => import('./pages/Laptops')); 
const Accessories = lazy(() => import('./pages/Accessories')); 
const Checkout = lazy(() => import('./pages/Checkout')); 
const UserPage = lazy(() => import('./pages/userPage')); 
const FAQ = lazy(() => import('./pages/FAQ/FAQPage')); 
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy')); 
const BlogPage = lazy(() => import('./pages/BlogPage')); 
const ShippingInfo = lazy(() => import('./pages/ShippingInfo')); 
const AboutUs = lazy(() => import('./pages/AboutUs')); 

function ProductRouter() {
  const { category } = useParams();
  
  const productTypeMap = {
    'laptopCollection': 'laptop',
    'laptop-accessories': 'accessory'
  };

  const productType = productTypeMap[category];

  if (!productType) {
    return <NotFound />;
  }

  return <ProductDetails productType={productType} />;
}

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
  </div>
);

function App() {
  return (
    <ShopContextProvider>
      <ToastContainer />
      
      <Router>
        {/* Header */}
        <Header />
        
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/CartPage" element={<CartPage />} />
            {/* Dynamic route */}
            <Route path="/products/:category/:id" element={<ProductRouter />} />
            <Route path="/ReturnsPolicy" element={<ReturnsPolicy />} />
            <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ConfirmOrder" element={<ConfirmOrder />} />
            <Route path="/Favorites" element={<Favorites />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/Laptops" element={<Laptops/>} />
            <Route path="/Accessories" element={<Accessories/>} />
            <Route path="/Checkout" element={<Checkout/>} />
            <Route path="/UserPage" element={<UserPage/>} />
            <Route path="/FAQPage" element={<FAQ/>} /> 
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />
            <Route path="/BlogPage" element={<BlogPage/>} /> 
            <Route path="/ShippingInfo" element={<ShippingInfo/>} /> 
            <Route path="/AboutUs" element={<AboutUs/>} /> 
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ShopContextProvider>
  );
}

export default App;

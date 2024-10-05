import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import NavBar from './components/NavBar';
import { ShopContextProvider } from './context/shop-context';

const HomePage = lazy(() => import('./pages/HomePage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const SignInForm = lazy(() => import('./pages/Sign-In'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const ReturnsPolicy = lazy(() => import('./pages/ReturnsPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const Checkout = lazy(() => import('./pages/checkout'));
const NotFound = lazy(() => import('./pages/NotFound')); // Lazy load the NotFound page

function App() {
  return (
    <ShopContextProvider>
      <Router>
        {/* Header */}
        <header className="shadow-md sticky top-0 z-50 bg-white flex justify-center">
          <NavBar />
        </header>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/products/:id" element={<ProductDetails />} /> {/* Dynamic route */}
            <Route path="/returns-policy" element={<ReturnsPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ShopContextProvider>
  );
}

export default App;

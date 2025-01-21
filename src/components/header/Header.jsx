import { useState, useEffect, useContext } from 'react';
import { ShoppingCart, Heart, Search, AlignJustify, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ShopContext } from '../../context/shop-context';
// , GoogleAuthProvider, signInWithPopup
// Components to be imported
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import List from './List';
import SearchForMobile from './searchForMobile';

// Logo to be imported
import newLogo from '../../images/newLogo.png';
import logoForMobile from '../../images/logoForMobile.png';

export default function Header() {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [Admin, setAdmin] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { cartItemCount, signInWithGoogle } = useContext(ShopContext);


    // Fetch the list of admin users in real-time
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'UserAdmin'), (snapshot) => {
            const adminData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAdmin(adminData);
        });
        return () => unsubscribe();
    }, []);

    // Track authentication state and check admin status
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                checkAdminStatus(currentUser.email);
            } else {
                setUser(null);
                setIsAdmin(false);
            }
        });
        return () => unsubscribe();
    }, [Admin]);

    // Check if the user is an admin
    const checkAdminStatus = (userEmail) => {
        const isAdminUser = Admin.some((admin) => admin.email === userEmail);
        setIsAdmin(isAdminUser);
    };

    const handleSignOut = async () => {
      if (window.confirm("Are you sure you want to sign out?")) {
          try {
              await signOut(auth);
              setUser(null);
              navigate('/');
              alert("You have signed out successfully!");
          } catch (error) {
              console.error("Error during sign-out:", error);
              alert("Failed to sign out. Please try again.");
          }
      }
    };
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo for Large screen */}
          <Link to="/" className="flex-shrink-0 max-sm:hidden">
            <img
              className="h-20 w-auto"
              src={newLogo}
              alt="Logo"
            />
          </Link>

          {/* Navigation */}
          <Navigation
            isShopDropdownOpen={isShopDropdownOpen}
            setIsShopDropdownOpen={setIsShopDropdownOpen}
          />

          {/* Actions */}
          <div className="flex items-center sm:space-x-4 max-sm:justify-between max-sm:w-full">
            {/* Search for large screen*/}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full max-sm:hidden"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            {/* favorites */}
            <Link to="/favorites" className="p-2 hover:bg-gray-100 rounded-full max-sm:hidden">
              <Heart className="w-5 h-5 text-gray-700" />
            </Link>

            {/* Shopping Cart */}
            <Link to="/CartPage" className="pr-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="w-5 h-5 text-gray-700 max-sm:w-4 max-sm:h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 right-1 bg-red-500 text-white text-[10px] w-3 h-3 max-sm:w-2 max-sm:h-2 max-sm:-top-1 max-sm:right-2 max-sm:text-[8px] rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )} 
            </Link>

            {/* Search for small screen */}
            <SearchForMobile/>

            {/* User Menu */}
            <UserMenu
              isAdmin={isAdmin}
              user={user}
              onSignOut={() => handleSignOut()}
              onDashboard={() => navigate('/dashboard')}
              onSignIn={signInWithGoogle}
            />

            <div className='flex items-center flex-shrink-0 space-x-1'>
              {/* Logo for small screen */}
              <Link to="/" className="sm:hidden ">
                <img
                  className="h-5 w-auto mr-1"
                  src={logoForMobile}
                  alt="Logo"
                />
              </Link>

              {/* List --- Menu */}
              <AlignJustify className='sm:hidden' onClick={()=>setIsListOpen((prev)=>!prev)}/>

              {/* To close List */}
              {isListOpen &&
                <button 
                  className="top-4 right-4 p-2 rounded-full bg-gray-100 z-50"
                  onClick={() => setIsListOpen(false)}
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
                }
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isListOpen && (
          <List
            isAdmin={isAdmin}
            user={user}
            onSignOut={() => handleSignOut()}
            signInWithGoogle={signInWithGoogle}
            isShopDropdownOpen={isShopDropdownOpen}
            setIsShopDropdownOpen={setIsShopDropdownOpen}
            setIsListOpen={setIsListOpen}
          />
        )}
      </div>

      {/* Search Modal */}
      <SearchBar
        isOpen={isSearchOpen}
        onOpen={() => setIsSearchOpen(true)}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}



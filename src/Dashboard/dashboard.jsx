// Dashboard.jsx
import AddProduct from './AddProduct';
import ProductManagement from './ProductManagement';
import AddAccessory from './addaccessory';
import LaptopAccessoriesManagement from './MangeAccessories';
import AddSlideImage from './addSlideImage';
import CouponManagement from './CouponManagement';
import ManageOrders from './manageOrders/manageOrders';

import { MangeSlideImage } from './MangeSlideImage';
import { AddUserAdmin } from './AddUserAdmin';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { 
  PackageSearch, 
  PackagePlus, 
  SquarePlus, 
  Gift, 
  Headphones,
  Tags,
  ShoppingCart,
  Users,
  Ticket,
  User, 
  Logs
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('ManageOrders');
  const [isOwner, setIsOwner] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  const ownerEmail = import.meta.env.VITE_OWNER_EMAIL;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'UserAdmin'), (snapshot) => {
      const AdminArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIsOwner(AdminArray.some(admin => admin.email === ownerEmail));
    });
    return () => unsubscribe();
  }, [ownerEmail]);

  const tabTitles = {
    ManageOrders: 'ManageOrders',
    addProduct: 'Add New Product',
    productManagement: 'Product Management',
    addaccessory: 'Add New Accessory',
    MangeAccessories: 'Accessory Management',
    addSlideImage: 'Add Promotion',
    MangeSlideImage: 'Promotion Management',
    AddUserAdmin: 'User Management'
  };

  const navItems = [
    {
      id: 'ManageOrders',
      label: 'Manage Orders',
      icon: <ShoppingCart className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'addProduct',
      label: 'Add Product',
      icon: <PackagePlus className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'productManagement',
      label: 'Manage Products',
      icon: <PackageSearch className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'addaccessory',
      label: 'Add Accessory',
      icon: <SquarePlus className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'MangeAccessories',
      label: 'Manage Accessories',
      icon: <Headphones className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'addSlideImage',
      label: 'Add Promotion',
      icon: <Gift className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'MangeSlideImage',
      label: 'Manage Promotions',
      icon: <Tags className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'CouponManagement',
      label: 'Coupon Management',
      icon: <Ticket className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'AddUserAdmin',
      label: 'User Management',
      icon: <Users className="w-5 h-5 text-blue-600" />,
      ownerOnly: true
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'ManageOrders':
        return <ManageOrders />;
      case 'addProduct':
        return <AddProduct />;
      case 'productManagement':
        return <ProductManagement />;
      case 'addaccessory':
        return <AddAccessory />;
      case 'MangeAccessories':
        return <LaptopAccessoriesManagement />;
      case 'addSlideImage':
        return <AddSlideImage />;
      case 'MangeSlideImage':
        return <MangeSlideImage />;
      case 'CouponManagement':
        return <CouponManagement />;
      case 'AddUserAdmin':
        return isOwner ? <AddUserAdmin /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative">

      {/* Sidebar in large screen*/}
      <div className="w-64 bg-white shadow-lg p-6 min-h-screen max-sm:hidden">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h3>
          <div className="mt-2 h-1 w-20 bg-blue-500 rounded-full"></div>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            if (item.ownerOnly && !isOwner) return null;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="w-full shadow-lg flex justify-between items-center absolute sm:hidden px-4 py-2">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Dashboard
          </h3>
          <div className="mt-1 h-1 w-16 bg-blue-500 rounded-full"></div>
        </div>
        <Logs onClick={()=> setIsListOpen(!isListOpen)}/>
      </div>

      {/* Sidebar in small screen*/}
      {isListOpen &&
        <div className="w-full bg-white shadow-lg p-6 min-h-screen sm:hidden absolute mt-14 z-50 -top-1">
          <nav className="space-y-1">
            {navItems.map((item) => {
              if (item.ownerOnly && !isOwner) return null;
              return (
                <button
                  key={item.id}
                  onClick={() => {setActiveTab(item.id); setIsListOpen(!isListOpen)} }
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      }
      
      {/* Main Content */}
      <main className="flex-1 p-8 max-sm:py-4 max-sm:px-0">
        {/* Dashboard Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 flex items-center justify-between max-sm:hidden">
          <h1 className="text-2xl font-semibold text-gray-800">
            {tabTitles[activeTab] || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-5 h-5" />
              <span className="text-sm">Admin</span>
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 max-sm:p-0 max-sm:mt-12">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}


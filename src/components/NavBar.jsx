import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 
import { useState , useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import logo from '../images/logo.png'

export default function NavBar() {

    const { filteredProducts } = useContext(ShopContext);
    const [searchTerm, setSearchTerm] = useState('');

    // Handle input change and trigger product filtering
    function handleInput(e) {
        const value = e.target.value;
        setSearchTerm(value);
        filteredProducts(value); 
    }

    function handleClick() {
        console.log("Search button clicked");
    }

    return (
        <nav className='h-16 flex justify-between items-center w-3/4 max-sm:w-full max-sm:mx-2'>
                <Link 
                    className='text-nowrap text-2xl px-2 py-2 font-bold transition duration-300 rounded-xl max-lg:text-xl max-sm:text-lg' 
                    to='/' 
                >
                    <img src={logo} alt="logo" className='h-20'/>
                </Link>
            <div className="relative w-1/2 max-md:w-1/3 max-lg:w-90 max-sm:w-1/2">
                <input 
                    value={searchTerm}
                    onChange={handleInput}
                    type="text" 
                    placeholder='Search for products or brands'
                    className="px-4 py-2 pl-10 w-full border border-gray-300 rounded-xl hover:bg-slate-200 duration-300 max-sm:text-sm"
                />
                <button onClick={handleClick}>
                    {<FontAwesomeIcon 
                    icon={faMagnifyingGlass} 
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                />}
                </button>
            </div>
            <div className='text-nowrap'>
                <Link 
                    className='text-nowrap mr-1 px-2 py-2 text-sky-600 font-bold ' 
                    to='/Sign-In'
                >
                    <FontAwesomeIcon icon={faUser} size="lg" className='max-sm:text-lg'/> <span className=' text-sm max-sm:hidden'>Sign In</span>                     
                </Link>
                <Link 
                        className='text-nowrap px-2 py-2 text-sky-600 font-bold ' 
                        to='/CartPage'
                    >
                        <FontAwesomeIcon icon={faCartShopping} size="lg" className='max-sm:text-lg'/> <span className='text-sm max-sm:hidden'>Cart</span>
                </Link>
            </div>
            
        </nav>
    );
}

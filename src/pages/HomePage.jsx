import { useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import { Product } from '../components/Product';
import Footer from '../components/Footer';
import SlideImages from '../components/SlideImages';



function HomePage() {

    const { filteredProductsList } = useContext(ShopContext); // Access filtered products from context

    return (
        <>

            <SlideImages/>
            
            <div className='w-[85%] mx-auto grid min-[450px]:w-[75%] sm:grid-cols-2 sm:w-[80%] lg:grid-cols-3 lg:w-[80%]'>
                {filteredProductsList.map((product) => (
                    <Product key={product.id} data={product} />
                ))}
            </div>

            <Footer/>
        </>
    )
}

export default HomePage





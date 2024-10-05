import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';



export default function Footer() {

    const [isColumn1Visible, setIsColumn1Visible] = useState(false);
    const [isColumn2Visible, setIsColumn2Visible] = useState(false);
    const [isColumn3Visible, setIsColumn3Visible] = useState(false);

    
    // eslint-disable-next-line react/prop-types
    function UlList({ children, isVisible }) {
        return (
            <ul className={`${isVisible ? 'max-[450px]:opacity-100' : 'max-[450px]:h-0 max-[450px]:opacity-0'}`}>
                {children}
            </ul>
        );
    }
    
    return (
        <footer className="bg-custom-purple text-white py-8 px-28 mt-24 max-xl:px-16 max-md:px-10 ">
            {/* Call support */}
            <div>
                <div className="flex items-center space-x-2 mb-4 border-b border-gray-700 pb-4 ">
                    <FontAwesomeIcon icon={faPhone} className="text-xl" />
                    <div>
                        <p className="font-semibold text-sm">Call support</p>
                        <p className="text-xs text-gray-400 hover:text-white cursor-pointer duration-300">015511</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-start gap-x-28 max-xl:gap-x-16 max-md:gap-x-16">
                {/* Column 1 */}
                <div className="mb-4 flex items-start justify-between max-[450px]:w-full max-[450px]:border-b border-gray-700 pb-4 ">
                    <div>
                        <h4 className="font-bold text-sm">LapZone warranty</h4>
                        <UlList isVisible={isColumn1Visible}>
                            <li><Link to="#" className="custom-text-class">Ultra</Link></li>
                            <li><Link to="#" className="custom-text-class">Ariston</Link></li>
                            <li><Link to="#" className="custom-text-class">Indesit</Link></li>
                            <li><Link to="#" className="custom-text-class">Babyliss</Link></li>
                            <li><Link to="#" className="custom-text-class">Miele</Link></li>
                        </UlList>
                    </div>
                    <button onClick={() => setIsColumn1Visible(!isColumn1Visible)}>
                        <FontAwesomeIcon icon={isColumn1Visible ? faAngleDown : faAngleUp} className="min-[450px]:hidden" />
                    </button>
                </div>
                {/* Column 2 */}
                <div className="mb-4 flex items-start justify-between max-[450px]:w-full max-[450px]:border-b border-gray-700 pb-4">
                    <div>
                        <h4 className="font-bold text-sm">LapZone services</h4>
                        <UlList isVisible={isColumn2Visible}>
                            <li><Link to="#" className="custom-text-class">Minicash</Link></li>
                            <li><Link to="#" className="custom-text-class">TECH CARE</Link></li>
                            <li><Link to="#" className="custom-text-class">LapZone Branches</Link></li>
                        </UlList>
                        <h4 className="font-bold text-sm mt-4">LapZone FAQs</h4>
                        <ul>
                            <li><Link to="#" className="custom-text-class">Returns FAQs</Link></li>
                        </ul>
                    </div>
                    <button onClick={() => setIsColumn2Visible(!isColumn2Visible)}>
                        <FontAwesomeIcon icon={isColumn2Visible ? faAngleDown : faAngleUp} className="min-[450px]:hidden" />
                    </button>
                </div>
                {/* Column 3 */}
                <div className="mb-4 flex items-start justify-between max-[450px]:w-full max-[450px]:border-b border-gray-700 pb-4">
                    <div>
                        <h4 className="font-bold text-sm">Trending now</h4>
                        <UlList isVisible={isColumn3Visible}>
                            <li><Link to="#" className="custom-text-class">Everyday Deals</Link></li>
                            <li><Link to="#" className="custom-text-class">Mobile</Link></li>
                            <li><Link to="#" className="custom-text-class">Braun offers</Link></li>
                            <li><Link to="#" className="custom-text-class">Accessories</Link></li>
                            <li><Link to="#" className="custom-text-class">Oppo</Link></li>
                            <li><Link to="#" className="custom-text-class">Samsung</Link></li>
                            <li><Link to="#" className="custom-text-class">Apple</Link></li>
                        </UlList> 
                    </div>
                    
                    <button onClick={() => setIsColumn3Visible(!isColumn3Visible)}>
                        <FontAwesomeIcon icon={isColumn3Visible ? faAngleDown : faAngleUp} className="min-[450px]:hidden" />
                    </button>
                </div>
                <div>
                    <p className='text-sm font-bold mb-4'>Connect with us</p>
                    <div className="flex justify-center items-center gap-5">
                        <a href="https://www.facebook.com/profile.php?id=100090664448464&locale" target='blank' className="text-white bg-blue-800 px-[4px] py-[2px] rounded-sm">
                        <FontAwesomeIcon icon={faFacebook} className='text-xl pt-1' />
                        </a>
                        <a href="#" className="text-white bg-gradient-to-r from-red-600 px-[5px] pt-1 to-yellow-600 rounded-sm">
                        <FontAwesomeIcon icon={faInstagram} className='text-xl' />
                        </a>
                        <a href="#" className="text-white bg-red-700 px-[5px] pt-1 rounded-sm">
                        <FontAwesomeIcon icon={faYoutube} className='text-xl' />
                        </a>  
                    </div>
                </div>
            </div>
            {/* Bottom section */}
            <div className="mt-4 border-t border-gray-700 pt-4 text-xs text-gray-400 leading-4">
                    <p>© LapZone for Trade and Distribution, all rights reserved. 
                    <Link to="/TermsAndConditions" 
                    className="hover:text-white cursor-pointer duration-300">  Terms & Conditions</Link> | 
                    <Link to="/ReturnsPolicy" 
                    className="hover:text-white cursor-pointer duration-300"> Returns Policy</Link></p>
            </div>
            
        </footer>
    );
}


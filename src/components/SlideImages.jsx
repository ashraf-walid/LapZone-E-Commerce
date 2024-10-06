
import { useState, useEffect, useCallback } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

import slider1 from '../images/slider1.jpg';
import slider2 from '../images/slider2.jpg';
import slider3 from '../images/slider3.jpg';
import slider4 from '../images/slider4.jpg';
import slider5 from '../images/slider5.jpg';
import slider6 from '../images/slider6.jpg';
import slider7 from '../images/slider7.jpg';
import slider8 from '../images/slider8.jpg';
import slider9 from '../images/slider9.jpg';
import slider10 from '../images/slider10.jpg';


// Right now, the length will stay the same unless you manually change the sliderImages array by adding or removing images.
export default function SlideImages() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const length = sliderImages.length;

        // Go to next slide
        const nextSlide = useCallback(() => {
            setCurrentIndex((currentIndex) => currentIndex === length - 1 ? 0 : currentIndex + 1);
        }, [length])
    
        // Go to previous slide
        const prevSlide = useCallback(() => {
            setCurrentIndex((currentIndex) => currentIndex === 0 ? length - 1 : currentIndex - 1);
        }, [length]);
    
        useEffect(() => {
            const interval = setInterval(() => { nextSlide(); }, 4000); 
            return () => clearInterval(interval); 
        }, [nextSlide]); 

        // Render slide indicators
        const renderIndicators = () => {
        return sliderImages.map((_, idx) => (
            <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className=
            {`cursor-pointer w-1 h-1 rounded-full mx-1 lg:w-2 lg:h-2 ${idx === currentIndex ? 'bg-gray-100' : 'bg-gray-400'}`}
            />
        ));
        };
    
        // you ensure the app doesn’t break when there’s no valid data.
        if (!Array.isArray(sliderImages) || sliderImages.length <= 0) {
        return null; 
        }
    
    return (


        <div className="relative w-[85%] h-64 mx-auto my-6 min-[450px]:w-[75%] min-[450px]:h-72 sm:w-[80%]">
            {/* Slider Images */}
            {sliderImages.map((slide, idx) => (
            <div
                className=
                {idx === currentIndex ? 'opacity-100 duration-500 ease-linear' : 'opacity-0'}
                key={idx}
            >
                {idx === currentIndex && (
                <img
                    loading="lazy"
                    src={slide.url}
                    alt={slide.alt}
                    className="w-full h-64 object-cover rounded-t-md min-[450px]:h-72"
                />
                )}
            </div>
            ))}
    
            {/* Left Arrow */}
            <FaArrowAltCircleLeft
            onClick={prevSlide}
            className="absolute top-1/2 left-2 text-xs text-white cursor-pointer transform -translate-y-1/2 lg:text-sm"
            />
    
            {/* Right Arrow */}
            <FaArrowAltCircleRight
            onClick={nextSlide}
            className="absolute top-1/2 right-2 text-xs text-white cursor-pointer transform -translate-y-1/2 lg:text-sm"
            />
    
            {/* Slide Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex">
            {renderIndicators()}
            </div>
        </div>
    );
}

// Sample images
const sliderImages = [
    { url: slider1, alt: 'Slide 1' },
    { url: slider2, alt: 'Slide 2' },
    { url: slider3, alt: 'Slide 3' },
    { url: slider4, alt: 'Slide 4' },
    { url: slider5, alt: 'Slide 5' },
    { url: slider6, alt: 'Slide 6' },
    { url: slider7, alt: 'Slide 7' },
    { url: slider8, alt: 'Slide 8' },
    { url: slider9, alt: 'Slide 9' },
    { url: slider10, alt: 'Slide 10' },

];
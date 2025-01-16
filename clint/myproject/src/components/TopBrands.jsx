import React from 'react'
import Slider from "react-slick";
import { top_brands } from './FakeProducts';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PrevArrow = ({ onClick }) => {
    return (
        <div className='flex'>
            <div onClick={onClick} className='absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer border-2 border-solid border-gray-200 rounded-full bg-white hover:bg-slate-200 flex items-center justify-center'>
                <ArrowLeft />
            </div>
        </div>
        // <div
        //     onClick={onClick}
        //     className="absolute left-0 top-1/2 z-10 transform translate-y-1/2 cursor-pointer border-2 border-solid border-gray-200 rounded-full bg-white hover:bg-slate-200 w-10 h-10"
        // >
        //     <ArrowLeft />
        // </div>
    )
}

const NextArrow = ({ onClick }) => {
    return (

        <div
            onClick={onClick}
            className='border-2 border-solid border-gray-200 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white  hover:bg-slate-200 flex items-center justify-center'
        >
            <ArrowRight />
        </div>

    )
}

const TopBrands = () => {

    var settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 4,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className='px-5 py-5'>
            <div className='px-3'>
                <h2 className='text-xl font-bold pb-5'>Top Brands</h2>
                <div className='relative'>
                    <Slider {...settings}>

                        {/* <PrevArrow /> */}
                        {top_brands.map((brand, index) => (
                            <div key={index} className='px-2 '>

                                <div className='w-full rounded-full bg-yellow-300 flex items-center justify-center p-5 relative'>
                                    <p>{brand}</p>
                                </div>
                                {/* <div>
                                <h3 className='text-center'>{(product.category).toLocaleUpperCase()}</h3>
                            </div> */}



                            </div>
                        ))}
                        {/* <NextArrow /> */}


                    </Slider>
                </div>
            </div>
        </div>

    )
}

export default TopBrands



import React from 'react'
import Slider from "react-slick";
import { fake_products } from './FakeProducts';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import RatingStar from './RatingStar';

// const slicing = (text, endingIndex) => {
//     const length = text.length;
//     if (length < endingIndex) {
//         return text
//     }
//     else {
//         return text.slice(0, endingIndex)
//     }
// }

const PrevArrow = ({ onClick }) => {
    return (
        <div className='flex'>
            <div onClick={onClick} className='absolute left-[-15px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer border-2 border-solid border-gray-200 rounded-full bg-white hover:bg-slate-200 flex items-center justify-center'>
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
            className='border-2 border-solid border-gray-200 rounded-full absolute right-[-15px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white  hover:bg-slate-200 flex items-center justify-center'
        >
            <ArrowRight />
        </div>

    )
}

const JustForYou = () => {

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
                <h2 className='text-xl font-bold pb-1'>Just For you !</h2>
                <div className='relative border-2 border-solid border-yellow-100 rounded-md'>
                    <Slider {...settings}>

                        {/* <PrevArrow /> */}
                        {fake_products.map((product, index) => (
                            <div key={index} className='px-2 '>
                                {/* image */}
                                <div className='w-full p-5'>
                                    <img src={product.image} alt={product.title} className='object-contain' style={{ aspectRatio: '1/1' }} />
                                </div>

                                <div className='text-left pb-2'>
                                    {/* Price */}
                                    <div className='pb-1'>
                                        <p className='bg-yellow-500 text-white rounded-lg inline p-1'>$ {product.price}</p>
                                    </div>
                                    {/* title */}
                                    <div className='pb-1'>
                                        {
                                            product.title.length < 25 ? (
                                                <div>
                                                    <p>{product.title}</p>
                                                    <p className='invisible'>...</p>
                                                </div>

                                            ) : (
                                                <p>{product.title.slice(0, 30)} ...</p>
                                            )
                                        }
                                    </div>
                                    {/* Rating Star */}
                                    <RatingStar rating={product?.rating?.rate} rating_count={product?.rating?.count} product_id={product.id} />

                                </div>





                            </div>
                        ))}
                        {/* <NextArrow /> */}


                    </Slider>
                </div>
            </div>
        </div>

    )
}

export default JustForYou



import React, { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { slider_img } from './SliderImg';



const SliderCompo = () => {
    const [activeSlide, setActiveSlide] = useState(0)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        className: "center",
        centerMode: true,
        centerPadding: "10%",
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        beforeChange: (current, next) => setActiveSlide(next),
        appendDots: dots => (
            <div
                className='absolute w-2/4'
                style={{
                    backgroundColor: "inherit",
                    bottom: "4px",
                }}
            >
                <ul style={{ margin: "auto", display: "flex", justifyContent: "center", color: "white" }}> {dots} </ul>
            </div>
        ),

        customPaging: i => (
            <div
                className='w-1.5 h-1.5 sm:w-2 sm:h-2 '
                style={{
                    borderRadius: "50%",
                    backgroundColor: i === activeSlide ? "white" : "#7f8079"  // Customize dot color
                }}
            />
        )
    };


    return (
        <div>
            <div className="slider-container w-full">
                <div className='py-10 w-full m-auto'>
                    <Slider {...settings} className='my-auto'>
                        {slider_img.map((x, i) => (


                            <div key={i} className={`px-2  ${activeSlide === i ? 'h-36 sm:h-48 md:h-56 lg:h-80' : 'h-32 sm:h-40 md:h-48 lg:h-72 py-2 sm:pt-4 md:py-4'}`}>
                                {/* py-5 */}
                                <div className={`bg-cover bg-center rounded-2xl w-full my-auto transition-all duration-300 ease-in-out
                            ${activeSlide === i ? 'h-36 sm:h-48 md:h-56 lg:h-80' : 'h-32 sm:h-40 md:h-48 lg:h-72'}`}
                                    style={{ backgroundImage: `url(${x.image})`, }}>
                                    <div style={{ height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                                        className={`relative rounded-2xl ${activeSlide === i ? 'h-36 sm:h-48 md:h-56 lg:h-80' : 'h-32 sm:h-40 md:h-48 lg:h-72'}`}>
                                        <div className="flex flex-wrap flex-col justify-center items-start px-10 py-5 h-full w-full">
                                            <div>
                                                <h2 className='text-white flex-initial font-semibold text-3xl md:text-6xl'>{x.title.toUpperCase()}</h2>
                                                {/* <h2 className='text-white'>50% Off On Al</h2> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        ))}
                    </Slider>

                </div>
            </div>
        </div>
    )
}

export default SliderCompo

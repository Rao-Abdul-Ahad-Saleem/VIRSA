import React, { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore'
import { ThreeCircles } from "react-loader-spinner"
import { Link } from 'react-router-dom';
const Products = () => {
    const { products, loading, fetchAllProducts } = useProductStore();

    useEffect(() => {
        fetchAllProducts();
        // console.log(products);
    }, [])

    return (
        <div className='flex flex-wrap'>
            {loading ? (
                <div className='h-96 min-w-full flex justify-center items-center'>
                    <ThreeCircles

                        visible={true}
                        height="100"
                        width="100"
                        color="#c29802"
                        ariaLabel="three-circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />

                </div>
            ) : (
                products.map((product, index) => (
                    <div className='lg:w-1/4 md:w-1/3 sm:w-1/2 xs:w-1/2 w-full p-4' key={index}>
                        <div className=''>
                            <Link to={`/productDetail/${product._id}`}>
                                <div className='w-full flex items-center' style={{ aspectRatio: '2/3' }}>

                                    <div>
                                        {/* <img src={product.images[0].url} className='object-contain object-center w-full h-full' alt={product.images[0].altText} /> */}
                                        <img
                                            src={product.images[0].url}
                                            className='object-contain object-center w-full h-full rounded-md '
                                            alt={product.images[0].altText}
                                        // style={ }
                                        />
                                    </div>

                                </div>

                                <div>
                                    <p className='text-xl px-1 text-left'>{(product.name).slice(0, 22)}...</p>
                                    <p className='text-lg px-1 font-semibold'>PKR {`${product.price}`}</p>
                                    <p className='text-sm px-1 font-light'>{(product.description).slice(0, 65)}...</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Products

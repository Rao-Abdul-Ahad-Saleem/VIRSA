import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import {
    HeartIcon,
    MinusIcon,
    PlusIcon,

} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom'
import { useProductStore } from '../stores/useProductStore'
import { ThreeCircles, TailSpin } from "react-loader-spinner"
import { Loader } from 'lucide-react'
import { useCartStore } from '../stores/useCartStore'

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

const productDummy = {
    name: 'Zip Tote Basket',
    price: '$140',
    rating: 4,
    images: [
        {
            id: 1,
            name: 'Angled view',
            src: 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694158321609-71pM0BQZLOL._SL1500_.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        // More images...
        {
            id: 2,
            name: 'Angled view',
            src: 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1694158452812-81QyE0wJFYL._SL1500_.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        // Add more images as you want 
    ],
    colors: [
        { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
        { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
        { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],
    description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
    details: [
        {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
        },
        // More sections...
        {
            name: 'Return Policy',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
        },
    ],
}
const relatedProducts = [
    {
        id: 1,
        name: 'Zip Tote Basket',
        color: 'White and black',
        href: '#',
        imageSrc: 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057718636-headphone5.jpg',
        imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
        price: '$140',
    },
    // More products...
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductDetailPage = () => {

    const [productData, setProductData] = useState(null);

    const { productColor, setProductColor } = useState(null);

    const { getSingleProduct, loading } = useProductStore();

    const { addToCart } = useCartStore();

    const handleAddToCart = async () => {
        await addToCart(productData);
    }

    const handleSubmit = async (e) => {
        e.prventDefault();
        if (productColor != null) {

        }

    }

    const { id } = useParams();

    const fetchData = async () => {
        const producti = await getSingleProduct(id);
        // console.log(producti);
        setProductData(producti)
    };

    useEffect(() => {
        // getSingleProduct(id).then(() => (setProductData(product))).then(() => console.log(product));
        fetchData()
    }, [id, getSingleProduct]);

    useEffect(() => {
        if (productData) {
            console.log(productData); // Log only when data is set
        }
    }, [productData]);




    const [selectedColor, setSelectedColor] = useState(productDummy.colors[0])

    return (
        <div>
            {productData == null ?
                (
                    <div className='h-96 min-w-full flex justify-center items-center'>
                        {/* <ThreeCircles

                            visible={true}

                            height="100"
                            width="100"
                            color="#c29802"
                            ariaLabel="three-circles-loading"
                            wrapperStyle={{

                            }}
                            wrapperClass=""
                        /> */}

                        {/* This loader is not rotating. Try Lucide Loader */}

                        <Loader className='animate-spin h-32 w-32 text-2xl text-yellow-600' />



                    </div>
                ) : (
                    <div className="bg-white">

                        <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:max-w-none">
                                {/* productDummy*/}
                                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                                    {/* Image gallery */}
                                    <Tab.Group as="div" className="flex flex-col-reverse p-2">
                                        {/* Image selector */}
                                        <div className="mx-auto mt-6  w-full max-w-2xl  lg:max-w-none">
                                            <Tab.List className="grid grid-cols-4 gap-6">
                                                {productData.images.map((image) => (
                                                    <Tab
                                                        key={image._id}
                                                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span className="sr-only">{image.altText}</span>
                                                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                                                    <img src={image.url} alt={image.altText} className="w-full object-cover object-center" />
                                                                </span>
                                                                <span
                                                                    className={classNames(
                                                                        selected ? 'ring-indigo-500' : 'ring-transparent',
                                                                        'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            </>
                                                        )}
                                                    </Tab>
                                                ))}
                                            </Tab.List>
                                        </div>
                                        {/* aspect-w-1 : Adding this in below class make other images of produt move more below */}
                                        <Tab.Panels className="w-full border border-gray-200">
                                            {productData.images.map((image) => (
                                                <Tab.Panel key={image._id}>
                                                    <img
                                                        src={image.url}
                                                        alt={image.altText}
                                                        className="w-full h-full object-contain object-center sm:rounded-lg"

                                                    />
                                                </Tab.Panel>
                                            ))}
                                        </Tab.Panels>
                                    </Tab.Group>

                                    {/* Product info */}
                                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{productData.name}</h1>

                                        <div className="mt-3">
                                            <h2 className="sr-only">Product Price</h2>
                                            <p className="text-3xl tracking-tight text-gray-900">PKR {productData.price}</p>
                                        </div>

                                        {/* Reviews */}
                                        {/* Not yet functional */}
                                        <div className="mt-3">
                                            <h3 className="sr-only">Reviews</h3>
                                            <div className="flex items-center">
                                                <div className="flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                productDummy.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                                                                'h-5 w-5 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                                <p className="sr-only">{productDummy.rating} out of 5 stars</p>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="sr-only">Description</h3>

                                            <p className="space-y-6 text-base text-gray-700">
                                                {productData.description}
                                            </p>
                                        </div>

                                        {/* <form className="mt-6">
                                            Colors
                                            <div>
                                                {productData.colors.length == 0 ? (
                                                    <p></p>
                                                ) : (
                                                    <div>
                                                        <h3 className="text-sm text-gray-600">Color</h3>

                                                        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                                                            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                                            <div className="flex items-center space-x-3">
                                                                {productDummy.colors.map((color) => (
                                                                    <RadioGroup.Option
                                                                        key={color.name}
                                                                        value={color}
                                                                        className={({ active, checked }) =>
                                                                            classNames(
                                                                                color.selectedColor,
                                                                                active && checked ? 'ring ring-offset-1' : '',
                                                                                !active && checked ? 'ring-2' : '',
                                                                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                                            )
                                                                        }
                                                                    >
                                                                        <RadioGroup.Label as="span" className="sr-only">
                                                                            {color.name}
                                                                        </RadioGroup.Label>
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className={classNames(
                                                                                color.bgColor,
                                                                                'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                                            )}
                                                                        />
                                                                    </RadioGroup.Option>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-10 flex">
                                                Shopping bag / Add to Cart
                                                <button
                                                    type="submit"
                                                    onClick={handleAddToCart}
                                                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                                >
                                                    Add to bag
                                                </button>
                                                Add to favorities
                                                <button
                                                    type="button"
                                                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                                >
                                                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                                    <span className="sr-only">Add to favorites</span>
                                                </button>
                                            </div>
                                        </form> */}

                                        <div className="mt-10 flex">
                                            {/* Shopping bag / Add to Cart */}
                                            <button
                                                type="submit"
                                                onClick={handleAddToCart}
                                                className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                            >
                                                Add to bag
                                            </button>
                                            {/* Add to favorities */}
                                            <button
                                                type="button"
                                                className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                            >
                                                <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                                <span className="sr-only">Add to favorites</span>
                                            </button>
                                        </div>

                                        {/* What is this section for ?? */}
                                        <section aria-labelledby="details-heading" className="mt-12">
                                            <h2 id="details-heading" className="sr-only">
                                                Additional details
                                            </h2>

                                            {/* <div className="divide-y divide-gray-200 border-t">
                                                {productDummy.details.map((detail) => (
                                                    <Disclosure as="div" key={detail.name}>
                                                        {({ open }) => (
                                                            <>
                                                                <h3>
                                                                    <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                                                        <span
                                                                            className={classNames(
                                                                                open ? 'text-indigo-600' : 'text-gray-900',
                                                                                'text-sm font-medium'
                                                                            )}
                                                                        >
                                                                            {detail.name}
                                                                        </span>
                                                                        <span className="ml-6 flex items-center">
                                                                            {open ? (
                                                                                <MinusIcon
                                                                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            ) : (
                                                                                <PlusIcon
                                                                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            )}
                                                                        </span>
                                                                    </Disclosure.Button>
                                                                </h3>
                                                                <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                                                                    <ul role="list">
                                                                        {detail.items.map((item) => (
                                                                            <li key={item}>{item}</li>
                                                                        ))}
                                                                    </ul>
                                                                </Disclosure.Panel>
                                                            </>
                                                        )}
                                                    </Disclosure>


                                                ))}
                                            </div> */}

                                            <div className="divide-y divide-gray-200 border-t">
                                                {/* here we gonna show featues with the help of <Disclouser></Disclouser> */}
                                                <Disclosure as='div' key='Features'>
                                                    {({ open }) => (
                                                        <>
                                                            <h3>
                                                                <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                                                    <span
                                                                        className={classNames(
                                                                            open ? 'text-indigo-600' : 'text-gray-900',
                                                                            'text-sm font-medium'
                                                                        )}
                                                                    >
                                                                        Features
                                                                    </span>
                                                                    <span className="ml-6 flex items-center">
                                                                        {open ? (
                                                                            <MinusIcon
                                                                                className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <PlusIcon
                                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                                aria-hidden="true"
                                                                            />
                                                                        )}
                                                                    </span>
                                                                </Disclosure.Button>
                                                            </h3>
                                                            <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                                                                <ul role="list">
                                                                    {productData?.features.map((item) => (
                                                                        <li key={item}>{item}</li>
                                                                    ))}
                                                                </ul>
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}


                                                </Disclosure>

                                                {/* Instructions */}
                                                <Disclosure as='div' key='Instructions'>
                                                    {({ open }) => (
                                                        <>
                                                            <h3>
                                                                <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                                                    <span
                                                                        className={classNames(
                                                                            open ? 'text-indigo-600' : 'text-gray-900',
                                                                            'text-sm font-medium'
                                                                        )}
                                                                    >
                                                                        Instruction
                                                                    </span>
                                                                    <span className="ml-6 flex items-center">
                                                                        {open ? (
                                                                            <MinusIcon
                                                                                className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <PlusIcon
                                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                                aria-hidden="true"
                                                                            />
                                                                        )}
                                                                    </span>
                                                                </Disclosure.Button>
                                                            </h3>
                                                            <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                                                                <ul role="list">
                                                                    {productData?.instructions.map((item) => (
                                                                        <li key={item}>{item}</li>
                                                                    ))}
                                                                </ul>
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}


                                                </Disclosure>
                                            </div>
                                        </section>
                                    </div>
                                </div>

                                {/* <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
                                    <h2 id="related-heading" className="text-xl font-bold text-gray-900">
                                        Customers also bought
                                    </h2>

                                    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                                        {relatedProducts.map((product) => (
                                            <div key={product.id}>
                                                <div className="relative">
                                                    <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                                        <img
                                                            src={product.imageSrc}
                                                            alt={product.imageAlt}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>
                                                    <div className="relative mt-4">
                                                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                    </div>
                                                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                                        <div
                                                            aria-hidden="true"
                                                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                                        />
                                                        <p className="relative text-lg font-semibold text-white">{product.price}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-6">
                                                    <a
                                                        href={product.href}
                                                        className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                                                    >
                                                        Add to bag<span className="sr-only">, {product.name}</span>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section> */}
                            </div>
                        </main>


                    </div>

                )}
        </div>
    )
}

export default ProductDetailPage

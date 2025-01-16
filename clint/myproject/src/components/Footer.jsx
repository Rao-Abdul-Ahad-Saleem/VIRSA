import React from 'react'
import { Link } from 'react-router-dom'


const footerNavigation = {
    // products: [
    //     { name: 'Bags', to: '#' },
    //     { name: 'Tees', to: '#' },
    //     { name: 'Objects', to: '#' },
    //     { name: 'Home Goods', to: '#' },
    //     { name: 'Accessories', to: '#' },
    // ],
    // I have commented the products section yet

    seller: [
        { name: 'Sell Products On Virsa', to: '/sellerCentral' },
    ],
    company: [
        { name: 'Who we are', to: '#' },
        { name: 'Sustainability', to: '#' },
        { name: 'Press', to: '#' },
        { name: 'Careers', to: '#' },
        { name: 'Terms & Conditions', to: '#' },
        { name: 'Privacy', to: '#' },
    ],
    customerService: [
        { name: 'Contact', to: '#' },
        { name: 'Shipping', to: '#' },
        { name: 'Returns', to: '#' },
        { name: 'Warranty', to: '#' },
        { name: 'Secure Payments', to: '#' },
        { name: 'FAQ', to: '#' },
        { name: 'Find a store', to: '#' },
    ],
}

const Footer = () => {
    return (
        <div className='pt-20'>
            <footer aria-labelledby="footer-heading" className="bg-yellow-100">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-gray-200 py-10">
                        <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
                            {/* Image section */}
                            <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
                                <img
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                    className="h-8 w-auto"
                                />
                            </div>

                            {/* Sitemap sections */}
                            <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
                                <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                                    {/* <div>
                                        <h3 className="text-sm font-medium text-gray-900">Make Money With Us</h3>
                                        <ul role="list" className="mt-6 space-y-6">
                                            {footerNavigation.products.map((item) => (
                                                <li key={item.name} className="text-sm">
                                                    <Link to={item.to} className="text-gray-500 hover:text-gray-600">
                                                        {item.name}
                                                    >
                                                    <Link/>
                                                </li>
                                            ))}
                                        </ul>
                                    </div> */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Company</h3>
                                        <ul role="list" className="mt-6 space-y-6">
                                            {footerNavigation.company.map((item) => (
                                                <li key={item.name} className="text-sm">
                                                    <Link to={item.to} className="text-gray-500 hover:text-gray-600">
                                                        {item.name}

                                                    </Link>

                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Make Money With Us</h3>
                                        <ul role="list" className="mt-6 space-y-6">
                                            {footerNavigation.seller.map((item) => (
                                                <li key={item.name} className="text-sm">
                                                    <Link to={item.to} className="text-gray-500 hover:text-gray-600">
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.customerService.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <Link to={item.to} className="text-gray-500 hover:text-gray-600">
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>


                            </div>

                            {/* Newsletter section */}
                            <div className="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
                                <h3 className="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
                                <p className="mt-6 text-sm text-gray-500">The latest deals and savings, sent to your inbox weekly.</p>
                                <form className="mt-2 flex sm:max-w-md">
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email-address"
                                        type="text"
                                        autoComplete="email"
                                        required
                                        className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                    <div className="ml-4 flex-shrink-0">
                                        <button
                                            type="submit"
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 py-10 text-center ">
                        <p className="text-sm text-gray-500">&copy; 2021 Your Company, Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer

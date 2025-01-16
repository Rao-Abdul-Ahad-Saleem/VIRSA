import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Search } from 'lucide-react';
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    UserIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'
import LoginWarn from './LoginWarn'
import { useCartStore } from '../stores/useCartStore';


const navigation = {


    categories: [

        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'Accessories',
                    href: '#',
                    imageSrc: 'https://avatars.mds.yandex.net/i?id=759c75b9c0d2cc4fa91f90d6ea1ed1f1317ebad7-10027404-images-thumbs&n=13',
                    imageAlt:
                        'Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters.',
                },
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://avatars.mds.yandex.net/i?id=74bcff98b4a9b5ce74100a8898bf77850f5a4b1b-7716430-images-thumbs&n=13',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'FLash Sale',
                    href: '#',
                    imageSrc: 'https://avatars.mds.yandex.net/i?id=3a32ae08d5b7982b714f2471affe76c9ff6549d9a08945a9-3493926-images-thumbs&n=13',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                [
                    {
                        id: 'shoes',
                        name: 'Shoes & Accessories',
                        items: [
                            { name: 'Sneakers', href: '#' },
                            { name: 'Boots', href: '#' },
                            { name: 'Sandals', href: '#' },
                            { name: 'Socks', href: '#' },
                        ],
                    },
                    {
                        id: 'collection',
                        name: 'Shop Collection',
                        items: [
                            { name: 'Everything', href: '#' },
                            { name: 'Core', href: '#' },
                            { name: 'New Arrivals', href: '#' },
                            { name: 'Sale', href: '#' },
                        ],
                    },
                ],
                [
                    {
                        id: 'clothing',
                        name: 'All Clothing',
                        items: [
                            { name: 'Basic Tees', href: '#' },
                            { name: 'Artwork Tees', href: '#' },
                            { name: 'Pants', href: '#' },
                            { name: 'Hoodies', href: '#' },
                            { name: 'Swimsuits', href: '#' },
                        ],
                    },
                    {
                        id: 'accessories',
                        name: 'All Accessories',
                        items: [
                            { name: 'Watches', href: '#' },
                            { name: 'Wallets', href: '#' },
                            { name: 'Bags', href: '#' },
                            { name: 'Sunglasses', href: '#' },
                            { name: 'Hats', href: '#' },
                            { name: 'Belts', href: '#' },
                        ],
                    },
                ],
                [
                    {
                        id: 'brands',
                        name: 'Brands',
                        items: [
                            { name: 'Re-Arranged', href: '#' },
                            { name: 'Counterfeit', href: '#' },
                            { name: 'Full Nelson', href: '#' },
                            { name: 'My Way', href: '#' },
                        ],
                    },
                ],
            ],
        },

        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    // new arrival image
                    imageSrc: 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692941008275-headphone3.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691056487173-headphon2.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
                {
                    name: 'Accessories',
                    href: '#',
                    imageSrc: 'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1691057474498-earphone.jpg',
                    imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
                },
            ],
            sections: [
                [
                    {
                        id: 'shoes',
                        name: 'Shoes & Accessories',
                        items: [
                            { name: 'Sneakers', href: '#' },
                            { name: 'Boots', href: '#' },
                            { name: 'Flats', href: '#' },
                            { name: 'Sandals', href: '#' },
                            { name: 'Heels', href: '#' },
                            { name: 'Socks', href: '#' },
                        ],
                    },
                    {
                        id: 'collection',
                        name: 'Shop Collection',
                        items: [
                            { name: 'Everything', href: '#' },
                            { name: 'Core', href: '#' },
                            { name: 'New Arrivals', href: '#' },
                            { name: 'Sale', href: '#' },
                            { name: 'Accessories', href: '#' },
                        ],
                    },
                ],
                [
                    {
                        id: 'clothing',
                        name: 'All Clothing',
                        items: [
                            { name: 'Basic Tees', href: '#' },
                            { name: 'Artwork Tees', href: '#' },
                            { name: 'Tops', href: '#' },
                            { name: 'Bottoms', href: '#' },
                            { name: 'Swimwear', href: '#' },
                            { name: 'Underwear', href: '#' },
                        ],
                    },
                    {
                        id: 'accessories',
                        name: 'All Accessories',
                        items: [
                            { name: 'Watches', href: '#' },
                            { name: 'Wallets', href: '#' },
                            { name: 'Bags', href: '#' },
                            { name: 'Sunglasses', href: '#' },
                            { name: 'Hats', href: '#' },
                            { name: 'Belts', href: '#' },
                        ],
                    },
                ],
                [
                    {
                        id: 'brands',
                        name: 'Brands',
                        items: [
                            { name: 'Full Nelson', href: '#' },
                            { name: 'My Way', href: '#' },
                            { name: 'Re-Arranged', href: '#' },
                            { name: 'Counterfeit', href: '#' },
                            { name: 'Significant Other', href: '#' },
                        ],
                    },
                ],
            ],
        },
    ],
    pages: [
        { name: 'Products', to: '/product' },
        { name: 'Create Product', to: 'createProduct', role: 'seller' },
        { name: 'Create Shop', to: 'createShop', role: "seller" },
    ],


}



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    // const { user } = useUserStore();
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const { user, logout, userRole } = useUserStore();
    const { cart } = useCartStore();

    const accessiblePages = navigation.pages.filter((page) => !page.role || page.role == userRole)
    // console.log(accessiblePages);

    const navigate = useNavigate()
    const LogingOut = () => {
        logout();
        navigate('/');

    }

    return (
        <div className="bg-white">
            {/* Transition Root for overall transition (animations) for the mobile manu apparance*/}
            <Transition.Root show={open} as={Fragment}>

                {/* Act as overall model container for mobile app here */}
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    {/* This Transition.Child component manages the animation for the black background overlay */}
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />

                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        {/* This Transition.Child component manages the animation for the menu panel itself */}
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                {/* Dialog Pannel heree defines the content area of the dialog. It's the container for everything that appears within the modal window */}
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {/* Mapping pages here */}
                                    {accessiblePages?.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <Link to={page.to} className="-m-2 block p-2 font-medium text-gray-900">
                                                {page.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                {/* Links */}

                                <Tab.Group as="div" className="mt-2">
                                    {/* Tap.Group Provides a container for the tab-based navigation */}
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex space-x-8 px-4">
                                            {/* Tab.List defines a list of tabs as navigation elements. It contains the labels or titles for each tab or navbar elements */}
                                            {navigation.categories.map((category) => (
                                                <Tab
                                                    // The Tab component receives a function for the className prop, and this function receives an argument object containing selected as a property.
                                                    // selected is a boolean value that is true when the Tab is currently active (i.e., selected by the user) and false for all other tabs.
                                                    // The @headlessui/react package provides this selected value as part of its API to help you style the active tab differently from the inactive ones.
                                                    key={category.name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                            'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map((category) => (
                                            <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                                                <div className="space-y-4">
                                                    {category.featured.map((item, itemIdx) => (
                                                        <div
                                                            key={itemIdx}
                                                            className="group aspect-h-1 aspect-w-1 relative overflow-hidden rounded-md bg-gray-100"
                                                        >
                                                            <img
                                                                src={item.imageSrc}
                                                                alt={item.imageAlt}
                                                                className="object-cover object-center group-hover:opacity-75"
                                                            />
                                                            <div className="flex flex-col justify-end">
                                                                <div className="bg-white bg-opacity-60 p-4 text-base sm:text-sm">
                                                                    <a href={item.href} className="font-medium text-gray-900">
                                                                        <span className="absolute inset-0" aria-hidden="true" />
                                                                        {item.name}
                                                                    </a>
                                                                    <p aria-hidden="true" className="mt-0.5 text-gray-700 sm:mt-1">
                                                                        Shop now
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {/*  */}
                                                {category.sections.map((column, columnIdx) => (
                                                    <div key={columnIdx} className="space-y-10">
                                                        {column.map((section) => (
                                                            <div key={section.name}>
                                                                <p
                                                                    id={`${category.id}-${section.id}-heading-mobile`}
                                                                    className="font-medium text-gray-900"
                                                                >
                                                                    {section.name}
                                                                </p>
                                                                <ul
                                                                    role="list"
                                                                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                                    className="mt-6 flex flex-col space-y-6"
                                                                >
                                                                    {section.items.map((item) => (
                                                                        <li key={item.name} className="flow-root">
                                                                            <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                                                                {item.name}
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>

                                {/* This div shows the pages but under the categories  */}
                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {/* Mapping pages here */}
                                    {/* {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <Link to={page.to} className="-m-2 block p-2 font-medium text-gray-900">
                                                {page.name}
                                            </Link>
                                        </div>
                                    ))} */}
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6">
                                    <a href="" className="-m-2 flex items-center p-2">
                                        <img
                                            src="https://tailwindui.com/img/flags/flag-canada.svg"
                                            alt=""
                                            className="block h-auto w-5 flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                                        <span className="sr-only">, change currency</span>
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <header className="relative bg-white">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center lg:hidden">
                                <button
                                    type="button"
                                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>


                                {/* Search Bar */}
                                {/* <div className='relative'>
                                    <input
                                        type="text"
                                        placeholder='Search...'
                                        className={`transition-all duration-300 ease-in-out ${expanded ? 'w-64 opacity-100' : 'w-0 opacity-0'}
                                        p-2 rounded-full bg-gray-700 text-white focus:outline-none`}
                                    />
                                    <button
                                        onClick={() => setExpanded(!expanded)}
                                        className='absolute top-0 left-0 px-3 rounded-full focus:outline-none'
                                    >
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div> */}
                                {/* <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                </a> */}


                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:block lg:flex-1 lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open ? 'text-indigo-600' : 'text-gray-700 hover:text-gray-800',
                                                                'relative z-10 flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out'
                                                            )}
                                                        >
                                                            {category.name}
                                                            <span
                                                                className={classNames(
                                                                    open ? 'bg-indigo-600' : '',
                                                                    'absolute inset-x-0 bottom-0 h-0.5 transition-colors duration-200 ease-out sm:mt-5 sm:translate-y-px sm:transform'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel className="absolute inset-x-0 top-full z-10">
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                            <div className="relative bg-white">
                                                                <div className="mx-auto max-w-7xl px-8">
                                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                        <div className="grid grid-cols-2 grid-rows-1 gap-8 text-sm">
                                                                            {category.featured.map((item, itemIdx) => (
                                                                                <div
                                                                                    key={item.name}
                                                                                    className={classNames(
                                                                                        itemIdx === 0 ? 'aspect-w-2 col-span-2' : '',
                                                                                        'group aspect-w-1 aspect-h-1 relative overflow-hidden rounded-md bg-gray-100'
                                                                                    )}
                                                                                >
                                                                                    <img
                                                                                        src={item.imageSrc}
                                                                                        alt={item.imageAlt}
                                                                                        className="object-cover object-center group-hover:opacity-75 group-hover:transition group-hover:duration-100 ease-in-out"
                                                                                    />
                                                                                    <div className="flex flex-col justify-end">
                                                                                        <div className="bg-white bg-opacity-60 p-4 text-sm">
                                                                                            <a href={item.href} className="font-medium text-gray-900">
                                                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                                                {item.name}
                                                                                            </a>
                                                                                            <p aria-hidden="true" className="mt-0.5 text-gray-700 sm:mt-1">
                                                                                                Shop now
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="grid grid-cols-3 gap-x-8 gap-y-10 text-sm text-gray-500">
                                                                            {category.sections.map((column, columnIdx) => (
                                                                                <div key={columnIdx} className="space-y-10">
                                                                                    {column.map((section) => (
                                                                                        <div key={section.name}>
                                                                                            <p
                                                                                                id={`${category.id}-${section.id}-heading`}
                                                                                                className="font-medium text-gray-900"
                                                                                            >
                                                                                                {section.name}
                                                                                            </p>
                                                                                            <ul
                                                                                                role="list"
                                                                                                aria-labelledby={`${category.id}-${section.id}-heading`}
                                                                                                className="mt-4 space-y-4"
                                                                                            >
                                                                                                {section.items.map((item) => (
                                                                                                    <li key={item.name} className="flex">
                                                                                                        <a href={item.href} className="hover:text-gray-800">
                                                                                                            {item.name}
                                                                                                        </a>
                                                                                                    </li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {accessiblePages.map((page) => (
                                        <Link
                                            key={page.name}
                                            to={page.to}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </Popover.Group>

                            {/* Logo */}
                            {/* <a href="#" className="flex">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://rivaj-uk.com/cdn/shop/files/logo-01-8.svg?v=1710403052&width=300"
                                    alt=""
                                /
                            </a> */}
                            <Link to="/Home" className='text-2xl font-bold text-yellow-600'>Virsa</Link>

                            <div className="flex flex-1 items-center justify-end relative">

                                {/* Select country */}
                                {/* <a href="#" className="hidden text-gray-700 hover:text-gray-800 lg:flex lg:items-center">
                                    <img
                                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                                        alt=""
                                        className="block h-auto w-5 flex-shrink-0"
                                    />
                                    <span className="ml-3 block text-sm font-medium">CAD</span>
                                    <span className="sr-only">, change currency</span>
                                </a> */}


                                {/* Search */}
                                {/* <button className="ml-6 hidden p-2 text-gray-400 hover:text-gray-500 lg:block">
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                </button> */}

                                {/* <div>
                                    <input
                                        type="text"
                                        placeholder='Search...'
                                        className={`transition-all duration-300 ease-in-out ${expanded ? 'w-full opacity-100' : 'w-0 opacity-0'}
                                        p-2 rounded-full bg-gray-700 text-white focus:outline-none`}
                                    />
                                    <button
                                        onClick={() => setExpanded(!expanded)}
                                        className='absolute hidden lg:block ml-6 p-2 text-gray-400 hover:text-gray-500 rounded-full focus:outline-none'
                                    >
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div> */}

                                {/* Show Drawer */}
                                {/* <div><LoginWarn /></div> */}


                                {/* Account */}

                                {user ? (
                                    <button className='py-2 px-5 me-2 mb-2 text-md font-medium text-gray-200 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                                        onClick={LogingOut}
                                    >
                                        LogOut
                                    </button>
                                ) : (
                                    <Link to={'/'} className="p-2 text-gray-400 hover:text-gray-500 lg:ml-4">
                                        <span className="sr-only">Account</span>
                                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                                    </Link>
                                )}



                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link to="/CartPage" className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart.length}</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seach Bar */}
                    <div >
                        <div className="flex w-full sm:w-full md:h-2/4 mx-auto mt-2 border border-yellow-400 rounded-md shadow-sm mb-2">
                            <input className="w-full py-2 rounded-md border-none focus:outline-none focus:ring-0" type="search" placeholder="Search" />
                            <button className="px-4 text-gray-700 bg-yellow-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-0">
                                <Search className='text-grey-400' />
                            </button>
                        </div>
                    </div>

                </nav>
            </header>

        </div>
    )
}

export default Navbar

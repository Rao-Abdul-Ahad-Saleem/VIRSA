import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, UserPlus } from 'lucide-react'

const NavbarRivaj = () => {
    const skinCare = [
        "Face Serum",
        "Sun Block",
        "Face Wash",
        "Cleanser",
        "Facial Range",
        "Mask",
        "Gel, Cream",
        "Lotion, Oil",
        "Wax, Strips",
        "Beauty Soaps"
    ]

    const hairCare = [
        "Developer / Blonder",
        "Hair Color",
        "Hair Serum",
        "Hair Fabrics",
        "Hair Oil",
        "Hair Spray",
    ]

    return (
        <div>
            <div className='top-0 left-0 w-full opacity-90 shadow-lg z-40 '>
                {/* first navbar */}
                <div className='flex flex-wrap justify-between items-center px-5 py-4'>
                    {/* Search Input  */}
                    <div className='flex items-center' style={{ border: 'black solid 1px' }}>
                        <div className='px-2'>
                            <input type="text" placeholder='Search...' id='search' className='text-lg outline-0' />
                        </div>
                        <button className='px-1 h-full text-2xl text-white' style={{ backgroundColor: 'rgb(139,0,81)' }}>%</button>
                    </div>


                    {/* Rivaj Icon */}
                    <div>
                        <Link to=''><img src='https://rivaj-uk.com/cdn/shop/files/logo-01-8.svg?v=1710403052&width=300' className='w-3/5 object-contain' /></Link>
                    </div>

                    {/* Login & Cart */}
                    <div className='flex items-center'>
                        <Link to='/product' className='mx-2 '><ShoppingCart /></Link>
                        <Link to='/registration' className='mx-2'><UserPlus /></Link>
                    </div>
                </div>
                {/* first Navba rdone */}

                {/* Second Navbar */}

                <div style={{ backgroundColor: "rgb(139,0,81)" }}>
                    <div className='flex justify-center items-center relative py-1'>
                        {/* First Item */}
                        <div className=' group px-4'>
                            {/* navbar item name div */}
                            <div className='transition-all ease-out duration-300  text-white py-1'>
                                <Link to="">Summer Clearence Sale</Link>
                            </div>
                            {/* div of underline on hover */}
                            <div className='hidden group-hover:block w-full h-0.5 bg-white'></div>
                            {/* div to show hover content */}
                            <div className='hidden group-hover:block absolute pl-2 py-3 shadow-lg w-1/5 '>
                                <ul>

                                    <li className='py-1'><Link>Makeup</Link></li>
                                    <li className='py-1'><Link>Skin Care</Link></li>
                                    <li className='py-1'><Link>Hair Care</Link></li>
                                    <li className='py-1'><Link>Personal Care</Link></li>
                                    <li className='py-1'><Link>Fragrances</Link></li>
                                    <li className='py-1 '><Link>Accessories</Link></li>

                                </ul>
                            </div>
                        </div>

                        {/* 2nd Item */}
                        <div className='group px-4'>
                            <div className='transition-all ease-out duration-300 text-white py-1'>
                                <Link to=''>Rivaj HD</Link>
                            </div>
                            {/* div of underline on hover */}
                            <div className='hidden group-hover:block w-full h-0.5 bg-white'></div>
                            {/* div to show hover content */}
                            <div className='hidden group-hover:block absolute left-0 pl-2 py-3 shadow-lg w-full h-80 overflow-auto'>
                                <div className='text-2xl font-semibold py-5'>RIVAJ HD</div>
                                <div className='flex'>
                                    {/* 1st Column */}
                                    <div className='w-1/3'>
                                        <p className='font-bold text-sm pb-2'>FACE</p>
                                        <div>
                                            <ul>

                                                <li className='py-1'><Link>Primer</Link></li>
                                                <li className='py-1'><Link>Foundation</Link></li>
                                                <li className='py-1'><Link>Makeup Remover</Link></li>
                                                <li className='py-1'><Link>Powder</Link></li>
                                                <li className='py-1'><Link>Contour</Link></li>
                                                <li className='py-1'><Link>Makeup Fixer</Link></li>
                                                <li className='py-1'><Link>Makeup Brush</Link></li>
                                                <li className='py-1'><Link>Accessories</Link></li>

                                            </ul>
                                        </div>

                                    </div>

                                    {/* 2st Column */}
                                    <div className='w-1/3'>
                                        <p className='font-bold text-sm pb-2'>EYES</p>
                                        <div>
                                            <ul>

                                                <li className='py-1'><Link>Eye Lashes</Link></li>
                                                <li className='py-1'><Link>Eye Shadow</Link></li>
                                                <li className='py-1'><Link>Maskara</Link></li>
                                                <li className='py-1'><Link>Eye Liner</Link></li>
                                                <li className='py-1'><Link>Makeup Remover</Link></li>

                                            </ul>
                                        </div>

                                    </div>

                                    {/* 3rd Column */}
                                    <div className='w-1/3'>
                                        <p className='font-bold text-sm pb-2'>LIPS</p>
                                        <div>
                                            <ul>

                                                <li className='py-1'><Link>Lipstick</Link></li>
                                                <li className='py-1'><Link>Lip Gloss</Link></li>
                                                <li className='py-1'><Link>Makeup Remover</Link></li>

                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* 3rd Item */}
                        <div className='group px-4'>
                            <div className='transition-all ease-out duration-300 text-white py-1'>
                                <Link to=''>Makeup</Link>
                            </div>
                            {/* div of underline on hover */}
                            <div className='hidden group-hover:block w-full h-0.5 bg-white'></div>
                            {/* div to show hover content */}
                            <div className='hidden group-hover:block absolute left-0 pl-2 py-3 shadow-lg w-full h-80 overflow-auto'>
                                <div className='text-2xl font-semibold py-5'>RIVAJ HD</div>
                                <div className='flex'>
                                    {/* 1st Column */}
                                    <div className='w-1/3'>
                                        <p className='font-bold text-sm pb-2'>FACE</p>
                                        <div>
                                            <ul>

                                                <li className='py-1'><Link>Blush on</Link></li>
                                                <li className='py-1'><Link>concealer</Link></li>
                                                <li className='py-1'><Link>Contour</Link></li>
                                                <li className='py-1'><Link>Foundation</Link></li>
                                                <li className='py-1'><Link>Highlighter</Link></li>
                                                <li className='py-1'><Link>Makeup Fixer</Link></li>
                                                <li className='py-1'><Link>Makeup Brush</Link></li>
                                                <li className='py-1'><Link>Makeup Remover</Link></li>
                                                <li className='py-1'><Link>Powder</Link></li>
                                                <li className='py-1'><Link>Primer</Link></li>

                                            </ul>
                                        </div>

                                    </div>

                                    {/* 2st Column */}
                                    <div className='w-1/3'>
                                        <p className='font-bold text-sm pb-2'>EYES</p>
                                        <div>
                                            <ul>

                                                <li className='py-1'><Link>Eye Brows</Link></li>
                                                <li className='py-1'><Link>Eye Palatte</Link></li>
                                                <li className='py-1'><Link>Eye Shadow</Link></li>
                                                <li className='py-1'><Link>Eye Lashes</Link></li>
                                                <li className='py-1'><Link>Kajal</Link></li>
                                                <li className='py-1'><Link>Eye Care</Link></li>
                                                <li className='py-1'><Link>Eye Liner</Link></li>
                                                <li className='py-1'><Link>Eye Pencil</Link></li>
                                                <li className='py-1'><Link>Maskara</Link></li>

                                            </ul>
                                        </div>

                                    </div>

                                    {/* 3rd Column */}
                                    <div className='w-1/3'>
                                        <p className='font-bold text-sm pb-2'>LIPS</p>
                                        <div>
                                            <ul>

                                                <li className='py-1'><Link>Lipstick</Link></li>
                                                <li className='py-1'><Link>Lip Gloss</Link></li>
                                                <li className='py-1'><Link>Lip Pencil</Link></li>
                                                <li className='py-1'><Link>Lip Care</Link></li>
                                                <li className='py-1 font-semibold'><Link>Nails</Link></li>

                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* Now through Map*/}

                        {/* Fourth Item */}
                        <div className='group px-4'>
                            {/* navbar item name div */}
                            <div className='transition-all ease-out duration-300  text-white py-1'>
                                <Link to="">Skin Care</Link>
                            </div>
                            {/* div of underline on hover */}
                            <div className='hidden group-hover:block w-full h-0.5 bg-white'></div>
                            {/* div to show hover content */}
                            <div className='hidden group-hover:block absolute pl-2 py-3 shadow-lg w-1/5'>
                                <ul>

                                    {skinCare.map((x) => {
                                        return (
                                            <li className='py-1'><Link>{x}</Link></li>
                                        )
                                    })}

                                </ul>
                            </div>
                        </div>

                        {/* 5th Item */}
                        <div className='group px-4'>
                            {/* navbar item name div */}
                            <div className='transition-all ease-out duration-300  text-white py-1'>
                                <Link to="">Hair Care</Link>
                            </div>
                            {/* div of underline on hover */}
                            <div className='hidden group-hover:block w-full h-0.5 bg-white'></div>
                            {/* div to show hover content */}
                            <div className='hidden group-hover:block absolute pl-2 py-3 shadow-lg w-1/5'>
                                <ul>

                                    {hairCare.map((x) => {
                                        return (
                                            <li className='py-1'><Link>{x}</Link></li>
                                        )
                                    })}

                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default NavbarRivaj


// // When you scroll down, the top navbar hides, and the search bar sticks to the top when it’s about to leave the screen.
// // When you scroll up, both navbars reappear smoothly.
// // Scrolling Behavior:

// On Scroll Down:
//          The top navbar disappears.
//          The search bar becomes sticky as it begins to disappear.
// On Scroll Up:
//          Both navbars reappear

// import React, { useState, useEffect, useRef } from 'react';

// const NavbarRivaj = () => {
//     const [showTopNavbar, setShowTopNavbar] = useState(true); // Controls visibility of the top navbar
//     const [isSearchSticky, setIsSearchSticky] = useState(false); // Controls sticky state of search bar
//     const lastScrollY = useRef(0); // Tracks the last scroll position

//     const searchBarRef = useRef(null);

//     useEffect(() => {
//         const handleScroll = () => {
//             const currentScrollY = window.scrollY;

//             // Show/Hide top navbar based on scroll direction
//             if (currentScrollY > lastScrollY.current) {
//                 // Scrolling down
//                 setShowTopNavbar(false);
//             } else {
//                 // Scrolling up
//                 setShowTopNavbar(true);
//             }

//             // Make search bar sticky when it begins to disappear
//             if (searchBarRef.current) {
//                 const { top } = searchBarRef.current.getBoundingClientRect();
//                 setIsSearchSticky(top <= 0);
//             }

//             lastScrollY.current = currentScrollY; // Update the last scroll position
//         };

//         window.addEventListener('scroll', handleScroll);

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     return (
//         <div>
//             {/* Top Navbar */}
//             <div
//                 className={`transition-transform duration-100 ${showTopNavbar ? 'translate-y-0' : '-translate-y-full'
//                     } fixed top-0 left-0 w-full bg-gray-800 text-white z-50 shadow-md`}
//             >
//                 <div className="flex items-center justify-between px-4 py-2">
//                     <div>Wishlist</div>
//                     <div>Settings</div>
//                 </div>
//             </div>

//             {/* Search Navbar */}
//             <div
//                 ref={searchBarRef}
//                 className={`transition-transform duration-300 ${isSearchSticky ? 'fixed top-0 bg-white shadow-md' : ''
//                     } w-full z-40`}
//                 style={{ marginTop: showTopNavbar ? '50px' : '0' }} // Adjust for top navbar height
//             >
//                 <div className="flex w-full mx-auto border border-gray-300 rounded-md">
//                     <input
//                         className="w-full py-2 px-4 rounded-md border-none focus:outline-none focus:ring-0"
//                         type="search"
//                         placeholder="Search..."
//                     />
//                     <button className="px-4 text-gray-700 bg-gray-100 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-0">
//                         🔍
//                     </button>
//                 </div>
//             </div>

//             {/* Placeholder for content */}
//             <div style={{ height: '100px', backgroundColor: '#f5f5f5' }} />
//         </div>
//     );
// };

// export default NavbarRivaj;


// // A more performant and modern approach to implement the same behavior is to use the Intersection Observer API instead of relying solely on scroll events

// import React, { useState, useRef, useEffect } from 'react';

// const NavbarRivaj = () => {
//     const [showTopNavbar, setShowTopNavbar] = useState(true); // Controls visibility of the top navbar
//     const [isSearchSticky, setIsSearchSticky] = useState(false); // Controls sticky state of search bar

//     const searchBarRef = useRef(null); // Reference for the search bar
//     const topNavBarRef = useRef(null); // Reference for detecting scroll direction

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 // Detect when the top navbar starts disappearing
//                 setShowTopNavbar(entry.isIntersecting);
//             },
//             { threshold: 0.1 } // Trigger when 10% of the top navbar is visible
//         );

//         if (topNavBarRef.current) {
//             observer.observe(topNavBarRef.current);
//         }

//         return () => {
//             if (topNavBarRef.current) {
//                 observer.unobserve(topNavBarRef.current);
//             }
//         };
//     }, []);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 // Make the search bar sticky when it leaves the viewport
//                 setIsSearchSticky(!entry.isIntersecting);
//             },
//             { threshold: 1 } // Trigger when the search bar is fully out of view
//         );

//         if (searchBarRef.current) {
//             observer.observe(searchBarRef.current);
//         }

//         return () => {
//             if (searchBarRef.current) {
//                 observer.unobserve(searchBarRef.current);
//             }
//         };
//     }, []);

//     return (
//         <div>
//             {/* Top Navbar */}
//             <div
//                 ref={topNavBarRef}
//                 className={`transition-transform duration-300 ${showTopNavbar ? 'translate-y-0' : '-translate-y-full'
//                     } fixed top-0 left-0 w-full bg-gray-800 text-white z-50 shadow-md`}
//             >
//                 <div className="flex items-center justify-between px-4 py-2">
//                     <div>Wishlist</div>
//                     <div>Settings</div>
//                 </div>
//             </div>

//             {/* Search Navbar */}
//             <div
//                 ref={searchBarRef}
//                 className={`transition-transform duration-300 ${isSearchSticky ? 'fixed top-0 bg-white shadow-md' : ''
//                     } w-full z-40`}
//                 style={{ marginTop: showTopNavbar ? '50px' : '0' }} // Adjust for top navbar height
//             >
//                 <div className="flex w-full mx-auto border border-gray-300 rounded-md">
//                     <input
//                         className="w-full py-2 px-4 rounded-md border-none focus:outline-none focus:ring-0"
//                         type="search"
//                         placeholder="Search..."
//                     />
//                     <button className="px-4 text-gray-700 bg-gray-100 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-0">
//                         🔍
//                     </button>
//                 </div>
//             </div>

//             {/* Placeholder for content */}
//             <div style={{ height: '', backgroundColor: '#f5f5f5' }} />
//         </div>
//     );
// };

// export default NavbarRivaj;

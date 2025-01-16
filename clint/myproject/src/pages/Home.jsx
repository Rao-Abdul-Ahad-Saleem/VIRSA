import React, { useEffect } from 'react'
import SliderCompo from '../components/SliderCompo'
import TopBrands from '../components/TopBrands'
import JustForYou from '../components/JustForYou'
import NewArrivals from '../components/NewArrvials'
import ShopsComponent from '../components/ShopsComponent'

import { useUserStore } from '../stores/useUserStore'

const Home = () => {

    // const { user, userRole, checkAuth } = useUserStore();



    // checkAuth();




    return (
        <div className='text-center'>
            <SliderCompo />
            <TopBrands />
            <JustForYou />
            <NewArrivals />
            <ShopsComponent />


        </div>
    )
}

export default Home

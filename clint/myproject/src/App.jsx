import React, { useEffect } from 'react'

import { Routes, Route, useNavigate } from 'react-router-dom'
import Registration from './auth/Registration'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Products from './pages/Products';
import ProductDetailPage from './pages/ProductDetailPage'
import NavbarRivaj from './components/NavbarRivaj';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './auth/Login';
import { useUserStore } from './stores/useUserStore';
import LoginWarn from './components/LoginWarn';
import Home from './pages/Home';
import CreateProduct from './components/CreateProduct';
import CreateShopForm from './pages/CreateShopForm';
import SellerRegistration from './auth/SellerRegistration';
import CartPage from './pages/CartPage';
import { useCartStore } from './stores/useCartStore';



const App = () => {
  const navigate = useNavigate();

  const { user, checkAuth, checkingAuth, userRole } = useUserStore();

  const { getCartItems } = useCartStore();

  // const authentiateUser = async () => {
  //   await checkAuth();

  // };

  useEffect(() => {
    checkAuth();  // i run the checkAuth here so that when the page reloads then checkAuth also runs that help to maintain the session of user and help him to stay signed in / logged in

  }, [])
  // checkAuth();

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user])

  // useEffect(() => {
  //   if (userRole != null) {
  //     // console.log(userRole);
  //     navigate('/Home')
  //   }
  // }, [userRole])  // This use Effect will run when even userRole changes

  // This way, checkAuth will authenticate the user, and the second useEffect will monitor userRole to make sure the navigation is adjusted accordingly



  return (
    <div>

      <Navbar />
      {/* <NavbarRivaj /> */}


      <Routes>
        {/* LogIn is the default page */}
        <Route path='/' element={<Login />}></Route>
        <Route path='/Home' element={<Home />}></Route>
        <Route path='/registration' element={<Registration />}></Route>
        <Route path='/product' element={<Products />}></Route>


        <Route path='/createProduct' element={<CreateProduct />}></Route>
        <Route path='/createShop' element={<CreateShopForm />}></Route>
        <Route path='/sellerCentral' element={<SellerRegistration />}></Route>
        {/* <Route path='/productDetail/:id' element={ */}
        <Route path='/productDetail/:id' element={<ProductDetailPage />}></Route>
        <Route path='/CartPage' element={<CartPage />}></Route>


        {/* <Route path='/profile' element={user ? <Profile /> : <Navigate to='/login' />}></Route> */}



      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App

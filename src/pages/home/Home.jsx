import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import Track from '../../components/track/Track'
import AllProducts from '../allproducts/AllProducts'
import ProductCard from '../../components/productCard/ProductCard'
import Testimonial from '../../components/testimonial/Testimonial'
import Login from '../registration/Login'
import Signup from '../registration/Signup'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'

const Home = () => {
    const dispatch = useDispatch();
    const cartItem = useSelector((state)=> state.cart)
  
    console.log(cartItem)
  
    const addCart = () => {
      dispatch(addToCart("shirt"));
    }
  
    const deleteCart = () => {
      dispatch(deleteFromCart("shirt"));
    }
  return (
  <Layout>
<HeroSection/>
<Filter/>
<ProductCard/>
<Track/>
<Testimonial/>

  </Layout>  
  )
}

export default Home
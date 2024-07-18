import React from 'react'
import Slide from '../../component/user/home/slide'
import Category from '../../component/user/home/categorys'
import  Brand from '../../component/user/home/brands'
import HorizontalProduct from '../../component/user/home/horizontal_product'
import VerticalProduct from '../../component/user/home/vertical_product'
import Product from '../../component/user/product'

const Home = () => {
  return (
    <div>
      <Category />
      <Slide />
      <HorizontalProduct />
      <Brand />
      {/* <VerticalProduct /> */}
      <Product />
    </div>
  )
}

export default Home
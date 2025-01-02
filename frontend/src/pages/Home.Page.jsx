import React from 'react'
import Header from '../components/Header/Header'
import HeroSliderContainer from '../components/HeroSlider/HeroSliderContainer'
import Footer from '../components/Footer/Footer'
import ProductsContainer from '../components/ProductsContainer/ProductsContainer'
function Home() {
  return (
    <div>
      <Header />
      <HeroSliderContainer />
      <ProductsContainer />
      <Footer />
    </div>
  )
}

export default Home
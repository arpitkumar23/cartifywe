import React from 'react'
import Hero from '../contect/Hero'
import LatestCollection from './LatestCollection'
import Footer from './Footer'
import OurPolicy from './OurPolicy'
import Categories from '../Contexts/Categories'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Categories/>
        <LatestCollection/>
        <OurPolicy/>
         
    </div>
  )
}

export default Home

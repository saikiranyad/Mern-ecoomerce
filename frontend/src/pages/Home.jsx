import React from 'react'
import Hero from '../Comm/Hero'
import LatestCollection from '../Comm/LatestCollection'
import About from './About'
import BestSellar from '../Comm/BestSellar'
import Ourpolicy from '../Comm/Ourpolicy'
import Newsletter from '../Comm/Newsletter'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSellar/>
     
      <Ourpolicy/>
      <Newsletter/>
      <About/>
      
    </div>
  )
}

export default Home

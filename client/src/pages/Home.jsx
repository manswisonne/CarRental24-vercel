import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
     <div className="pt-20">
    <>
      <Hero/>
      <FeaturedSection/>
        <Banner/>
        <Testimonial/>
      <Newsletter/>
   
    </>
     </div>
  )
}

export default Home

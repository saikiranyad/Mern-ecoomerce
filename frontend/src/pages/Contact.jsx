import React from 'react'
import Title from '../Comm/Title'
import { assets } from '../assets/assets'
import Newsletter from '../Comm/Newsletter'

const Contact = () => {
  return (
    <div>
    <div className='text-center text-2xl pt-10 border-t'>
      <Title text1={'Contact'} text2={'Us'}/>
    </div>
    <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
      <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
    <div className="flex flex-col justify-center items-start gap-6">
      <p className="font-semibold text-xl text-gray-600">Our Store</p>
      <p className='text-gray-500'>Madhura nagar <br />Yousufguda</p>
      <p className='text-gray-500'>(Tel)809090290</p> email:email@gmail.com
      <p className='font-semibold text-xl text-gray-600'>S-kart</p>
      <p className='text-gray-500'>learn more about our team and job openings</p>
      <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>explore more</button>
    </div>
    </div>
    <Newsletter/>
    </div>
  )
}

export default Contact

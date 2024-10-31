import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Comm/Title'
import { assets } from '../assets/assets'
import Newsletter from '../Comm/Newsletter'

const About = () => {
  // const {products} = useContext(ShopContext);
  // console.log(products)
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'About'} text2={'us'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>S-kart is born to showw companies that i need this very badly </p>
        <p>since my shit friends who doesnt know single line code they are hiring but not me</p>
        <b className='text-gray-800'>my Missions</b>

        <p>live a simple life and enjoy my dream</p>
        
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'Why'} text2={'Choose us'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>quality</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente similique deserunt recusandae consequatur. Nostrum ex labore dolores nisi mollitia voluptate omnis? Distinctio, enim?</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>quality</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam voluptas nam, tempore cumque vero ea blanditiis assumenda nihil voluptate amet ut.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>quality</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, dolorem quae delectus placeat ut libero aperiam rerum hic expedita?</p>
        </div>
      </div>
      <Newsletter/>
      
    </div>
  )
}

export default About

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

function BestSellar() {
    const {products} = useContext(ShopContext);
    const [bestSellar,setBestSellar] = useState([]);
    useEffect(()=>{
   const bestProduct = products.filter((item)=>(item.bestseller))
   setBestSellar(bestProduct.slice(0,5))
    },[products])
    console.log(bestSellar)
  return (
    <div className='my-10'>
        <div className="text-center text-3xl py-8">
            <Title text1={'Best'} text2={'Sellers'}/>
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            best selling products
            </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                bestSellar.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
                ))
            }

        </div>
      
    </div>
  )
}

export default BestSellar

import React, { useContext, useState } from 'react'

import CartTotal from '../Comm/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import Title from '../Comm/Title'
const Placeorder = () => {
  const [method, setMethod] = useState('cod');
  const [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onchangeeventhandler = (event)=>{
    const name = event.target.name
    const value = event.target.value
    setFormData(data=>({...data,[name]:value}))
  }

  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,deliveryfee,products} = useContext(ShopContext)

const onSubmitHandler = async(e)=>{

  e.preventDefault();
  try{
    let orderItems = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item] > 0){
          const itemInfo = structuredClone(products.find(product =>product._id === items))
          console.log(itemInfo)
          if(itemInfo){
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo)
          }
        }
      }
    }
    let orderData = {
      address : formData,
      items:orderItems,
      amount :getCartAmount() + deliveryfee
    }
    console.log(orderItems)
    switch(method){

      // api calls for cod
      case 'cod':
        const response = await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
        if(response.data.success){
          setCartItems({});
          navigate('/orders')
        }else{
          toast.error(response.data.message)
        }
        break;
        case 'stripe':
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
            if(responseStripe.data.success){
              const {session_url} = responseStripe.data
              window.location.replace(session_url)
            }else{
              toast.error(responseStripe.data.message)
            }
             
          break;


        default:
          break;
    }

  }catch(err){
    console.log(err)
    toast.error(err.message)

  }

}



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onchangeeventhandler} name='firstName' value={formData.firstName} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='First Name' />
          <input required onChange={onchangeeventhandler} name='lastName' value={formData.lastName} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Last Name' />
        </div>
        <input required onChange={onchangeeventhandler} name='email' value={formData.email} type="email" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Email' />
        <input required onChange={onchangeeventhandler} name='street' value={formData.street} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Street' />
        <div className="flex gap-3">
          <input required onChange={onchangeeventhandler} name='city' value={formData.city} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='City' />
          <input required onChange={onchangeeventhandler} name='state' value={formData.state} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='State' />
        </div>
        <div className="flex gap-3">
          <input required type="number" onChange={onchangeeventhandler} name='zipcode' value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='ZipCode' />
          <input required type="text" onChange={onchangeeventhandler} name='country' value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Country' />
        </div>
        <input required type="number" onChange={onchangeeventhandler} name='phone' value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='pHone' />

      </div>
      {/* {Right Side} */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'Payment'} text2={'method'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />

            </div>
            {/* <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />

            </div> */}
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Cash on Delivery</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type='submit'  className="bg-black text-white px-16 py-3 text-sm">PlaceOrder</button>
          </div>
        </div>

      </div>
    </form>
  )
}

export default Placeorder

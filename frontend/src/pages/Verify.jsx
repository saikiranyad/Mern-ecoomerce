import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useEffect } from 'react'
import {useSearchParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'
const Verify = () => {
    const {navigate,token,setCartItems,backenUrl} = useContext(ShopContext)
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const verifyPayment = async()=>{
        try{
            if(!token){
                return null
            }
            const response = await axios.post(backenUrl+'/api/order/verifyStripe',{success,orderId},{headers:{token}})
            if(response.data.success){
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/cart')
            }


        }catch(err){
            console.log(err)
            toast.error(err.message)

        }

    }
    useEffect(()=>{
        verifyPayment();
    },[token])
  return (
    <div>
      
    </div>
  )
}

export default Verify

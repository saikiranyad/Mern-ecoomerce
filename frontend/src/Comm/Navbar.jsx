import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {

    const [visible,setVisible] = useState(false);
    const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext)
    const logout = ()=>{
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        navigate('/login')
    }
    return (
    <div className='flex items-center justify-between py-5 font-medium'>
     <Link to='/'><img src="" alt="" className='w-36' /></Link>
     <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
         <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>Home</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
         </NavLink>
         <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>Collection</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
         </NavLink>
         <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>About</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
         </NavLink>
         <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>Contact</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
         </NavLink>

     </ul>
     <div className="flex items-center gap-6">
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
        <div className="group relative">
           <img src={assets.profile_icon} alt="" className="w-5 cursor-pointer" onClick={()=>token?null:navigate('/login')} />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                {
                    token && 
                    <div className="flex flex-col gap-2 w-26 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                    <p className='cursor-pointer hover:text-black'>My profile</p>
                    <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>orders</p>
                    <p onClick={logout} className='cursor-pointer hover:text-black'>logout</p>

                </div>
                }
            </div>
        </div>
        <Link to='/cart' className='relative'>
        <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
        
        </Link>
        <img src={assets.menu_icon} onClick={()=>setVisible(true)} alt="" className="w-5 cursor-pointer sm:hidden" />
     </div>
{/* side bar menu for small screen */}
<div className={`absolute top-0 right-0 overflow-hidden bg-white transition-all ${visible ? 'w-full':'w-0'}`}>
    <div className="flex flex-col text-gray-600">
        <div onClick={()=>setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">

            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p>Back</p>
        </div>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
    </div>

</div>
      
    </div>
  )
}

export default Navbar

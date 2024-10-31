import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
    const { search,setSearch,showsearch,setShowSearch } = useContext(ShopContext);
    const [visible,setVisible] = useState(false);
    const location = useLocation();
    useEffect(()=>{
      console.log(location)
      if(location.pathname.includes('collection')&&showsearch){
        setVisible(true)
      }else{
        setVisible(false)
      }
    },[location])
    return showsearch && visible? (
        <div className='border-t border-b bg-gray-50 text-center'>
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input value={search} onChange={(e)=> setSearch(e.target.value)} type="text" placeholder='search' className="flex-1 outline-none bg-inherit text-sm" />
                <img src={assets.search_icon} alt="" className="w-4" />
            </div>
            <img onClick={(() => setShowSearch(false))} src={assets.cross_icon} alt="" className="inline w-4 cursor-pointer" />




        </div>
    ) : null
}

export default Searchbar

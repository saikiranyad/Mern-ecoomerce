import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../Comm/Title';
import ProductItem from '../Comm/ProductItem';

const Collection = () => {
  const { products, search, showsearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));

    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))

    } else {
      setSubCategory(prev => [...prev, e.target.value])

    }
  }
  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showsearch && search) {
       productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }
  // useEffect(() => {
  //   setFilterProducts(products)
  // }, [])
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)))
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)))
        break;
      default:
        applyFilter();
        break;
    }
  }
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showsearch,products])

  useEffect(() => {
    sortProduct();
  }, [sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">Filters
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" value={'Men'} className="w-3" onChange={toggleCategory} />Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={'Women'} className="w-3" onChange={toggleCategory} />Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={'Kids'} className="w-3" onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>
        {/* Sub category  */}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" value={'Topwear'} className="w-3" onChange={toggleSubCategory} />Top wear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={'Bottomwear'} className="w-3" onChange={toggleSubCategory} />Bottom wear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={'Winterwear'} className="w-3" onChange={toggleSubCategory} />sweater
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justif-between text-base sm:text-2xl mb-4">
          <Title text1={'All'} text2={'Collections'} />
          {/* Product sorting */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2' name="" id="">
            <option value="relavant">Sort By : Relavant</option>
            <option value="low-high">Sort By : Loww to High</option>
            <option value="high-low">Sort By : High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection

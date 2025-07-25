import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const {products,search,showSearch} = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false)
  const [filterProducts,setFilterProducts] = useState([]);

  const [category,setCategory] = useState([]);
  const [subCategory,setSubcategory] = useState([]);
  const [sortType,setSortType] = useState('relevant');

  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item!==e.target.value))
    }else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }


  const toggleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      setSubcategory(prev=>prev.filter(item=>item!== e.target.value));
    }else{
      setSubcategory(prev=>[...prev, e.target.value])
    }
  }

  const applyFilter = () =>{
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }


    setFilterProducts(productsCopy);
  }

  const sortProduct = () =>{
    let fpCopy = filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }
  
  useEffect(()=>{
    setFilterProducts(products)
  },[])

  useEffect(()=>{
    applyFilter()
  },[category,subCategory,search,showSearch])

  useEffect(()=>{
    sortProduct()
  },[sortType])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10  pt-10 border-t'>
      {/* Filter options*/}
      <div className='min-w-60'>
        <p className='my-2 text-cl flex items-center cursor-pointer gap-2' onClick={()=>setShowFilter(!showFilter)}>FILTERS<img className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} src={assets.dropdown_icon}/></p>
        {/* Category filter */}
        <div className={`border border-gary-300 pl-5 py-3 mt-6 ${showFilter?'':'hidden'} sm:block transition-shadow transform-3d duration-500`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-ligt text-gary-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory}/> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory}/> Women
              
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory}/> Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gary-300 pl-5 py-3 my-5 ${showFilter?'':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-ligt text-gary-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory}/> Top wear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory}/> Bottom wear
              
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubCategory}/> Winter wear
            </p>
          </div>
      </div>
        </div>
        {/* Right side */}
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'}/>
            {/* Product Sort */}
            <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value='relevant'>Sort by: Relevant</option>
              <option value='low-high'>Sort by: Low to High</option>
              <option value='high-low'>Sort by: High to Low</option>
            </select>
          </div>

          {/* Map products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              filterProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
              ))
            }
          </div>

        </div>
    </div>
  )
}

export default Collection

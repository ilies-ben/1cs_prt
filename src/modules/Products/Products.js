import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import BouncingBalls from '../../components/loader'
import CatHeader from '../../components/CategoryHeader'
const Products = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/all-products/')
      const data = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <div>
      
      <div className="flex flex-col text-center w-full mt-20">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">ALL PRODUCTS</h1>
      </div>
      
      {
        products.length > 0 ?
        <ProductCard products={products}/>
        :
        <div className='flex justify-center items-center mt-11'><BouncingBalls/></div>
      }
    </div>
  )
}

export default Products

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'
import CatHeader from '../../components/CategoryHeader'
import PriceSlider from '../../components/rangeSlider'

const CategoryProducts = () => {
  const { name } = useParams()
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/categories/${name}`)
      const data = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  if (products.length === 0) return <div>Loading.....</div>

  return (
    <section className='w-full h-full min-h-screen px-4 py-28 '>
        <CatHeader text={name}/>
        <PriceSlider/>
            <ProductCard products={products} />
    </section>
    
  )
}

export default CategoryProducts
import React, { useEffect, useState } from 'react'
import FeatureCard from '../FeaturedCard/index'

const Categories = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/categories/')
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  if (categories.length === 0) return <div>Loading.....</div>

  return (
      <FeatureCard cards={categories}/>
  )
}

export default Categories
import React from 'react'
import CategoryContainer from './CategoryContainer'

function ProductsContainer() {
  return (
    <div className='px-4 py-3 bg-gray-500'>
        <CategoryContainer categoryName={'smartphones'}></CategoryContainer>
        <CategoryContainer categoryName={'laptops'}></CategoryContainer>
    </div>
  )
}

export default ProductsContainer
import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'
export const ProductsContext = createContext([])

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/product/get-all-products')
      .then((response) => setProducts(response.data.data))
      .catch((error) => (console.error("Error Fetching products", error)))
  }, [])
  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider

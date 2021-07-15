import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ProductContext } from './ProductProvider'
import { ProductCard } from './ProductCard'
import './Product.css'

export const ProductList = () => {
    const { products, getProducts, searchTerms } = useContext(ProductContext)

    const [filteredProducts, setFiltered] = useState([])
    const history = useHistory()

    useEffect(() => {
        console.log("ProductsList: useEffect - getProducts")
        getProducts()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = products.filter(product => product.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(products)
        }
    })
    return (
        <>
            <h2>Products</h2>
            <button onClick={() => {history.push('/products/create')}}>
                Add Product
            </button>
            <div className="products">
                {console.log("ProductList: Render", products)}
                {
                    filteredProducts.map(product => {
                        return <ProductCard key={product.id} product={product} />
                    })
                }
            </div>
        </>
    )
}
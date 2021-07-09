import React, { useContext, useEffect } from 'react'
import { ProductContext } from './ProductProvider'
import { ProductCard } from './ProductCard'

export const ProductList = () => {
    const { products, getProducts } = useContext(ProductContext)

    useEffect(() => {
        console.log("ProductsList: useEffect - getProducts")
        getProducts()
    }, [])

    return (
        <div className="products">
            {console.log("ProductList: Render", products)}
            {
                products.map(product => {
                    return <ProductCard key={product.id} product={product} />
                })
            }
        </div>
    )
}
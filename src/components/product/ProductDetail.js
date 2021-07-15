import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from './ProductProvider'
import './Product.css'
import { useParams, useHistory } from 'react-router-dom'

export const ProductDetail = () => {
    const { getProductById, removeProduct } = useContext(ProductContext)

    const [product, setProduct] = useState({})

    const { productId } = useParams()
    const history = useHistory()

    const handleRemove = () => {
        removeProduct(product.id)
        .then(() => {
            history.push(`/products`)
        })
    }

    useEffect(() => {
        getProductById(productId)
        .then((res) => {
            setProduct(res)
        })
    }, [])

    return (
        <section className="product">
            <h3 className="product__name">{product.name}</h3>
            <div className="product__price">Price: {product.price}</div>
            <div className="product__type">Type: {product.productType?.type}</div>
            <div className="product__location">Location: {product.location?.name}</div>
            <button onClick={handleRemove}>Remove Product</button>
            <button onClick={ () => {
                history.push(`/products/edit/${product.id}`)
            }}>Edit</button>
        </section>
    )
}
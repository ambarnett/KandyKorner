import React, { useState, createContext } from 'react';

export const ProductContext = createContext()

export const ProductProvider = (props) => {
    const [products, setProducts] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getProducts = () => {
        return fetch(`http://localhost:8088/products?_expand=productType&_expand=location`)
            .then(res => res.json())
            .then(setProducts)
    }

    const addProduct = productObj => {
        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productObj)
        })
            .then(res => res.json())
    }

    const getProductById = (id) => {
        return fetch(`http://localhost:8088/products/${id}?_expand=productType&_expand=location`)
            .then(res => res.json())
    }

    const removeProduct = (productId) => {
        return fetch(`http://localhost:8088/products/${productId}`, {
            method: "DELETE"
        })
            .then(getProducts)
    }

    const updateProduct = (product) => {
        return fetch(`http://localhost:8088/products/${product.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        .then(getProducts)
    }
    return (
        <ProductContext.Provider value={{
            products, getProducts, addProduct, getProductById, removeProduct, updateProduct, searchTerms, setSearchTerms
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}
import React, { useState, createContext } from 'react';

export const ProductContext = createContext()

export const ProductProvider = (props) => {
        const [products, setProducts] = useState([])

        const getProducts = () => {
            return fetch("http://localhost:8088/products")
            .then(res => res.json())
            .then(setProducts)
        }

        const addProduct = productObj => {
            return fetch("http://localhost:8088/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productObj)
            })
            .then(getProducts)
        }
        return (
            <ProductContext.Provider value={{
                products, getProducts, addProduct
            }}>
                {props.children}
            </ProductContext.Provider>
        )
}
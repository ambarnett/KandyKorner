import React, { useState, createContext } from 'react';

export const ProductTypeContext = createContext()

export const ProductTypeProvider = (props) => {
    const [productTypes, setProductTypes] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getProductTypes = () => {
        return fetch(`http://localhost:8088/productTypes`)
            .then(res => res.json())
            .then(setProductTypes)
    }

    const addProductType = typeObj => {
        return fetch(`http://localhost:8088/productTypes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(typeObj)
        })
            .then(res => res.json())
    }

    const getProductTypeById = (id) => {
        return fetch(`http://localhost:8088/productTypes/${id}`)
            .then(res => res.json())
    }

    const removeProductType = (productTypeId) => {
        return fetch(`http://localhost:8088/productTypes/${productTypeId}`, {
            method: "DELETE"
        })
            .then(getProductTypes)
    }

    const updateProductType = (productType) => {
        return fetch(`http://localhost:8088/productTypes/${productType.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productType)
        })
            .then(getProductTypes)
    }
    return (
        <ProductTypeContext.Provider value={{
            productTypes, getProductTypes, addProductType, getProductTypeById, removeProductType, updateProductType, searchTerms, setSearchTerms
        }}>
            {props.children}
        </ProductTypeContext.Provider>
    )
}
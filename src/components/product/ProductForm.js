import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { LocationContext } from '../location/LocationProvider'
import { ProductContext } from './ProductProvider'
import { ProductTypeContext } from '../productType/ProductTypeProvider'
import "./Product.css"

export const ProductForm = () => {
    const { addProduct, getProductById, updateProduct } = useContext(ProductContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { productTypes, getProductTypes } = useContext(ProductTypeContext)

    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const {productId} = useParams()
    const history = useHistory()

    const handleControlledInputChange = (event) => {
        const newProduct = {...product}
        newProduct[event.target.id] = event.target.value
        setProduct(newProduct)
    }

    const saveNewProduct = () => {
        addProduct({
            name: product.name,
            price: parseInt(product.price),
            productTypeId: parseInt(product.productTypeId),
            locationId: parseInt(product.locationId) 
        })
        .then (() => history.push(`/products`))
    }
    const saveEditProduct = () => {
        updateProduct({
            id: product.id,
            name: product.name,
            price: parseInt(product.price),
            productTypeId: parseInt(product.productTypeId),
            locationId: parseInt(product.locationId)
        })
        .then(() => history.push(`/products/detail/${product.id}`))
    }

    const handleClickSaveProduct = (event) => {
        event.preventDefault()
        if (parseInt(product.locationId) === 0 || parseInt(product.productTypeId) === 0){
            window.alert("Please select a location and product type")
        } else {
            setIsLoading(true)
            if(productId){
                saveEditProduct()
            } else {
                saveNewProduct()
            }
        }
    }
    
    useEffect(() => {
        getLocations().then(getProductTypes).then(() => {
            if(productId) {
                getProductById(productId)
                .then(product => {
                    setProduct(product)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    return (
        <form className="productForm">
            <h2 className="productForm__title">{productId ? <>Edit product</> : <>New product</>}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Product name:</label>
                    <input type="text" id="name" required autoFocus className="form-control" placeholder="Product name" value={product.name} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Product price:</label>
                    <input type="text" id="price" required autoFocus className="form-control" placeholder="Product price" value={product.price} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select name="locationId" id="locationId" className="form-control" value={product.locationId} onChange={handleControlledInputChange}>
                        <option value="0">Select a location</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productTypeId">Product type: </label>
                    <select name="productType" id="productTypeId" className="form-control" value={product.productTypeId} onChange={handleControlledInputChange}>
                        <option value="0">Select a type</option>
                        {productTypes.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.type}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={handleClickSaveProduct}>
                {productId ? <>Save product</> : <>Add product</>}</button>
        </form>
    )
}
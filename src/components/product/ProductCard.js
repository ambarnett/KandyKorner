import React from "react"
import "./Product.css"
import { Link } from "react-router-dom"

export const ProductCard = ( {product} ) => (
    <section className="product">
        <h3 className="product__name">
            <Link to={`/products/detail/${product.id}`}>
                {product.name}
            </Link>
        </h3>
    </section>
)
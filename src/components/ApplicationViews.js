import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from './Home'
import { CustomerProvider } from './customer/CustomerProvider'
import { CustomerList } from './customer/CustomerList'
import { EmployeeProvider } from './employee/EmployeeProvider'
import { EmployeeList } from './employee/EmployeeList'
import { LocationProvider } from './location/LocationProvider'
import { LocationList } from './location/LocationList'
import { ProductProvider } from './product/ProductProvider'
import { ProductList } from './product/ProductList'

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>
            </LocationProvider>
            <ProductProvider>
                <Route exact path="/products">
                    <ProductList />
                </Route>
            </ProductProvider>
            <EmployeeProvider>
                <Route exact path="/employees">
                    <EmployeeList />
                </Route>
            </EmployeeProvider>
            <CustomerProvider>
                <Route exact path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>
        </>
    )
}
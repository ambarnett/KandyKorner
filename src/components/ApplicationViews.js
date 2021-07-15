import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from './Home'
import { CustomerProvider } from './customer/CustomerProvider'
import { CustomerList } from './customer/CustomerList'
import { EmployeeProvider } from './employee/EmployeeProvider'
import { EmployeeList } from './employee/EmployeeList'
import { EmployeeSearch } from './employee/EmployeeSearch'
import { EmployeeForm } from './employee/EmployeeForm'
import { EmployeeDetail } from './employee/EmployeeDetail'
import { LocationProvider } from './location/LocationProvider'
import { LocationList } from './location/LocationList'
import { ProductProvider } from './product/ProductProvider'
import { ProductList } from './product/ProductList'
import { ProductSearch } from './product/ProductSearch'
import { ProductForm } from './product/ProductForm'
import { ProductDetail } from './product/ProductDetail'
import { ProductTypeProvider } from './productType/ProductTypeProvider'

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            {/* /**********************************************************************************/}
            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>
            </LocationProvider>
            {/* /**********************************************************************************/}
            <ProductProvider>
                <ProductTypeProvider>
                    <LocationProvider>
                        <Route exact path="/products">
                            <ProductSearch />
                            <ProductList />
                        </Route>
                        <Route exact path="/products/create">
                            <ProductForm />
                        </Route>
                        <Route path="/products/edit/:productId(\d+)">
                            <ProductForm />
                        </Route>
                        <Route exact path="/products/detail/:productId(\d+)">
                            <ProductDetail />
                        </Route>
                    </LocationProvider>
                </ProductTypeProvider>
            </ProductProvider>
            {/* /**********************************************************************************/}
            <EmployeeProvider>
                <LocationProvider>
                    <Route exact path="/employees">
                        <EmployeeSearch />
                        <EmployeeList />
                    </Route>
                    <Route exact path="/employees/create">
                        <EmployeeForm />
                    </Route>
                    <Route path="/employees/edit/:employeeId(\d+)">
                        <EmployeeForm />
                    </Route>
                    <Route exact path="/employees/detail/:employeeId(\d+)">
                        <EmployeeDetail />
                    </Route>
                </LocationProvider>
            </EmployeeProvider>
            {/* /**********************************************************************************/}
            <CustomerProvider>
                <Route exact path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>
        </>
    )
}
import React, { useContext } from 'react'
import { EmployeeContext } from './EmployeeProvider' 
import './Employee.css'

export const EmployeeSearch = () => {
    const { setSearchTerms } = useContext(EmployeeContext)

    return (
        <>
            Employee Search:<br/>
            <input type="text"
            className="input--wide"
            onKeyUp={(event) => setSearchTerms(event.target.value)}
            placeholder="Search for an employee..."/>
        </>
    )
}
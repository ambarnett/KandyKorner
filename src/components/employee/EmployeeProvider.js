import React, { useState, createContext } from "react"

export const EmployeeContext = createContext()

export const EmployeeProvider = (props) => {
    const [employees, setEmployees] = useState([])
    const [searchTerms, setSearchTerms] = useState("")

    const getEmployees = () => {
        return fetch("http://localhost:8088/employees?_expand=location")
            .then(res => res.json())
            .then(setEmployees)
    }

    const addEmployee = employeeObj => {
        return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeObj)
        })
            .then(res => res.json())
    }
    const getEmployeeById = (id) => {
        return fetch(`http://localhost:8088/employees/${id}?_expand=location`)
            .then(res => res.json())
    }
    const fireEmployee = (employeeId) => {
        return fetch(`http://localhost:8088/employees/${employeeId}`, {
            method: "DELETE"
        })
            .then(getEmployees)
    }
    const updateEmployee = (employee) => {
        return fetch(`http://localhost:8088/employees/${employee.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
        .then(getEmployees)
    }
    return (
        <EmployeeContext.Provider value={{
            employees, getEmployees, addEmployee, getEmployeeById, fireEmployee, updateEmployee, searchTerms, setSearchTerms
        }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}
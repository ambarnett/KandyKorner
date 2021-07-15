import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { EmployeeContext } from "./EmployeeProvider"
import { EmployeeCard } from "./EmployeeCard"
import "./Employee.css"

export const EmployeeList = () => {
    const { employees, getEmployees, searchTerms } = useContext(EmployeeContext)

    const [filteredEmployees, setFiltered] = useState([])
    const history = useHistory()

    useEffect(() => {
        console.log("EmployeeList: useEffect - getEmployees")
        getEmployees()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = employees.filter(employee => employee.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(employees)
        }
    }, [searchTerms, employees])

    return (
        <>
            <h2>Employees</h2>
            <button onClick={() => { history.push("/employees/create") }}>
                Add Employee
            </button>
            <div className="employees">
                {console.log("EmployeeList: Render", employees)}
                {
                    filteredEmployees.map(employee => {
                        return <EmployeeCard key={employee.id} employee={employee} />
                    })
                }
            </div>
        </>
    )
}
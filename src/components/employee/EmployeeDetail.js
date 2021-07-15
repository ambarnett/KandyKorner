import React, { useEffect, useContext, useState } from 'react'
import { EmployeeContext } from './EmployeeProvider'
import { useParams, useHistory } from 'react-router-dom'
import './Employee.css'

export const EmployeeDetail = () => {
    const { getEmployeeById, fireEmployee } = useContext(EmployeeContext)

    const [employee, setEmployee] = useState({})

    const { employeeId } = useParams()
    const history = useHistory()

    const handleFireEmployee = () => {
        fireEmployee(employee.id)
        .then(() => {
            history.push("/employees")
        })
    }

    useEffect(() => {
        getEmployeeById(employeeId)
        .then((res) => {
            setEmployee(res)
        })
    }, [])

    return (
        <section className="employee">
            <h3 className="employee__name">Name: {employee.name}</h3>
            <div className="employee__location">Location: {employee.location?.name}</div>
            <div className="employee__manager">{employee.manager ? "They are a manager" : "They are NOT a manager"}</div>
            <div className="employee__fullTime">{employee.fullTime ? "They are full time" : "They are NOT full time"}</div>
            <div className="employee__rate">Hourly Rate: {employee.hourlyRate}</div>
            <button onClick={handleFireEmployee}>Fire Employee</button>
            <button onClick={() => {
                history.push(`/employee/edit/${employee.id}`)
            }}>Edit</button>
        </section>
    )
}
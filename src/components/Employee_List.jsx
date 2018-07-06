import React, { Component } from "react"
import _ from 'lodash'
import EmployeeListItem from './Employee_List_Item'

export default class EmployeeList extends Component {

    getTopThreeEmployees(arr) {
        let uniqueEmployees = this.getUniqueEmployees(arr)
        let ratedEmployees = this.calculateEmployeeDays(arr, uniqueEmployees)
        return  _.slice(ratedEmployees,0,3)
    } 

    calculateEmployeeDays(reservations,employees) {
        for (let i=0; i<reservations.length; i++) {
            let days = this.getReservationDays(reservations[i].checkOutDate, reservations[i].checkInDate)
            if (reservations[i].employee) {
                let index = _.findIndex(employees, employee => {return employee.id === reservations[i].employee.id})
                employees[index].hours += days 
            }
        }
        return _.orderBy(employees, 'hours', 'desc')
    }

    getReservationDays(checkOutDate, checkInDate) {
        let checkOut =_.reverse(checkOutDate.split('-'))
        let revCheckOut =_.join(checkOut,'-')

        let checkIn =_.reverse(checkInDate.split('-'))
        let revCheckIn =_.join(checkIn,'-')

        var days =  Math.floor(( Date.parse(revCheckOut) - Date.parse(revCheckIn) ) / 86400000)
        return days
    }

    getUniqueEmployees(arr) {
        let employees = []
        for (let i=0; i<arr.length; i++) {
            if (arr[i].employee) {
                arr[i].employee.hours = 0
                employees.push(arr[i].employee)
            } else {
                continue
            }
        }
        return _.unionWith(employees,_.isEqual)
    }
    
    renderEmployees(arr) {
        let topThree = this.getTopThreeEmployees(this.props.reservations)
        return topThree.map( (employee) => {
            return (
                <EmployeeListItem  
                        key={employee.id}
                        hours={`${employee.hours} hours`}
                        name={`${employee.firstName} ${employee.lastName.charAt(0)}.`}
                        img={employee.profileImageUrl} />
            )
        })
    }
   

    render() {
        if (this.props.length < 0) {
            return (
                <div>
                    Loading employees...
                </div>
            )
        }
        return ( 

            <div className="employees-container">
                <h2 className="white"> Employee stats </h2>
                {this.renderEmployees(this.props.reservations)}
            </div>
        );
    }
}


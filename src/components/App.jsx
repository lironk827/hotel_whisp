import React, { Component } from "react"
import styles from './App.module.scss'
import axios from 'axios'
import HotelReview from './Hotel_Review'
import EmployeeList from './Employee_List'

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hotel: '',
            reservations: []
        }
    }

    fetchData() {
        axios.all([
            axios.get('https://interview-booking-api.herokuapp.com/api/booking-snapshot'),
            axios.get(' https://interview-booking-api.herokuapp.com/api/bookings')
          ])
          .then(axios.spread((hotelRes, employeeRes) => {
              this.setState({ hotel: hotelRes.data, reservations: employeeRes.data})
            // console.log(employeeRes.data)
          }))
    }

    componentDidMount() {
        this.fetchData()
    }


    render() {
        return (
            <div className={styles.app}>
                <div className="page-content">
                    <HotelReview hotel={this.state.hotel}/>
                    <EmployeeList reservations={this.state.reservations} />
                </div>
            </div>
        );
    }
}

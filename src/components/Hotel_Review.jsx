import React, { Component } from "react";

export default class HotelReview extends Component {


    render() {
        let hotel = this.props.hotel
        if (!hotel) {
            return (
                <div>
                    Loading hotel review...
                </div>
            )
        }
        return ( 
            <div>
                <div className="hotel-container">
                        <div>
                            <h1 className="white">{hotel.availableRooms}</h1>
                            <h5>Rooms available</h5>
                        </div>
                        <div>
                            <h1 className="white">{hotel.reservedRooms}</h1>
                            <h5>Reserved rooms</h5>
                        </div>
                        <div>
                            <h1 className="white">{hotel.checkedIn}</h1>
                            <h5>Checked in</h5>
                        </div>
                </div>
                <hr/>
            </div>
        );
    }
}

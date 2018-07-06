import React, { Component } from "react";

export default class EmployeeListItem extends Component {

    render() {
       
    let { name, img, hours } = this.props
        return ( 
            <div className="employee-row">
                    <div>
                        <img className="Bitmap" src={img}/>
                    </div>
                    <div className="white">
                        {name}
                    </div>
                    <div>
                        {hours}
                    </div>
            </div>

        );
    }
}
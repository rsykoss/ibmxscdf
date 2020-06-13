import React, { Component } from 'react'
import axios from 'axios'

import './profile.css'
import CCTV from '../cctv'
import face from './img/face_1.jpg'

//const API_register = 'http://localhost:3001/iot/registerDevice'
const API_fetch = 'http://localhost:3001/iot/fetchAllDevices'


class Profile extends Component {
    
     // profile page
    // view cctv 
    // fetch devices & set state

    constructor() {
        super();
        this.state = {
            name: '',
            address: '',
            devices: [] 
        }
    }

    componentDidMount () {
        var user_data = [];
        axios.get(API_fetch)
            .then(response => {
                user_data = response.data
                this.setState({
                    name: user_data.name,
                    address: user_data.address,
                    devices: [user_data.deviceType, user_data.deviceKey]
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }    
    
    launchDevice = ( {deviceType} ) => {
        if (deviceType === "CCTV") {
            return <CCTV />
        }
        else {
            return <Profile />
        }
    }

    render() {
        return (
            <div id="container">
                <img src={face} alt="elderly-profile"/>
                <p> {this.state.name}</p>
                <br/>
                <p> {this.state.address}</p>
                <br/>
                <button onClick={() => this.launchDevice({deviceType: 'CCTV'})}> view CCTV </button>
                <button onClick={() => this.launchDevice({deviceType: 'Sensor'})}> Sensor </button>
            </div>
        )
    }
   
}

export default Profile;

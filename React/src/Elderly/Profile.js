import React, { Component } from 'react'
import axios from 'axios'
import './profile.css'
import ObjectDetectionVideo from './object-detection-video/ObjectDetectionVideo'
import face from '../public/img/face_1.jpg'

//const API_register = 'http://localhost:3001/iot/registerDevice'
const API_fetch = 'http://localhost:3001/iot/fetchAllDevices'


class Profile extends Component {
    
     // profile page
    // view cctv 
    // fetch devices & set state

    constructor() {
        super(props);
        state = {
            name: '',
            address = '',
            devices = [] 
        }
    }

    componentDidMount = () => {
        let response = await axios.get(API_fetch)
        
        setState({
            name: response.data.name,
            address: reponse.data.address,
            devices: [response.data.deviceType, reponse.data.deviceKey]
        })
    }
    
    launchDevice = ( {deviceType} ) => {
        if (deviceType === "CCTV") {
            return (
                <div className="fillPage">
                  <ObjectDetectionVideo
                    model={model}
                    onPrediction={handlePrediction}
                    // render={render}
                    // aspectFill: The option to scale the video to fill the size of the view.
                    //             Some portion of the video may be clipped to fill the view's
                    //             bounds.
                    // aspectFit:  The option to scale the video to fit the size of the view
                    //             by maintaining the aspect ratio. Any remaining area of the
                    //             view's bounds is transparent.
                    fit="aspectFill"
                    // mirrored:   mirror the video about its vertical axis.
                    mirrored
                  />
                </div>
            )
        }
        else {
            return <Profile />
        }
    }

    render() {
        return (
            <div id="container">
                <img src={face} />
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

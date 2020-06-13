import React, { Component } from 'react'
import axios from 'axios'
import Profile from './Profile'

const API_register = 'http://localhost:3001/iot/registerDevice'
// const API_fetch = 'http://localhost:3001/iot/fetchAllDevices'


class Register extends Component {

    // register page
    // register device
    // post filled form to db (update db)
    // get device type & key
    
    constructor() {
        super();
        this.state = {
            name: "",
            address: "",
            deviceType: "",
            devices: [],
        };
    }

    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
    }

/*
    getUser = (name, address, deviceType) => {
        this.name = name
        this.address = address
        this.deviceType = deviceType
        userData = {name, address, deviceType}
    }
*/

// fetch('http://localhost:3001/iot/registerDevice', {
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({deviceType:"CCTV"})
//     }).then(response => console.log(response.json()))

    componentDidMount = () => {
        axios({
            method: 'post',
            url: API_register,
            data: {
              deviceType: "cctv"
            }
          }).then((result)=> {
              console.log(result);
          });
    }

      
    registerDevice = (e) => {
        e.preventDefault();
        
        // fetch('http://localhost:3001/iot/registerDevice', {
        // method: 'post',
        // headers: { 
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json' 
        // },
        // body: JSON.stringify({deviceType:"CCTV"})
        // }).then((response) => console.log(response));

        
        // const { name, addresss, deviceType } = this.state;
        axios.post(API_register, { deviceType: "cctv" })
            .then((response) => {
                console.log(response)
            //     this.setState({
            //         devices: [...this.state.deviceType, result.data.devices]
            // });
        });
        //display Profile page
        return <Profile />
    }

    render() {
        return (
            <form onSubmit={this.registerDevice}>
            <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.onChange}/>
            </label>
            <br />
            <label>
            Address:
            <input type="text" name="address" value={this.state.address} onChange={this.onChange}/>
            </label>
            <br />
            <label>
            Device Type:    
            <select defaultValue={this.state.deviceType} onChange={this.onChange}>
                <option value="CCTV">CCTV</option>
                <option value="Sensor">Sensor</option>
            </select>
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
        );
    } 
    
}

export default Register;
    
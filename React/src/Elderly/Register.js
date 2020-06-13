import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
// import Profile from './Profile'

const API_register = 'http://localhost:3001/iot/registerDevice'
const API_fetch = 'http://localhost:3001/iot/fetchAllDevices'


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

        console.log({ [e.target.name]: e.target.value })
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
            method: 'get',
            url: API_fetch,
            data: {
                deviceType: "cctv"
            }
        }).then((result) => {
            console.log(result);
            this.setState({
                name: result.data.name,
                address: result.data.address,
                devices: result.data.devices.length > 0 ? result.data.devices : []
            })

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
        axios.post(API_register, { deviceType: this.state.deviceType })
            .then((response) => {
                console.log('teste');
                console.log(response)
                //     this.setState({
                //         devices: [...this.state.deviceType, result.data.devices]
                // });
                console.log(response.data.newDevice)
                this.setState({ devices: [...this.state.devices, response.data.newDevice] })
            });
        //display Profile page
      
        // return <Profile />
    }

    renderMyDevices() {
        if (!this.state.devices) return <div />
        return this.state.devices.map(d => {
            let imageURL = d.type == 'cctv' ? 'https://images.unsplash.com/photo-1565591452825-67d6b7df1d47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' : 'https://images.unsplash.com/photo-1586001348188-05bd8063cb7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            return <div class="card" style={{ width: '18rem' }}>
                <img src={imageURL} class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{d.deviceKey}</h5>
                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    <button class="btn btn-primary" onClick={() => gotoCCTV(d.deviceKey)}>{d.type}</button>
                </div>
            </div>
            return <div> {d.imageURL} | {d.deviceKey}</div>
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className='col'>
                        <form onSubmit={this.registerDevice}>
                            <label>
                                Name:</label>
                            <input type="text" name="name" value={this.state.name} onChange={this.onChange} />

                            <br />
                            <label>
                                Address: </label>
                            <input type="text" name="address" value={this.state.address} onChange={this.onChange} />

                            <br />
                            <label>
                                Device Type:
                                </label>
                            <select name='deviceType' defaultValue={this.state.deviceType} onChange={this.onChange}>
                                <option value="cctv">CCTV</option>
                                <option value="sensor">Sensor</option>
                            </select>

                            <br />
                            <button className="btn btn-lg btn-primary" type="submit">Submit</button>
                        </form>
                    </div>
                    <div className="col">
                        {this.renderMyDevices()}
                    </div>
                </div>
            </div>
        );
    }

}
function gotoCCTV(key) {
    window.location.href = "http://localhost:3000/cctv?productKey="+key;
}
export default Register;

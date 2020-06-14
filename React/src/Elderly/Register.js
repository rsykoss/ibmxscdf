import React, { Component } from 'react'
import axios from 'axios'
import './register.css'
import { Link } from 'react-router-dom';
// import Profile from './Profile'

const API_register = 'https://kampung-api.herokuapp.com/iot/registerDevice'
const API_fetch = 'https://kampung-api.herokuapp.com/iot/fetchAllDevices'


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

        console.log({ [e.target.name]: e.target.value })
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount = () => {
        let search = window.location.search;
        var id = search.split('=')
        if (id.length == 2){
            id = id[1]
        } else 
            id = ''
        console.log(id)
        axios.get(API_fetch, {params: {id:id}})
            .then((result) => {
            this.setState({
                id: result.id,
                name: result.data.name,
                gender: result.data.gender,
                age: result.data.age,
                address: result.data.address,
                devices: result.data.devices.length > 0 ? result.data.devices : []
            })

        });
    }


    registerDevice = (e) => {
        e.preventDefault();
        axios.post(API_register, { deviceType: "cctv", id: this.state.id })
        .then((response) => {
            
            this.setState(state => {
                const devices = state.devices.concat(response.data.newDevice);
                return {devices}
            })
        });
        
        
        return <div className="container">
            {this.renderMyDevices()}
        </div>

    }

    renderMyDevices() {
        if (!this.state.devices) return <div />
        return this.state.devices.map(d => {
            // let imageURL = d.type == 'cctv' ? 'https://images.unsplash.com/photo-1565591452825-67d6b7df1d47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' : 'https://images.unsplash.com/photo-1586001348188-05bd8063cb7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            return <div className="card size">  
                <img src={d.imageURL} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{d.title}</h5>
                    <p className="card-text">{d.description}</p>
                    <button className="btn btn-primary" onClick={() => gotoCCTV(d.deviceKey)}>{d.type}</button>
                </div>
            </div>
            return <div> {d.imageURL} | {d.deviceKey}</div>
        })
    }

    render() {
        return (
            <div className="bg">
                <div className="outer">
                    <div className='card side'>
                        <form className='form' style={{ width: '100%'}} onSubmit={this.registerDevice}>
                            <label className="space">Name:</label>
                            <br />
                            <input type="text" name="name" placeholder="John Tay" onChange={this.onChange} />

                            <br />
                            <label className="space">Address: </label>
                            <br />
                            <input type="text" name="address" placeholder="NTU" onChange={this.onChange} />

                            <br />
                            <label className="space">Device Type: </label>
                            <br />
                            <select className="dropdown" defaultValue={this.state.deviceType} onChange={this.onChange}>
                                <option value="CCTV">CCTV</option>
                                <option value="Sensor">Sensor</option>
                            </select>

                            <div className="space"></div>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>
                    </div>
                    
                </div>
                <div className="outer box">
                    {this.renderMyDevices()}
                </div>
            </div>
        );
    }

}
function gotoCCTV(key) {
    window.location.href = "https://kampung-api.herokuapp.com/cctv?productKey="+key;
}
export default Register;

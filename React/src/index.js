
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {Navbar, Nav, Button} from 'react-bootstrap';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './pages/Navbar';
import Routes from './routes/routes';

// import CCTV from './cctv';

ReactDOM.render(
    <Router>
        <div className="App">
            <Navbar bg="dark" variant="dark" className="bar" sticky="top">
                <Navbar.Brand href="/" className="brand">The Kampung Network</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                <Nav >
                    <Nav.Link className="mr-auto" href="#pricing">Log Out</Nav.Link>
                </Nav>
            </Navbar>
            <Routes />
        </div>
    </Router>,
    document.getElementById('root')
);

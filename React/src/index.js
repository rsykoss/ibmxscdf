
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
// import 'bootstrap/dist/css/bootstrap.css';

// import Navigation from './components/Navbar';
import Routes from './routes/routes';

// import CCTV from './cctv';

ReactDOM.render(
<<<<<<< HEAD

  <div className="App">
    {/* <Navigation /> */}
    <Routes />
  </div>
  ,
  document.getElementById('root')
);
=======
    <Router>
        <div className="App">
            {/* <Navigation /> */}
            <Routes />
        </div>
    </Router>,
    document.getElementById('root')
);
>>>>>>> e7ceb64d1de7b02dd9dcd191fb65312fd347975f

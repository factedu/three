import React from 'react';
// import logo from './logo.svg';
import outerCircle from './FactLogo-outerCircle.svg';
import innerCircle from './FactLogo-innerCircle.svg';
import { Link } from 'react-router-dom';
import './LandingScreen.css';

function LandingScreen() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={outerCircle} className="App-logo" alt="logo" />
          <img src={innerCircle} className="App-logo-inner" alt="logo" />
        </div>
        <p className="App-logo-subhead">
          Faculty of Advance Computation Technology
        </p>
        <ul>
          <li>
            <Link to="/cube-basic">Cube Basic</Link>
          </li>
          <li>
            <Link to="/orbit-control">Orbit Control</Link>
          </li>
          <li>
            <Link to="/ray-casting">Ray Casting</Link>
          </li>
        </ul>

      </header>
    </div>
  );
}

export default LandingScreen;
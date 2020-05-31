import React from 'react';
// import logo from './logo.svg';
import outerCircle from './FactLogo-outerCircle.svg';
import innerCircle from './FactLogo-innerCircle.svg';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './LandingScreen.css';
import Layout from './../../components/Layout';
import { Box, ButtonGroup } from '@material-ui/core';

function LandingScreen() {
  return (
    <Layout title={"Home"}>
      <div className="App">
        <header className="App-header">
          <div class="App-logo-container">
            <img src={outerCircle} className="App-logo" alt="logo" />
            <img src={innerCircle} className="App-logo-inner" alt="logo" />
          </div>
          <p className="App-logo-subhead">
            Faculty of Advance Computation Technology
          </p>
          <Box component="div" m={4}>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
              <Button component={Link} to="/cube-basic">
                Cube Basic
              </Button>
              <Button component={Link} to="/orbit-control">
                Orbit Control
              </Button>
              <Button component={Link} to="/ray-casting">
                Ray Casting
              </Button>
            </ButtonGroup>
          </Box>
        </header>
      </div>
    </Layout>
  );
}

export default LandingScreen;
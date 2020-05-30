import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LandingScreen from "./screens/LandingScreen/LandingScreen";
import CubeBasic from './screens/CubeBasic/CubeBasic';
import OrbitControl from './screens/OrbitControl';
import RayCasting from './screens/RayCasting';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/cube-basic'>
          <CubeBasic height={window.innerHeight} width={window.innerWidth} />
        </Route>
        <Route path='/orbit-control'>
          <OrbitControl height={window.innerHeight} width={window.innerWidth} />
        </Route>
        <Route path='/ray-casting'>
          <RayCasting />
        </Route>
        <Route path='/'>
          <LandingScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

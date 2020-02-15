import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'

//components
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
      
      <Route path='/dashboard' exact component={Dashboard}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={SignUp}/>
     
      </Switch>
    </Router>
  )
}

export default App;

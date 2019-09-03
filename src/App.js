import React, { Component } from 'react'
import { BrowserRouter as Router,Route } from 'react-router-dom'
import Login from './modules/News/Components/Login/Login';
import Register from './modules/News/Components/Register/Register';
import Home from './modules/News/Components/Home/Home';
export default class App extends Component {
  render() {
    return (
    <Router>
      <div>
     <Route exact path="/" component={Login}/>
     <Route path="/login" component={Login}/>
     <Route path="/register" component={Register}/>
     <Route path="/home" component={Home}/>
      </div>
    </Router>
    )
  }
}

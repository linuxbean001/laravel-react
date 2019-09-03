import React, { Component } from 'react'
import './Login.css';
import {Link} from 'react-router-dom';
import AuthService from './../../Services/AuthService'
const log = new AuthService();

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      fields:{}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(field,e){
    let fields = this.state.fields
    fields[field] = e.target.value;
    this.setState({
      fields
    })
  }
  handleSubmit(e){
  e.preventDefault();
 const obj={
   email: this.refs.email.value,
   password: this.refs.password.value
 }
 console.log('login xxxx',obj);
 
 log.login(obj).then((result)=>{
   if(result){
     this.props.history.replace('/home')
   }
   console.log('login data is',result);
 })
 this.setState({
   email:'',
   password:''
 })
 
  }
  render() {
    return (
      <div>
        <div id="login">
        <h3 className="text-center text-white pt-5">Login form</h3>
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" onSubmit={this.handleSubmit} className="form" action="" method="post">
                            <h3 className="text-center text-info">Login</h3>
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">Email:</label><br></br>
                                <input type="text" name="email" id="email" className="form-control" ref="email" value={this.state.fields["email"]} onChange={this.handleChange.bind(this, "email")}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br></br>
                                <input type="password" name="password" id="password" ref="password" value={this.state.fields["password"]} onChange={this.handleChange.bind(this,"password")} className="form-control" />
                            </div>
                            <div className="form-group">
                                <button type="submit" name="submit" className="btn btn-info btn-md" value="submit">
                                  Submit</button>
                            </div>
                            <div id="register-link" className="text-right">
                                <Link to={'/register'} className="text-info">Register here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </div>
    )
  }
}


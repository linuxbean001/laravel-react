import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Register.css'
import AuthService from './../../Services/AuthService'
const reg = new AuthService()

export default class Register extends Component {
  constructor(props){
    super(props)
    this.state={
      name:'',
      username:'',
      email:'',
      password:'',
      contact:'',
      fields:{}
    
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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
    name: this.refs.name.value,
    username: this.refs.username.value,
    email: this.refs.email.value,
    password: this.refs.password.value,
    contact: this.refs.contact.value
  } 
  console.log('xxxxx',obj);
  
   reg.register(obj).then((result) =>{
     console.log('register',result);
     
   })
  
   this.setState ({
     name:'',
     username:'',
     email:'',
     password:'',
     contact:''
   })
  }
  render() {
    return (
 
    <div>
        <div id="register">
        <h3 className="text-center text-white pt-5">Register Form</h3>
        <div className="container">
            <div id="register-row" className="row justify-content-center align-items-center">
                <div id="register-column" className="col-md-6">
                    <div id="register-box" className="col-md-12">
                        <form id="register-form" onSubmit={this.handleSubmit} className="form" action="" method="post">
                            <h3 className="text-center text-info">Register</h3>
                            <div className="form-group">
                                <label htmlFor="name" className="text-info">Name:</label><br></br>
                                <input type="text" name="name" id="name" className="form-control" ref="name" value={this.state.fields["name"]} onChange={this.handleChange.bind(this, "name")}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">Username:</label><br></br>
                                <input type="text" name="username" id="username" className="form-control" ref="username" value={this.state.fields["username"]} onChange={this.handleChange.bind(this, "username")}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">Email:</label><br></br>
                                <input type="text" name="email" id="email" className="form-control" ref="email" value={this.state.fields["email"]} onChange={this.handleChange.bind(this, "email")}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br></br>
                                <input type="password" name="password" id="password" ref="password" value={this.state.fields["password"]} onChange={this.handleChange.bind(this,"password")} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact" className="text-info">Contact:</label><br></br>
                                <input type="text" name="conatact" id="contact" ref="contact" value={this.state.fields["contact"]} onChange={this.handleChange.bind(this,"contact")} className="form-control" />
                            </div>
                            <div className="form-group">
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="Register"/>
                            </div>
                            <div id="register-link" className="text-right">
                                <Link to={'/login'} className="text-info">Login here</Link>
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

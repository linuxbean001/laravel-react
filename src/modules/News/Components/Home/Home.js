import React, { Component } from 'react'
import './Home.css';
import AuthService from './../../Services/AuthService'
import Table from './../Table/Table'
const reg = new AuthService();
export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      name:'',
      password:'',
      contact:'',
      person:[]
    }
  }
  componentDidMount(){
    reg.register().then((result)=>{
      this.setState({
        name: result.data.name,
        password: result.data.password,
        contact: result.data.contact

      })
    })
  }
  logout(){
    this.props.history.replace('/login')
  }
  table(){
    return this.state.person.map(function(object,i){
    return <Table obj={object} key={i} />
  })
    }
  render() {
    return (
    <div>
    <div id="home">
    <h3 className="text-center text-white pt-5">Home Page</h3>
    <button type="submit" className="form-submit logout" onClick={()=>this.logout()}>Logout</button>
    <div className="container">
        <div id="home-row" className="row justify-content-center align-items-center">
            <div id="home-column" className="col-md-6">
                <div id="home-box" className="col-md-12">
                  <h1 className="home">Profile</h1>
                  <table className="table table-striped" style={{marginTop: 20}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Password</th>
            <th>Contact</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
      <tbody>
           {this.table()}
       </tbody>
     </table>
                  </div>
                </div>
            </div>
        </div>
    </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import './Home.css';
import Table from './../Table/Table'
export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      person:[]
    }
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
      <div className="center">
       <h1>Home Page</h1>
       <button type="submit" className="form-submit" onClick={()=>this.logout()}>Logout</button>
      {/* <div>
      <h3 align="center">Person List</h3>
      <table className="table table-striped" style={{marginTop: 20}}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {this.table()}
        </tbody>
      </table>
    </div> */}
    </div>
    )
  }
}

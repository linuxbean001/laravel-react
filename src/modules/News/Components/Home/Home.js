import React, { Component } from 'react'
import './Home.css';
import AuthService from './../../Services/AuthService'
const authapi = new AuthService()
const profile = new AuthService();
const user = new AuthService();
const ed = new AuthService();
export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      id:'',
      name:'',
      username:'',
      contact:'',
      editStatus:true
     
    }
    this.edit = this.edit.bind(this);
  
  }
  componentDidMount(){
    if(authapi.getToken()){
     this.getProgile()
    this.props.history.replace('/home')
    }
    else{
      this.props.history.replace('/login')
    }
    
  }

  getProgile(){
    profile.getProfile(). 
    then((result)=>{
  console.log('home',result.user.id);
  this.setState({
    id: result.user.id,
   name: result.user.name,
   username: result.user.username,
   contact: result.user.contact

  })
})
  }

 edit(id){
   this.setState({
     editStatus: false
   })

 }
 save(){
   console.log('xnnnn',this.refs.editName.value);

   const uservo = {
    id: this.state.id,
    name: this.refs.editName.value,
    username: this.refs.edituserName.value,
    contact:this.refs.editcontact.value
   }
    ed.edit(uservo).then((result)=>{
      this.getProgile()
     console.log(result);
     this.setState({
      editStatus:true
    
     
     })
   })
   
 }
 cancel(){
   this.setState({
     editStatus:true
   })
 }
  logout(){
     authapi.removeToken();
    this.props.history.replace('/login')
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
            <th>Username</th>
            <th>Contact</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
      <tbody>
      <tr>
      <td> {this.state.editStatus ? this.state.name: <input type="text" ref="editName" defaultValue={this.state.name}/>}</td>
      <td>{this.state.editStatus ? this.state.username: <input type="text" ref="edituserName"defaultValue={this.state.username}/>}</td>
      <td>{this.state.editStatus ? this.state.contact: <input type="text" ref="editcontact" defaultValue={this.state.contact}/>}</td>
      <td>
        {this.state.editStatus ?  <button type="submit" onClick={()=>this.edit(this.state.id)} className="btn btn-primary">Edit</button>: <span><button type="submit" className="btn btn-success" onClick={()=>this.save()}>Save</button><button type="submit" className="btn btn-danger" onClick={() =>this.cancel()}>Cancel</button></span>}
        
      </td>
      <td>
      
      </td>
    </tr>
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

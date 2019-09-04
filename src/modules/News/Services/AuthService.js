import axios from 'axios'
import decode from 'jwt-decode';
export default class AuthService{
  constructor(domain){
    this.domain = 'http://localhost:8000/'
  }
  login(obj){
    return axios.post(this.domain + 'api/login',obj)
     .then((result) =>{
       console.log('result',result);
       this.setToken(result.data.token)
       return Promise.resolve(result)
     })
  }
  register(obj){
    return axios.post(this.domain + 'api/register',obj)
    .then((result) =>{
      return Promise.resolve(result)
    })
  }
  
  edit(uservo){
    console.log('user value',uservo);
    var config = {
      headers: { 'Content-Type': 'application/json' }
    };
    return axios.put(this.domain + 'api/update/' +uservo.id, uservo,config)
     .then((result)=>{
       console.log('result result',result);
       
     })
  }
 getProfile = () => {
   console.log('user',decode(localStorage.getItem('token')).sub);
   
   return axios.get( this.domain + 'api/user_profile/' + decode(localStorage.getItem('token')).sub)
       .then(result=> {
           console.log('backend',result.data.sub)
           return result.data
       })
       .catch(err => {
           console.log(err)
       })
}

  setToken(token){
    const decodeToken = decode(token);
    console.log('cvd',decodeToken.sub);
    
    localStorage.setItem('token',JSON.stringify(token))
  }
  getToken(){
    return localStorage.getItem('token')
  }
  removeToken(){
    localStorage.removeItem('token')
  }
}
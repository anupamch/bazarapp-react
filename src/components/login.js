import React, { Component } from 'react'
import { thisTypeAnnotation } from '@babel/types';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import {FormGroup} from "shards-react";

class Login extends Component {
  constructor(props){
    
     super(props);
     this.state={
        fields:{},
        errors:{}
     }
     this.validator=new SimpleReactValidator();
  }

  handleChange = (event)=>{
       let id=event.target.id
       let fields=this.state.fields;
       fields[event.target.id]=event.target.value;
       this.setState({
        fields
       })
       
  }
  handleSubmit =  event => {
    event.preventDefault();
    try{
      
      if (this.validator.allValid()) {     
       axios.post('http://localhost:8080/authenticate',this.state.fields)
            .then(res=>{
              let data=res.data
              if(data.auth==1){
                    localStorage.setItem('user',JSON.stringify(data.user))
                    localStorage.setItem('oauthToken',data.token)          
                   // this.context.router.history.push('/dashboard')
                   const {history}=this.props
                   history.push('/dashboard');         
              }
              else{
                 this.setState({errors:{auth_error:"Invalid User Id Password"}})
                 console.log(this.state.errors)
              }
            
            })
            .catch(function (error) {
              console.log(error);
          });
      }else{
        this.validator.showMessages();
        this.forceUpdate(); 
      }
             
    }catch(e){
         alert(e.message)
    } 
  }
  render() {
    /* if(localStorage.getItem('oauthToken'))
    {
        const {history}=this.props
       // history.push('/dashboard')
    } */   
    
    return (
      
      <div className="container-fluid login_container">
      <div className="col-md-6 col-sm-12 login">
        <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <div className={!this.state.errors.auth_error?'hidden':''}>
          <div className="alert alert-danger">{this.state.errors.auth_error}</div>
          </div>
            
            
            <label><i className="fa fa-user"></i>User Name</label>
            <input type="text" palceholder="User name" name="username" id="username" onChange={this.handleChange} className="form-control"/>
            {this.validator.message('username',this.state.fields.username,"required|email")}
            
            </FormGroup>
            <FormGroup>
            <label><i className="fa fa-key"></i>Password</label>
            <input type="password" className="form-control" palceholder="Password" name="password" id="password" onChange={this.handleChange}/>
            {this.validator.message('password',this.state.fields.username,"required|min:2")}
            </FormGroup>
            <div className="col-md-12">&nbsp;</div>
            <div className="col-md-12 nopadding">
           
            <button type="submit" className="btn btn-success w-100"><i className="fa fa-unlock"></i>&nbsp;&nbsp;LOGIN</button>
            </div>
            

        </form>
      </div>
      </div>
      
    )
  }
}

export default withRouter(Login)

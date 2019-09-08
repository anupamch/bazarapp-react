import React,{Component} from 'react';

export default class Logout extends Component{
    constructor(props){
          super(props)
      
          localStorage.clear();
          this.props.history.push("/login")
     }

     render(){
           return (<div>Please Wait...</div>)
     }

    
    
}
import React,{Component} from 'react'
import {Redirect } from 'react-router-dom';
const auth=(route,rest)=>(
    isAuthTokenValid()?
      route.layout!=""?
            route.path!='/login' && route.path!='/'?  
                <route.layout {...rest}>
                    <route.component {...rest} />
                </route.layout>
                :<Redirect to='/dashboard' />
            :<Redirect to='/logout' />
        :<Redirect to='/login' /> 
);

const isAuthTokenValid=()=>{ 
      //console.log(localStorage.getItem('oauthToken')!=null)
      if(localStorage.getItem('oauthToken')!='' && localStorage.getItem('oauthToken')!=null){
          return true;
      }
      else
         return false
} 

export default auth;
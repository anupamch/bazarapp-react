import React,{Component} from 'react'
import {Redirect } from 'react-router-dom';
const auth=(route,rest)=>( 
    isAuthTokenValid()?
        <route.layout {...rest}>
            <route.component {...rest} />
        </route.layout>
        :<Redirect to='/login' /> 
  );

const isAuthTokenValid=()=>{ 
      //console.log(localStorage.getItem('oauthToken'))
      if(localStorage.getItem('oauthToken')!=''){
          return true;
      }
      else
         return false
} 

export default auth;
import React,{Component} from 'react'
import './App.css';
import axios from 'axios'
import routes from './Router'
import { BrowserRouter,Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

//import withTracker from './withTracker'

class App extends Component {
  
  componentWillMount(){
    const self = this
    axios.interceptors.request.use(function (config) {
      // spinning start to show
      config.headers.authorization = localStorage.getItem("oauthToken");
      return config
     }, function (error) {
       return Promise.reject(error);
     });
 
     axios.interceptors.response.use(function (response) {
      // spinning hide
      console.log('Incomming...')
 
      return response;
    }, function (error) {
      
      if(error.response.status==403){
        if(error.response.data.code==403){
       
           window.location='/login';  
        }
   }
      return Promise.reject(error);
    });
  }
  render() {
      //console.log('App-sdfsdf')
      return (
        
        <BrowserRouter>
                                            
        {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(rest)=>(
                        
                             route.middleware(route,rest)
                           
            )
           }
          />
        );
      })}
          
        
          </BrowserRouter>
         
        
      );
  }
}

export default App;

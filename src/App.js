import React,{Component} from 'react'
import './App.css';
import axios from 'axios'
import routes from './Router'
import { BrowserRouter,Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

//import withTracker from './withTracker'

class App extends Component {
  
  constructor(pros){
     super(pros)
      this.state={showOverlay:false}
  }
  componentWillMount(){
    const self = this
    axios.interceptors.request.use( (config)=> {
      // spinning start to show
      config.headers.authorization = localStorage.getItem("oauthToken");
      this.setState({showOverlay:true})
      return config
     }, function (error) {
      this.setState({showOverlay:false})
       return Promise.reject(error);
     });
 
     axios.interceptors.response.use( (response)=> {
      // spinning hide
      console.log('Incomming...')
      this.setState({showOverlay:false})  
      return response;
    },  (error) =>{
       this.setState({showOverlay:false})
      if(typeof error.response!= 'undefined' && error.response.status==403){
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
        <div className="wrapper">
          <div className="overlay row align-items-center" style={{display:  this.state.showOverlay ? 'flex' : 'none' }}><i className="fas fa-cog fa-spin"></i></div>
        <BrowserRouter basename='/nbazzar/'>
                                            
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
         
        </div>
      );
  }
}

export default App;

import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import Orders from './orders'
import OrderDetails from './orderDetails'
import BazarSlipList from './bazarSlipList'
import BazarSlipDetails from './bazarSlipDetails'
export default class OrderRouter extends Component{
    render(){
        return(<Switch>
                  <Route exact path={this.props.match.path} component={Orders}/>
                  <Route exact path={`${this.props.match.path}/details/:id`} component={OrderDetails}/>
                  <Route exact path={`${this.props.match.path}/bazar-slip-list`} component={BazarSlipList}/>
                  <Route exact path={`${this.props.match.path}/slip-details/:id`} component={BazarSlipDetails}/>
                 
        </Switch>)
    }
}
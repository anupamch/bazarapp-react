import React,{Component} from 'react';
import Product from './product'
import {Route,Switch} from 'react-router-dom'
import ProductAdd from './productAdd'
import ProductEdit from './productEdit'
export default class ProductRouter extends Component{
    render(){
        return(<Switch>
                  <Route exact path={this.props.match.path} component={Product}/>
                  <Route path={`${this.props.match.path}/edit/:id`} component={ProductEdit}/>
                  <Route path={`${this.props.match.path}/add`} component={ProductAdd}/>
                 
        </Switch>)
    }
}
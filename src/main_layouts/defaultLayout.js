import React,{Component} from 'react'

export default class DefaultLayout extends Component{
    render(){
       // console.log('sdfsdf')
        return(
            <div>
            
            {this.props.children}
            
            </div>
        )
    };
}
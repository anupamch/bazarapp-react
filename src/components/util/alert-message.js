import React,{Component} from 'react'
export default class AlertMessage extends Component{
    constructor(props){
        super(props)
        let prop=props.prop;
        this.state={alertDisplay:"none",response:{}}
        


    }
    componentWillMount(){
        let prop=this.props.prop;
      
        if(typeof prop.history!='undefined' && typeof prop.history.location.state!='undefined' && prop.history.location.state.msg!=""){
            let response=prop.history.location.state
            this.setState({
                        response:{msg:response.msg,status:response.status},
                        alertDisplay:"block"
                         
                    });
        }
    }
    hideAlert=(event)=>{
        this.props.prop.history.location.state.msg="";
        this.setState({alertDisplay:"none"})
    }
    render(){
        return(<div className={`alert alert-${this.state.response.status}`} style={{display:this.state.alertDisplay,color:"#FFF"}}>
                   <button className="close" onClick={this.hideAlert}>x</button>
                   {this.state.response.msg}
                </div>);
    }
}
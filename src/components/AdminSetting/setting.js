import React,{Component} from 'react';
import { FormGroup,Container,Row } from "shards-react";
import PageTitle from "../common/PageTitle";
import SimpleReactValidator from 'simple-react-validator';
import userService from '../../services/userService'
import AlertMessage from '../util/alert-message'

export default class Settings extends Component{
    constructor(props){
    
        super(props);
        this.state={
           fields:{},
           errors:{},
           response_msg:{}
          
        }
        this.validator=new SimpleReactValidator();
     }

     async componentWillMount(){
        let response=await userService.getAllSettings();
        if(response.data.status==200)
            this.setState({fields:response.data.settings})
        }
        handleChange = (event)=>{
            
            let fields=this.state.fields;
            fields[event.target.id]=event.target.value;
            this.setState({
             fields
            })
            console.log(this.s)
        }
    

     handleSubmit=async (event)=>{
         
        event.preventDefault();
       
        if(this.validator.allValid()){
            let errors=this.state.errors;
            let valid=true
            if(this.state.fields.min_order<=0){errors['minOrderError']="Minimum Order should be greater than 0"}
            else (errors['minOrderError']="")
            if(this.state.fields.shipping_order_range<=0)
            {
                    valid=false;
                    errors['shipRangeError']="Shipping range should be greater than 0"
                }
            else errors['shipRangeError']=""
            if(this.state.fields.shipping_price<=0){valid=false;errors['shipPriceError']="Shipping cost should be greater than 0"}
            else{errors['shipPriceError']=""}
           
            this.setState({errors:errors})
            if(!valid) return;
            userService.updateSettings(this.state.fields).then(res=>{
                let response_msg={}
                response_msg['msg']="Settings update success fully";
                response_msg['status']="success"
                this.setState({response_msg:response_msg})
                
            }).catch(error=>{
                 console.log(error)
            })
        }
        else{
            this.validator.showMessages();
            this.forceUpdate(); 
        }
        
    }
    
    

  

    render(){
        return(<Container fluid className="main-content-container px-4">
           
         
        <div className="col-md-6 col-sm-12  mx-auto border border-info">
            {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Setting" subtitle="Admin Setting" className="text-sm-left" />
        </Row>

        <div className={this.state.response_msg.msg!==undefined?'alert alert-success':'hidden'}>{this.state.response_msg.msg}</div>
          <form onSubmit={this.handleSubmit}>
            
          <FormGroup>
              <label>From Email</label>
              <input type="text" palceholder="From Email" name="from_email" id="from_email" defaultValue={this.state.fields.from_email} onChange={this.handleChange} className="form-control"/>
              {this.validator.message('from_email',this.state.fields.from_email,"required|email")}
              
              </FormGroup>
              <FormGroup>
              <label>To Email</label>
              <input type="text" palceholder="To Email" name="to_email" id="to_email" defaultValue={this.state.fields.to_email} onChange={this.handleChange} className="form-control"/>
               {this.validator.message('to_email',this.state.fields.to_email,"required|email")}
              </FormGroup>
              <FormGroup>
              <label>Minimum Order(Rs.)</label>
              <input type="text" palceholder="Minimum Order" name="min_order" id="min_order" defaultValue={this.state.fields.min_order} onChange={this.handleChange} className="form-control"/>
               {this.validator.message('Minimum_order',this.state.fields.min_order,"required|numeric")}              
               <span style={{color:'red'}}>{this.state.errors.minOrderError}</span>
              </FormGroup>
              <FormGroup>
              <label>Shipping Applicable Order Range(Rs.)</label>
              <input type="text" palceholder="Minimum Order" name="shipping_order_range" id="shipping_order_range" defaultValue={this.state.fields.shipping_order_range} onChange={this.handleChange} className="form-control"/>
               {this.validator.message('shipping_order_range',this.state.fields.shipping_order_range,"required|numeric")}
               <span style={{color:'red'}}>{this.state.errors.shipRangeError}</span>              
              </FormGroup>
              <FormGroup>
              <label>Shipping Cost(Rs.)</label>
              <input type="text" palceholder="Shipping Price" name="shipping_price" id="shipping_price" defaultValue={this.state.fields.shipping_price} onChange={this.handleChange} className="form-control"/>
               {this.validator.message('shipping_cost',this.state.fields.shipping_price,"required|numeric")}
               <span style={{color:'red'}}>{this.state.errors.shipPriceError}</span>               
              </FormGroup>
             
              <div className="col-md-12">&nbsp;</div>
              <div className="col-md-12 nopadding">
             
              <button type="submit" className="btn btn-success w-100"><i className="fa fa-save"></i>&nbsp;&nbsp;SAVE</button>
              </div>
              <div className="col-md-12">&nbsp;</div>
  
          </form>
          <div className="col-md-12">&nbsp;</div>
        </div>
        </Container>)
    }
}
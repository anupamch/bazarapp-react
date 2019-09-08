import React,{Component} from 'react';
import { FormGroup,Container,Row } from "shards-react";
import PageTitle from "../common/PageTitle";
import SimpleReactValidator from 'simple-react-validator';
import CategoryService from '../../services/categoryService'
export default class CategoryAdd extends Component{
    constructor(props){
    
        super(props);
        this.state={
           fields:{},
           errors:{},
           
        }
        this.validator=new SimpleReactValidator();
     }

     componentWillMount(){
        
      }

     handleChange = (event)=>{
        let id=event.target.id
        let fields=this.state.fields;
        fields[event.target.id]=event.target.value;
        this.setState({
         fields
        })
        
    }

     handleSubmit=async (event)=>{
        event.preventDefault();
        if(this.validator.allValid()){
           
            let response = await CategoryService.countCategory(this.state.fields.name);  
           //console.log(response)
            if(response.data.count>0){
                this.setState({errors:{nameError:"Category '"+this.state.fields.name+"' already exist"}})
                return;
            }
            else{
                this.setState({errors:{}})
            }
            CategoryService.createCategory(this.state.fields).then(res=>{
                if(res.status==200){
                    this.props.history.push('/category',{status:'success',msg:"Category created successfuly"})
                }
                else
                   console.log(res)
                    
                

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
         
        <div className="col-md-6 col-sm-12 mx-auto border border-info">
             {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Category Add" subtitle="Category" className="text-sm-left" />
        </Row>  
          <form onSubmit={this.handleSubmit}>
          <FormGroup>
              <label>Category Name</label>
              <input type="text" palceholder="Category name" name="name" id="name" onChange={this.handleChange} className="form-control"/>
              {this.validator.message('name',this.state.fields.name,"required")}
              <span style={{color:'red'}}>{this.state.errors.nameError}</span>
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
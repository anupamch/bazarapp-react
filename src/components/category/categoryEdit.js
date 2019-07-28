import React,{Component} from 'react';
import { FormGroup,Container,Row } from "shards-react";
import PageTitle from "../common/PageTitle";
import SimpleReactValidator from 'simple-react-validator';
import CategoryService from '../../services/categoryService'
export default class CategoryEdit extends Component{
    constructor(props){
    
        super(props);
        this.state={
          
           errors:{},
           fields:{}
        }
        this.validator=new SimpleReactValidator();
     }

     componentWillMount(){
        const id = this.props.match.params.id 
        CategoryService.getProductCategoryById(id).then(res=>{
            
               this.setState({fields:res.data.category})
           });
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
           
            let response = await CategoryService.countCategory(this.state.fields.name,this.state.fields.id);  
           //console.log(response)
            if(response.data.count>0){
                this.setState({errors:{skuError:"Category '"+this.state.fields.name+"' already exist"}})
                return;
            }
            CategoryService.editCategory(this.state.fields).then(res=>{
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
              
              <input type="text" palceholder="Category name" name="name" id="name" defaultValue={this.state.fields.name} onChange={this.handleChange} className="form-control"/>
              {this.validator.message('name',this.state.fields.name,"required")}
              
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
import React,{Component} from 'react';
import { FormGroup,Container,Row } from "shards-react";
import PageTitle from "../common/PageTitle";
import SimpleReactValidator from 'simple-react-validator';
import ProductService from '../../services/productService'
import config from '../../config'
export default class ProductAdd extends Component{
    constructor(props){
    
        super(props);
        this.state={
           fields:{},
           errors:{},
           catagories:[],
           product:{},
           images: []
        }
        this.validator=new SimpleReactValidator();
     }

     async componentWillMount(){
        let response=await ProductService.getProductCategory();
        if(response.data.status==200)
            this.setState({catagories:response.data.categories})
        const id = this.props.match.params.id 
        
        ProductService.singleProduct(id).then(res=>{
                 //console.log(res.data.product)
                  if(res.data.status==200)
                    this.setState({fields:res.data.product[0]})
                  else
                    console.log("Something is wrong")  
                  
              })
              .catch(error=>{
                console.log(error)
              })
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
            /* if(this.state.images.length==0){
               this.setState({errors:{imageError:"Product Image required"}})
               return;
            }
            else
              this.setState({error:{imageError:""}}) */
            let response = await ProductService.countSku(this.state.fields.sku,this.state.fields._id);  
            
            if(response.data.count>0){
                this.setState({errors:{skuError:"SKU already exist"}})
                return;
            }
            
            ProductService.editProduct(this.state).then(res=>{
                if(res.status==200){
                    this.props.history.push('/product',{status:'success',msg:"Product edited successfuly"})
                }

            }).catch(error=>{
                 console.log(error)
            })
        }
        else{
            this.validator.showMessages();
            this.forceUpdate(); 
        }
    }
    
    selectImage=(event)=>{
         let images=[];
         for(let i=0;i<event.target.files.length;i++){
              images[i]=event.target.files.item(i)
         }
         //images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))

         //let message = `${images.length} valid image(s) selected`

         this.setState({ images:images })
    }

    render(){
        return(<Container fluid className="main-content-container px-4">
         
        <div className="col-md-6 col-sm-12  mx-auto border border-info">
            {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Product Edit" subtitle="Products" className="text-sm-left" />
        </Row>   
          <form onSubmit={this.handleSubmit}>
            
          <FormGroup>
              <label>Product Name</label>
              <input type="text" palceholder="Product name" name="name" id="name" defaultValue={this.state.fields.name} onChange={this.handleChange} className="form-control"/>
              {this.validator.message('name',this.state.fields.name,"required")}
              
              </FormGroup>
              <FormGroup>
              <label>sku</label>
              <input type="text" className="form-control" palceholder="SKU" defaultValue={this.state.fields.sku} name="sku" id="sku" onChange={this.handleChange}/>
              {this.validator.message('sku',this.state.fields.sku,"required")}
              <span style={{color:'red'}}>  
              {this.state.errors.skuError}</span>
              </FormGroup>
              <FormGroup>
              <label>Description</label>
              
              <textarea value={this.state.fields.description} className="form-control" name="description" id="description" onChange={this.handleChange}></textarea>
              {this.validator.message('description',this.state.fields.description,"required")}
              
              </FormGroup>
              <FormGroup>
              <label>Messure Unit</label>
              <select  value={this.state.fields.unit} className="form-control"  name="unit" id="unit" onChange={this.handleChange}>
                  <option value="">--Select unit--</option>
                  <option value="kg" >Kilo gram</option>
                  <option value="gm">Gram</option>
                  <option value="lit">Litter</option>
                  <option value="lb">Pound</option>
                  <option value="pisces">Pisces</option>
              </select>    
              {this.validator.message('Unit',this.state.fields.unit,"required")}
              </FormGroup>
              <FormGroup>
              <label>Unit Price</label>
              <input defaultValue={this.state.fields.price} type="text" className="form-control" palceholder="Price" name="price" id="price" onChange={this.handleChange}/>
              {this.validator.message('price',this.state.fields.price,"required|numeric")}
              </FormGroup>
              <FormGroup>
              <label>Product Image</label><br/>
              <img src={config.API_URL+'/uploads/pimages/'+this.state.fields.image} />
              <input type="file" className="form-control"  name="pimage" id="pimage" onChange={this.selectImage} accept="image/*"/>
              <span style={{color:'red'}}>{this.state.errors.imageError}</span>
              </FormGroup>
                            
              <FormGroup>
              <label>Minimum Order</label>
              <input defaultValue={this.state.fields.minimum_order} type="text" className="form-control"  name="minimum_order" id="minimum_order" onChange={this.handleChange}/>
              {this.validator.message('Minimum order',this.state.fields.minimum_order,"required|numeric")}
              </FormGroup>
              
              <FormGroup>
              <label>Service Cost</label>
              <input type="text" defaultValue={this.state.fields.service_cost}  className="form-control"  name="service_cost" id="service_cost" onChange={this.handleChange}/>
              {this.validator.message('Service Cost',this.state.fields.service_cost,"numeric")}
              </FormGroup>
               
              <FormGroup>
              <label>Category</label>
              <select value={this.state.fields.category} className="form-control"  name="category" id="category" onChange={this.handleChange}>
                  <option>--Select Category--</option>

                  {this.state.catagories.map((category,index)=>{
                      return <option key={index} value={category._id}>{category.name}</option>
                  })}
              </select>
              {this.validator.message('Category',this.state.fields.category,"required")}
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
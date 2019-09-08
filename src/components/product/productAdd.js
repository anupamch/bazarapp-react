import React,{Component} from 'react';
import { FormGroup,Container,Row } from "shards-react";
import PageTitle from "../common/PageTitle";
import SimpleReactValidator from 'simple-react-validator';
import ProductService from '../../services/productService'
import CategoryService from '../../services/categoryService'
export default class ProductAdd extends Component{
    constructor(props){
    
        super(props);
        this.state={
           fields:{},
           errors:{},
           categories:[],
           images: [],
           is_service:0
        }
        this.validator=new SimpleReactValidator();
     }

     componentWillMount(){
        CategoryService.getProductCategory().then(res=>{
                 //console.log(res.data.categories)
                  if(res.data.status==200)
                    this.setState({categories:res.data.categories})
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
        //console.log(event.target.value)
        fields[event.target.id]=event.target.value;
        this.setState({
         fields
        })
        
    }

     handleSubmit=async (event)=>{
        event.preventDefault();
       // console.log(this.state.fields)
        if(this.validator.allValid()){
            if(this.state.images.length==0){
               this.setState({errors:{imageError:"Product Image required"}})
               return;
            }
            else if(this.state.fields.is_service){
                
                if(typeof this.state.fields.service_name=='undefined' || this.state.fields.service_name==""){
                        
                    this.setState({errors:{serviceNameError:"Please enter service name"}})
                    return;
                }
                if(this.state.fields.service_cost==undefined || this.state.fields.service_cost==""){
                    
                    this.setState({errors:{serviceCostError:"Please enter service cost"}})
                    return
                }
                
                
            }
            
            this.setState({error:{}})
              
            let response = await ProductService.countSku(this.state.fields.sku);  
           //console.log(response)
            if(response.data.count>0){
                this.setState({errors:{skuError:"SKU already exist"}})
                return;
            }
            ProductService.createProduct(this.state).then(res=>{
                if(res.status==200){
                    this.props.history.push('/product',{status:'success',msg:"Product created successfuly"})
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
    toggleCheckbox(event) {
        
        let newValue = (this.state.fields.is_service === "on" || this.state.fields.is_service === true) ? false : true;
        let fields=this.state.fields;
        fields[event.target.id]=newValue
        this.setState({
            fields: fields
        });
        
      }
    
    render(){
        return(<Container fluid className="main-content-container px-4">
         
        <div className="col-md-6 col-sm-12 mx-auto border border-info">
             {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Product Add" subtitle="Products" className="text-sm-left" />
        </Row>  
          <form onSubmit={this.handleSubmit}>
          <FormGroup>
              <label>Product Name</label>
              <input type="text" palceholder="Product name" name="name" id="name" onChange={this.handleChange} className="form-control"/>
              {this.validator.message('name',this.state.fields.name,"required")}
              
              </FormGroup>
              <FormGroup>
              <label>sku</label>
              <input type="text" className="form-control" palceholder="SKU" name="sku" id="sku" onChange={this.handleChange}/>
              {this.validator.message('sku',this.state.fields.sku,"required")}
              <span style={{color:'red'}}>  
              {this.state.errors.skuError}</span>
              </FormGroup>
              <FormGroup>
              <label>Description</label>
              <textarea className="form-control" name="description" id="description" onChange={this.handleChange}></textarea>
             
              
              </FormGroup>
              <FormGroup>
              <label>Messure Unit</label>
              <select className="form-control"  name="unit" id="unit" onChange={this.handleChange}>
                  <option value="">--Select unit--</option>
                  <option value="kg">Kilo gram</option>
                  <option value="gm">Gram</option>
                  <option value="lit">Litter</option>
                  <option value="lb">Pound</option>
                  <option value="pisces">Pisces</option>
              </select>    
              {this.validator.message('Unit',this.state.fields.unit,"required")}
              </FormGroup>
              <FormGroup>
              <label>Unit Price<small>(Enter each {this.state.fields.unit?this.state.fields.unit:'unit'} price)</small></label>
              <input type="text" className="form-control" palceholder="Price" name="price" id="price" onChange={this.handleChange}/>
              {this.validator.message('price',this.state.fields.price,"required|numeric")}
              </FormGroup>
              <FormGroup>
              <label>Product Image</label>
              <input type="file" className="form-control"  name="pimage" id="pimage" onChange={this.selectImage} accept="image/*"/>
              <span style={{color:'red'}}>{this.state.errors.imageError}</span>
              </FormGroup>
                            
              <FormGroup>
              
              <label>Minimum Order</label>
              <div class="input-group">
              <input type="text" className="form-control"  name="minimum_order" id="minimum_order" onChange={this.handleChange}/>
              <div className="col-md-3">{this.state.fields.unit}</div>
              
              </div>
              {this.validator.message('Minimum order',this.state.fields.minimum_order,"required|numeric")}
              </FormGroup>
              <FormGroup>
              <label htmlFor="is_service"  className="col-md-12 nopadding">
                  <div className="col-md-12  nopadding">
                   <div className="col-md-1 nopadding text-left float-left"></div> 
                   <div className="col-md-7  nopadding text-left float-left" >  
                  <input type="checkbox" style={{width:'auto'}}  className="form-control float-left"  name="is_service" id="is_service" onClick={this.toggleCheckbox.bind(this)}/>
                  &nbsp;&nbsp;&nbsp;  Is there Extra Service?
                        </div>
                  </div>
              </label>
              
              
              </FormGroup>
              <div className={this.state.fields.is_service?'':'hidden'}>
              <FormGroup>
              <label>Service Name</label>
              <input type="text" className="form-control"  name="service_name" id="service_name" onChange={this.handleChange}/>
              
              <span style={{color:'red'}}>{this.state.errors.serviceNameError}</span>
              </FormGroup>
              <FormGroup>
              <label>Service Cost</label>
              <input type="text" className="form-control"  name="service_cost" id="service_cost" onChange={this.handleChange} />
              {this.validator.message('service_cost',this.state.fields.service_cost,"numeric")}
              <span style={{color:'red'}}>{this.state.errors.serviceCostError}</span>
              </FormGroup>
              </div>
              <FormGroup>
              <label>Category</label>
              <select className="form-control"  name="category_id" id="category_id" onChange={this.handleChange}>
                  <option>--Select Category--</option>

                  {this.state.categories.map((category,index)=>{
                     
                      return <option key={index} value={category.id}>{category.name}</option>
                  })}
              </select>
              {this.validator.message('category_id',this.state.fields.category_id,"required")}
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
import React,{Component} from 'react';
import { FormGroup,Container,Row } from "shards-react";
import PageTitle from "../common/PageTitle";
import SimpleReactValidator from 'simple-react-validator';
import ProductService from '../../services/productService'
import CategoryService from '../../services/categoryService'
import config from '../../config'
export default class ProductAdd extends Component{
    constructor(props){
    
        super(props);
        this.state={
           fields:{},
           errors:{},
           catagories:[],
           product:{},
           images: [],
           is_service:0,
           min_order : ''
        }
        this.validator=new SimpleReactValidator();
     }

     async componentWillMount(){
        let response=await CategoryService.getProductCategory();
        if(response.data.status==200){
            this.setState({catagories:response.data.categories})

        }
        const id = this.props.match.params.id 
        
        ProductService.singleProduct(id).then(res=>{
                  if(res.data.status==200){
                    this.setState({fields:res.data.product})
                    this.setState({min_order:this.state.fields.dis_min_order})
                  }
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
        if(id==='minimum_order'){
            /* let u=fields['unit']
            if(parseFloat(event.target.value)<1){
                let t =  event.target.value*1000;
                
                if(fields['unit']=='kg')
                    u='gram'
                else if(fields['unit']=='gm')    
                    u='mg'
                else if(fields['unit']=='lit')    
                    u='ml'
                fields.dis_min_order = t+u
                this.setState({min_order:t+u})
            }
            else{
                fields.dis_min_order = event.target.value+u
                this.setState({min_order:''})
            } */
            fields.dis_min_order = this.convertUnit(event.target.value,fields['unit'])
        }
        //console.log(fields)
        fields[event.target.id]=event.target.value;
        this.setState({
         fields
        })
        
    }
    convertUnit=(val,unit)=>{
        let u=unit
        let cunit=val+u
        if(parseFloat(val)<1){
            let t =  val*1000;
            
            if(unit=='kg')
                u='gram'
            else if(unit=='g')    
                u='mg'
            else if(unit=='lit')    
                u='ml'
                cunit = t+u
            this.setState({min_order:t+u})
        }
        else{
            cunit = val+u
            this.setState({min_order:''})
        }
        return cunit
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
            
            if(this.state.fields.dis_min_order==null ){
                let fields = this.state.fields
                fields.dis_min_order = this.convertUnit(this.state.fields.minimum_order,this.state.fields.unit)
                this.setState({fields})
            }  
            let response = await ProductService.countSku(this.state.fields.sku,this.state.fields.id);  
             if(this.state.fields.is_service){
                
                if(typeof this.state.fields.service_name=='undefined' || this.state.fields.service_name==""){
                        
                    this.setState({errors:{serviceNameError:"Please enter service name"}})
                    return;
                }
                else if(this.state.fields.service_cost==undefined || this.state.fields.service_cost==""){
                    
                    this.setState({errors:{serviceCostError:"Please enter service cost"}})
                    return
                }
                                
            }
            this.setState({error:{}})
            if(response.data.count>0){
                this.setState({errors:{skuError:"SKU already exist"}})
                return;
            }
            
            ProductService.editProduct(this.state).then(res=>{
                if(res.status==200){
                    this.props.history.push('/product/edit/'+this.state.fields.id,
                    {status:'success',msg:"Product edited successfuly"})
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
        
        let newValue = event.target.checked ? true : false;
        let fields=this.state.fields;
        fields[event.target.id]=newValue
        
        this.setState({
            fields: fields
        });
        
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
             
              
              </FormGroup>
              <FormGroup>
              <label>Messure Unit</label>
              <select  value={this.state.fields.unit} className="form-control"  name="unit" id="unit" onChange={this.handleChange}>
                  <option value="">--Select unit--</option>
                  <option value="kg" >Kilo gram</option>
                  <option value="g">Gram</option>
                  <option value="lit">Litter</option>
                  <option value="lb">Pound</option>
                  <option value="pisces">Pisces</option>
              </select>    
              {this.validator.message('Unit',this.state.fields.unit,"required")}
              </FormGroup>
              <FormGroup>
              <label>Unit Price<small>(Enter each {this.state.fields.unit?this.state.fields.unit:'unit'} price)</small></label>
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
              <div className="input-group">
              <input defaultValue={this.state.fields.minimum_order} type="text" className="form-control"  name="minimum_order" id="minimum_order" onChange={this.handleChange}/>
              <div className="col-md-3">{this.state.fields.unit}</div>
              <div className="col-md-12">{this.state.min_order}</div>
              </div>
              {this.validator.message('Minimum order',this.state.fields.minimum_order,"required|numeric")}
              </FormGroup>
              
              <FormGroup>
              <label htmlFor="is_service"  className="col-md-12 nopadding">
                  <div className="col-md-12  nopadding">
                   <div className="col-md-1 nopadding text-left float-left"></div> 
                   <div className="col-md-7  nopadding text-left float-left" >  
                  <input type="checkbox" style={{width:'auto'}} defaultChecked={this.state.fields.is_service} className="form-control float-left"  name="is_service" id="is_service" onClick={this.toggleCheckbox.bind(this)}/>
                  &nbsp;&nbsp;&nbsp;  Is there Extra Service?
                        </div>
                  </div>
              </label>
              
              
              </FormGroup>
              <div className={this.state.fields.is_service==1 || this.state.fields.is_service?'':'hidden'}>
              <FormGroup>
              <label>Service Name</label>
              <input type="text" className="form-control" defaultValue={this.state.fields.service_name}  name="service_name" id="service_name" onChange={this.handleChange}/>
              
              <span style={{color:'red'}}>{this.state.errors.serviceNameError}</span>
              </FormGroup>
              <FormGroup>
              <label>Service Cost</label>
              <input type="text" className="form-control" defaultValue={this.state.fields.service_cost}   name="service_cost" id="service_cost" onChange={this.handleChange} />
              {this.validator.message('service_cost',this.state.fields.service_cost,"numeric")}
              <span style={{color:'red'}}>{this.state.errors.serviceCostError}</span>
              </FormGroup>
              </div>
               
              <FormGroup>
              <label>Category</label>
              <select value={this.state.fields.category_id} className="form-control"  name="category_id" id="category_id" onChange={this.handleChange}>
                  <option>--Select Category--</option>

                  {this.state.catagories.map((category,index)=>{
                      return <option key={index} value={category.id}>{category.name}</option>
                  })}
              </select>
              {this.validator.message('Category',this.state.fields.category_id,"required")}
              </FormGroup>
              <FormGroup>
              <label>Stock Status</label>
              <select value={this.state.fields.status} className="form-control"  name="status" id="status" onChange={this.handleChange}>
                  <option>--Select Product Status--</option>
                  <option value='1'>In Stock</option>
                  <option value='0'>Out of Stock</option>
              </select>
              {this.validator.message('Category',this.state.fields.category_id,"required")}
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
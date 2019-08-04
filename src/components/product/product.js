import React,{Component} from 'react';
import ProductService from '../../services/productService'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../common/PageTitle";
import config from '../../config'
import AlertMessage from '../util/alert-message'

import DataTable from 'react-data-table-component';

export default class Product extends Component{
    constructor(props){
        super(props);
        this.state={plist:[],products:[]}
        console.log(ProductService)
    }
    componentWillMount(){
      this.getAllProduct()
    }
    getAllProduct=()=>{
          ProductService.getProducts().then(res=>{
            console.log(res.data)
            this.setState({plist:res.data.products})
            this.setState({products:res.data.products})
        })
        .catch(error=>{
            
        })
    }
    searchProduct=(e)=>{
        let tval=e.target.value;
        if(tval==""){
          this.setState({plist:this.state.products})
          return
        }
        let plist=[]
        for(let val of this.state.products){
              
              if((val['sku']).toUpperCase().indexOf(tval.toUpperCase())==0 || val['name'].toUpperCase().indexOf(tval.toUpperCase())==0){
                  plist.push(val)
              }
          
                 
        } 
        this.setState({plist:plist})
        
    } 
    deleteProduct=(_id)=>{
     
      ProductService.deleteProduct(_id).then(res=>{
       
        if(res.status==200){
         // this.props.history.location.state.msg="Product Deleted successfully";
          this.getAllProduct()
        } 
      })
    }

    addProduct=()=>{
     
      this.props.history.push('/product/add')
    }
    render(){
      const columns = [
                         {
                          name: 'SKU',
                          selector: 'sku',
                          sortable: true,
                         },
                         {
                          name: 'Name',
                          selector: 'name',
                          sortable: true,
                         },
                         {
                          name: 'Price',
                          selector: 'price',
                          sortable: true,
                         },
                         {
                           name:'Image',
                           cell:row=><img src={config.API_URL+"/uploads/pimages/"+row.image} width="55"/>
                         },
                         {
                          name:'Unit',
                          selector: 'unit',
                          sortable: true,
                        },
                         {
                          name:'Action',
                          cell:row=><Link  to={`/product/edit/${row.id}`} className='btn btn-info'>Edit</Link>
                              
                        },
                        {
                          name:'',
                          cell:row=> <button  className='btn btn-danger' onClick={()=>this.deleteProduct(row.id)}>Delete</button>
                        }
                        
                        
                
                      ];
      
        return(<Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <AlertMessage prop={this.props}></AlertMessage>
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Product List" subtitle="Products" className="text-sm-left" />
        </Row>
    
        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
               
                <button className="btn btn-info float-left"  onClick={this.addProduct}>Add product</button>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <div className="col-md-4 float-right mt-10" style={{marginTop:20}}><input type="search" placeholder="Search" className="form-control" onKeyUp={this.searchProduct}/></div>
              <DataTable
                  pagination={true}
                  
                  columns={columns}
                  data={this.state.plist}
                  
                />
                
              </CardBody>
             </Card>
             </Col>
            </Row>
        </Container>)
    }
}
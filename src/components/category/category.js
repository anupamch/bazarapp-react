import React,{Component} from 'react';
import CategoryService from '../../services/categoryService'
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Link } from 'react-router-dom';
import PageTitle from "../common/PageTitle";
import config from '../../config'
import AlertMessage from '../util/alert-message'
import DataTable from 'react-data-table-component';

export default class Category extends Component{
    constructor(props){
        super(props);
        this.state={plist:[],category:[]}
        
    }
    componentWillMount(){
      this.getAllCategory()
    }
    getAllCategory=()=>{
          CategoryService.getProductCategory().then(res=>{
           this.setState({plist:res.data.categories})
            this.setState({category:res.data.categories})
        })
        .catch(error=>{
            
        })
    }
    searchProduct=(e)=>{
        let tval=e.target.value;
        if(tval==""){
          this.setState({plist:this.state.category})
          return
        }
        let plist=[]
        for(let val of this.state.category){
              
              if(val['name'].toUpperCase().indexOf(tval.toUpperCase())==0){
                  plist.push(val)
              }
          
                 
        } 
        this.setState({plist:plist})
        
    } 
    deleteCategory=(_id)=>{
      if (window.confirm('Are you sure you wish to delete this category?')){
          CategoryService.deleteCategory(_id).then(res=>{
          
            if(res.status==200){
            // this.props.history.location.state.msg="Product Deleted successfully";
              this.getAllCategory()
            } 
          })
      }
    }

    addCategory=()=>{
     
      this.props.history.push('/category-add')
    }
    render(){
      const columns = [
                         {
                          name: '#ID',
                          selector: 'id',
                          sortable: true,
                         },
                         {
                          name: 'Name',
                          selector: 'name',
                          sortable: true,
                         },
                         {
                          name: 'Image',
                          cell:row=><img 
                                   src={config.API_URL+'/uploads/category_image/'+row.id+'.jpg'} 
                                   width="50px" 
                                   height="50px"/>,
                         
                         },
                         
                         {
                          name:'Action',
                          cell:row=><Link to={`/category-edit/${row.id}`} className='btn btn-info'>Edit</Link>
                              
                        },
                        {
                          name:'',
                          cell:row=> <button  className='btn btn-danger' onClick={()=>this.deleteCategory(row.id)}>Delete</button>
                        }
                        
                        
                
                      ];
      
        return(<Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <AlertMessage prop={this.props}></AlertMessage>
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Category List" subtitle="Categories" className="text-sm-left" />
        </Row>
    
        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
               
                <button className="btn btn-info float-left"  onClick={this.addCategory}>Add Category</button>
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
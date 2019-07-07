import React,{Component} from 'react';
import ProductService from '../../services/productService'
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../common/PageTitle";
export default class Product extends Component{
    constructor(props){
        super(props);
        this.state={ulist:[]}
        console.log(ProductService)
    }
    componentWillMount(){
      ProductService.getProducts().then(res=>{
                console.log(res.data)
                this.setState({plist:res.data.products})
            })
            .catch(error=>{
                
            })
    }

    render(){
         let trows="";
         if(this.state.plist && this.state.plist.length>0){
          trows=this.state.plist.map((listvalue,index)=>{
            return  <tr key={index}>
                        <td>{index+1}</td>
                        <td>{listvalue.firstName}</td>
                        <td>{listvalue.lastName}</td>
                        <td>{listvalue.address}</td>
                        <td>{listvalue.phone}</td>
                        <td>{listvalue.landmark}</td>
                        </tr>
        })
      }else{
        trows= <tr key={'1'}>
        <td colSpan="7">No Record found</td>
        </tr>
      }
        return(<Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Product List" subtitle="Products" className="text-sm-left" />
        </Row>
    
        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Product List</h6>
                <a className="btn btn-info float-right" href="/product-add">Add product</a>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Product Name
                      </th>
                      <th scope="col" className="border-0">
                        Image
                      </th>
                      <th scope="col" className="border-0">
                        Price
                      </th>
                      <th scope="col" className="border-0">
                        Category
                      </th>
                      <th scope="col" className="border-0">
                      unit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                       trows
                      }
                      
        
                </tbody>
                </table>
              </CardBody>
             </Card>
             </Col>
            </Row>
        </Container>)
    }
}
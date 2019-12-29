import React,{Component} from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Link } from 'react-router-dom';
import PageTitle from "../common/PageTitle";

import AlertMessage from '../util/alert-message'
import OrderService from '../../services/orderService'
import DataTable from 'react-data-table-component';
export default class Orders extends Component{
     constructor(props){
        super(props)
        this.state={olist:[]}
     }

     componentWillMount(){
        this.getOrders()
      }

      getOrders=()=>{
          OrderService.getOrders().then(res=>{
              
              this.setState({olist:res.data.orders})
          }).catch(error=>{
            
          })
      }

      render(){
         
        const columns = [
                            {
                                name: '#',
                                selector: 'id',
                                sortable: true,
                            },
                            {
                                name: 'Phone',
                                selector: 'user.phone',
                                sortable: true,
                            },
                            {
                                name: 'Payment Status',
                                selector: 'payment_status',
                                cell:row=>row.payment_status?'Paid':'Pending',
                                sortable: true,
                            },
                            
                            {
                                name: 'item number',
                                selector: 'item_number',
                                sortable: true,
                            },
                            {
                                name: 'Total(Rs.)',
                                selector: 'total_cost',
                                cell:row=>(parseFloat(row.total_cost)).toFixed(2),
                                sortable: true,
                            },
                            {
                                name: 'Delivery',
                                selector: 'delivery_date',
                                cell:row=>{let ddate=new Date(row.delivery_date)
                                            let monthNames = [
                                                "January", "February", "March",
                                                "April", "May", "June", "July",
                                                "August", "September", "October",
                                                "November", "December"
                                            ];
                                            let day = ddate.getDate();
                                            let monthIndex = ddate.getMonth();
                                            let year = ddate.getFullYear();
                                            return day + ' ' + monthNames[monthIndex] + ' ' + year;
                                          },
                                sortable: true,
                            },
                            {
                             name:'Action',
                             cell:row=><div><Link  to={`/orders/details/${row.id}`} className='btn btn-info'>Details</Link></div>
                                 
                           }

                        ]
         return (<Container fluid className="main-content-container px-4">
             <AlertMessage prop={this.props}></AlertMessage>
            <Row noGutters className="page-header py-4">
               <PageTitle sm="4" title="Order List" subtitle="Orders" className="text-sm-left" />
            </Row>

            <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                             
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <div className="col-md-4 float-right mt-10" style={{marginTop:20}}><input type="search" placeholder="Search" className="form-control" onKeyUp={this.searchProduct}/></div>
              <DataTable
                  pagination={true}
                  
                  columns={columns}
                  data={this.state.olist}
                  
                />
                
              </CardBody>
             </Card>
             </Col>
            </Row>
         </Container>) 
      }
}
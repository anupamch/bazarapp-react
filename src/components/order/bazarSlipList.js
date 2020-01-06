import React,{Component} from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Link } from 'react-router-dom';
import PageTitle from "../common/PageTitle";

import AlertMessage from '../util/alert-message'
import OrderService from '../../services/orderService'
import DataTable from 'react-data-table-component';
export default class BazarSlipList extends Component{
    constructor(props){
       super(props)
       this.state={olist:[],orders:[]}
    }
    componentWillMount(){
        this.getBazarSlip()
    }
    getBazarSlip=()=>{
        OrderService.getBazarSlip().then(res=>{
            console.log(res.data.orders)
            this.setState({olist:res.data.orders,orders:res.data.orders})
        }).catch(error=>{
          
        })
    }
    searchOrder=(e)=>{
        let tval=e.target.value;
        if(tval==""){
          this.setState({olist:this.state.orders})
          return
        }
        let olist=[]
        for(let val of this.state.orders){
              
              if((val['id']).toUpperCase().indexOf(tval.toUpperCase())===0 || 
                  val['user']['phone'].toUpperCase().indexOf(tval.toUpperCase())===0){
                  olist.push(val)
              }
          
                 
        } 
        this.setState({olist:olist})
        
    }

    render(){
       const columns = [
                            {
                                name: '#Slip Id',
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
                                name: 'Devivery Status',
                                selector: 'devivery_status',
                                cell:row=>row.delivery_status?'Delivered':'Pending',
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
                                name: 'Order Date',
                                selector: 'created_at',
                                cell:row=>{let ddate=new Date(row.createdAt)
                                    console.log(row.created_at)
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
                             cell:row=><div><Link  to={`/orders/slip-details/${row.id}`} className='btn btn-info'>Details</Link></div>
                                 
                           }

                        ]
         return (<Container fluid className="main-content-container px-4">
             <AlertMessage prop={this.props}></AlertMessage>
            <Row noGutters className="page-header py-4">
               <PageTitle sm="4" title="Slip List" subtitle="Bazar Slip List" className="text-sm-left" />
            </Row>

            <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                             
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <div className="col-md-4 float-right mt-10" style={{marginTop:20}}>
                  <input type="search" placeholder="Search" 
                  className="form-control" onKeyUp={this.searchOrder}/>
                </div>
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
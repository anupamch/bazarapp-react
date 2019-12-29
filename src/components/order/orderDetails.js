import React, { Component } from "react";
import {
  Container,
  Row} from "shards-react";
import PageTitle from "../common/PageTitle";

import AlertMessage from "../util/alert-message";
import OrderService from "../../services/orderService";
import DataTable from "react-data-table-component";
export default class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { order: null };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    OrderService.singleOrder(id).then(res => {
      this.setState({ order: res.data.order });
      //console.log(this.state.order);
    });
  }

   handleDeliveryChange= (event, id, order_id,product_price,total_price )=> {
     
    if(this.state.order.payment_status===false)
    {
       alert('If payment status is paid then you can change the delivery status.')
       return
    } 
    const pstatus = event.target.value;
    if (window.confirm("Are you sure to change delivery status?")) {
      OrderService.changeDeliveryStatus(id,order_id, pstatus,product_price,total_price).then(res => {
        if (res.status === 200) {
          window.location.href = "/orders/details/" + order_id;
        }
      });
    }
  };

  handlePaymentChange = event => {
    const id = this.props.match.params.id;
    const pstatus = event.target.value;
    if (window.confirm("Are you sure to change the status?")) {
      OrderService.changePaymentStatus(id, pstatus).then(res => {
        if (res.status === 200) {
          window.location.href = "/orders/details/" + id;
        }
      });
    }
  };

  render() {
    let hdata = "";
    if (this.state.order !== null) {
      const columns = [
        {
          name: "#SKU",
          cell: row => row.Product.sku,
          sortable: true
        },
        {
          name: "Name",
          cell: row => row.Product.name,
          sortable: true
        },
        {
          name: "Category",
          cell: row => row.Product.ProductCategory.name,
          sortable: true
        },
        {
          name: "Unit Price(Rs.)",
          cell: row => parseFloat(row.unit_price).toFixed(2),
          sortable: true
        },
        
        {
          name: "Amount",
          cell: row => row.item_count + row.product_unit,
          sortable: true
        },
        {
         name: "Ex.Service",
         cell: row => row.Product.service_name
       },
        {
          name: "Service Cost",
          cell: row => parseFloat(row.service_cost).toFixed(2)
        },

        {
          name: "Total Price",
          cell: row => parseFloat(row.total_price).toFixed(2),
          sortable: true
        },
        {
          name: "Delivery Status",
          cell: row => {
            
            return (
              <select
                value={row.delivery_status}
                onChange={e => this.handleDeliveryChange(e, row.id, row.order_id,
                  row.total_price,this.state.order.payable_cost)}
                autoComplete="off"
              >
                <option value="false">Pending</option>
                <option value="true">Delivered</option>
              </select>
            );
          },
          sortable: true
        }
      ];
      let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      let date = new Date(this.state.order.createdAt);
      let d_date = new Date(this.state.order.delivery_date);
      let day = date.getDate();
      let monthIndex = date.getMonth();
      let year = date.getFullYear();
      let order_date = day + " " + monthNames[monthIndex] + "," + year;
      day = d_date.getDate();
      monthIndex = d_date.getMonth();
      year = d_date.getFullYear();
      let delivery_date = day + " " + monthNames[monthIndex] + "," + year;
      hdata = (
        <div className="row order-details-container">
          <div className="col-md-6 col-sm-12">
            <h5>User Details</h5>
            <div className="col-md-12 col-sm-12 shaded-row">
              <div className="row">
                <div className="col-md-5">User Name:</div>
                <div className="col-md-6">
                  {this.state.order.user.first_name}
                  {this.state.order.user.last_name}
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">Phone:</div>
                <div className="col-md-6">{this.state.order.user.phone}</div>
              </div>
              <div className="row">
                <div className="col-md-5">Email:</div>
                <div className="col-md-6">{this.state.order.user.email}</div>
              </div>
              <div className="row">
                <div className="col-md-5">Delivery Address:</div>
                <div className="col-md-6">{this.state.order.address.split(',').map(function(item, key) {
                return (
                  <span key={key}>
                    {item}
                    <br/>
                  </span>
                )
              })}
              </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <h5>Order Summery</h5>
            <div className="col-md-12 col-sm-12 shaded-row">
              <div className="row">
                <div className="col-md-5">Order Date:</div>
                <div className="col-md-6">{order_date}</div>
              </div>
              <div className="row">
                <div className="col-md-5">Delivery Date:</div>
                <div className="col-md-6">{delivery_date}</div>
              </div>
              <div className="row">
                <div className="col-md-5">Delivery Slot:</div>
                <div className="col-md-6">
                  {this.state.order.DeliverySlot.slot}
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">Total Cost:</div>
                <div className="col-md-6">
                  Rs.{parseFloat(this.state.order.total_cost).toFixed(2)}
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">Delivery Charge:</div>
                <div className="col-md-6">
                  Rs.{parseFloat(this.state.order.delivery_charge).toFixed(2)}
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">Discount:</div>
                <div className="col-md-6">
                  Rs.{parseFloat(this.state.order.discount_cost).toFixed(2)}
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">Payable Price:</div>
                <div className="col-md-6">
                  Rs.{parseFloat(this.state.order.payable_cost).toFixed(2)}
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  Payment Status:{this.state.order.payment_status}
                </div>
                <div className="col-md-6">
                  {this.state.order.payment_status}
                  <select
                    name="payment_status"
                    value={this.state.order.payment_status}
                    onChange={this.handlePaymentChange}
                    autoComplete="off"
                  >
                    <option value="false">Not Paid</option>
                    <option value="true">Paid</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">Payment Mode:</div>
                <div className="col-md-6">{this.state.order.payment_mode}</div>
              </div>
              <div className="row">
                <div className="col-md-5">Total Item:</div>
                <div className="col-md-6">{this.state.order.item_number}</div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12">&nbsp;</div>
          <div className="col-md-12 col-sm-12">
            <h5>Item Details</h5>
            <DataTable
              pagination={false}
              columns={columns}
              data={this.state.order.OrderDetails}
            />
          </div>
         
         
            <div className="col-md-12 col-sm-12">
            
              Total: Rs.{parseFloat(this.state.order.payable_cost).toFixed(2)}<br/>
              Status: {this.state.order.payment_status?<span className="paid">Paid</span>:
              <span className="not_paid">Not Paid</span>}
            </div>  
           
         
          <div className="col-md-12 col-sm-12" style={{textAlign:"center"}}>
          <a href="/orders" className="btn btn-danger">
            Back
          </a>
          </div>
          <div className="col-md-9 col-sm-12">&nbsp;</div>
        </div>
      );
    } else {
      hdata = <div>Loading....</div>;
    }

    return (
      <Container fluid className="main-content-container px-4">
        <div className="col-md-12 col-sm-12  mx-auto border border-info">
          <AlertMessage prop={this.props}></AlertMessage>
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="Order Details"
              subtitle="Order"
              className="text-sm-left"
            />
          </Row>
          {hdata}
          
        </div>
      </Container>
    );
  }
}

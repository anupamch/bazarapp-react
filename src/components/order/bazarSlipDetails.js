import React, { Component } from "react";
import {
  Container,
  Row} from "shards-react";
import PageTitle from "../common/PageTitle";

import AlertMessage from "../util/alert-message";
import OrderService from "../../services/orderService";
import config from '../../config'
export default class BazarSlipDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { order: null,inputValue:'' };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    OrderService.singleBazarSlip(id).then(res => {
      this.setState({ order: res.data.order });
      let {
           total_cost,
           payable_cost,
           discount_cost,
           delivery_charge,
           payment_status,
           delivery_status,
           item_count
        } = res.data.order
      let inputVal ={total_cost,
                        payable_cost,
                        discount_cost,
                        delivery_charge,
                        payment_status,
                        delivery_status,
                        item_count,
                        id:id
                    }
       this.setState({inputValue:inputVal})    
       console.log(this.state.inputValue)         
    });
  }

  updateInputValue=(event)=> {
   
    let inputValue=this.state.inputValue;
    inputValue[event.target.id]=event.target.value;
        this.setState({
            inputValue
        })  
    
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

  handleSlipDetailsChange = () => {
      
      OrderService.updateBazarSlip(this.state.inputValue)
                  .then(res=>{
                    if (res.status === 200) {
                        window.location.href = "/orders/slip-details/" + this.state.inputValue.id;
                      }
                  })
  };

  render() {
    let hdata = "";
    if (this.state.order !== null) {
      
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
                <div className="col-md-5">Total Cost(Rs.):</div>
                <div className="col-md-6">
                <input type="number" 
                         defaultValue={this.state.inputValue.total_cost} 
                         id="total_cost" 
                         onChange={this.updateInputValue}/>
                  
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">Delivery Charge(Rs.):</div>
                <div className="col-md-6">
                <input type="number" 
                         defaultValue={this.state.inputValue.delivery_charge} 
                         id="delivery_cost" 
                         onChange={this.updateInputValue}/> 
                 
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">Discount(Rs.):</div>
                <div className="col-md-6">
                <input type="number" 
                         defaultValue={this.state.inputValue.discount_cost} 
                         id="discount" 
                         onChange={this.updateInputValue}/> 
                 
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">Payable Price(Rs.):</div>
                <div className="col-md-6">
                <input type="number" 
                         defaultValue={this.state.inputValue.payable_cost} 
                         id="payable_cost" 
                         onChange={this.updateInputValue}/> 
                 
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  Payment Status:
                </div>
                <div className="col-md-6">
                  
                  <select
                    id="payment_status"
                    value={this.state.inputValue.payment_status}
                    onChange={this.updateInputValue}
                    autoComplete="off">
                    <option value="false">Not Paid</option>
                    <option value="true">Paid</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  Delivery Status:
                </div>
                <div className="col-md-6">
                 
                  <select
                    id="delivery_status"
                    value={this.state.inputValue.delivery_status}
                    onChange={this.updateInputValue}
                    autoComplete="off"
                  >
                    <option value="false">Pending</option>
                    <option value="true">Delivered</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">Payment Mode:</div>
                <div className="col-md-6">{this.state.order.payment_mode}</div>
              </div>
              <div className="row">
                <div className="col-md-5">Total Item:</div>
                <div className="col-md-6">
                   
                    <input type="text" 
                         defaultValue={this.state.inputValue.item_count} 
                         id="item_count" onChange={this.updateInputValue}/> 
                </div>
              </div>
              <div className="row">
                  <div className="col-md-12" >
                    <button className="btn btn-success" 
                            onClick={this.handleSlipDetailsChange}>
                        Save
                    </button>
                  </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12">&nbsp;</div>
         
          <div className="col-md-12 col-sm-12">
            <h5>Slip in Text</h5>
            <div className="col-md-12 col-sm-12 shaded-row">
                {this.state.order.slip_text.split(',').map(function(item, key) {
                    return (
                    <span key={key}>
                        {item}
                        <br/>
                    </span>
                    )
              })}
            </div>
          </div>
          <div className="col-md-12 col-sm-12">&nbsp;</div>
          <div className="col-md-12 col-sm-12">
            <h5>Slip in Image</h5>
            <div className="col-md-12 col-sm-12 shaded-row">
                <img src={config.API_URL+'/uploads/bazar_slip/'+this.state.order.slip_image} />
            </div>
          </div>               
             
           
         
          <div className="col-md-12 col-sm-12" style={{textAlign:"center"}}>
          <a href="/orders/bazar-slip-list" className="btn btn-danger">
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
              title="Slip Details"
              subtitle="Slip"
              className="text-sm-left"
            />
          </Row>
          {hdata}
          
        </div>
      </Container>
    );
  }
}

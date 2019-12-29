import axios from 'axios'
import config from '../config'
class OrderService{
constructor(){}
    static getOrders()
    {
       return axios.get(config.API_URL+'/get-orders')
       
    }

    static singleOrder(id){
        
        return axios.get(config.API_URL+'/get-order-details/'+id)
    }

    static changePaymentStatus(id,payment_status){
        
       
        return axios({
            method: 'post',
            url: config.API_URL+'/change-order-payment-status',
            data: {order_id:id,payment_status:payment_status}
           
            })
    }

    static changeDeliveryStatus(id,order_id,delivery_status,product_price,total_price){
        
       
        return axios({
            method: 'post',
            url: config.API_URL+'/change-order-delivery-status',
            data: {id:id,order_id:order_id,delivery_status:delivery_status,
                   product_price:product_price,total_price:total_price}
            
            })
    }

    
}

export default OrderService
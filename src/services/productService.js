import axios from 'axios'
import config from '../config'
class ProductService{
    constructor(){}
       
    static getProducts()
    {
        return axios.get(config.API_URL+'/products')
    }

    static createProduct(form){
         //console.log(form)
         var fdata=new FormData();
         
         fdata.set('fields',JSON.stringify(form.fields))
        
         fdata.append('pimage',form.images[0],form.images[0].name)
         
        return axios({
            method: 'post',
            url: config.API_URL+'/create-product',
            data: fdata,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
    }

    static  countSku(sku,id){
        let params='sku='+sku;
        if(typeof id!='undefined')
        params+="&id="+id
        return axios({
                 method:"get",
                 url:config.API_URL+'/skuCount/?'+params,
                 
             }) 
            
            
    }

    static singleProduct(id){
        return axios.get(config.API_URL+'/get-single-product/'+id)
    }

    static editProduct(form){
        console.log(JSON.stringify(form.fields))
        var fdata=new FormData();
       
       fdata.set('fields',JSON.stringify(form.fields))  
       if(typeof form.images[0] != 'undefined'){
         fdata.append('pimage',form.images[0],form.images[0].name)
         console.log('sdsd')
       }
       
       return axios({
           method: 'post',
           url: config.API_URL+'/edit-product',
           data: fdata,
           config: { headers: {'Content-Type': 'multipart/form-data' }}
           })
   }

   static deleteProduct(id){
    return axios.get(config.API_URL+'/delete-product/'+id)
   }
}

export default ProductService;
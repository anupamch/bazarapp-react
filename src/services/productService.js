import axios from 'axios'
import config from '../config'
class ProductService{
    constructor(){}
    static getProductCategory()
    {
       return axios.get(config.API_URL+'/get-product-category')
       
    }
   
    static getProducts()
    {
        return axios.get(config.API_URL+'/products')
    }

    static createProduct(form){
         console.log(form)
         let fdata=new FormData();
         const header = {
                          headers: {'content-type': 'multipart/form-data' }
                        };
         fdata.set('fields',JSON.stringify(form.fields))
         fdata.set('pimage',form.images[0])
         axios.post(config.API_URL+'/create-product',fdata,header).then(res=>{
             
         })
    }

    uploadProductImages(images){
           
    }
}

export default ProductService;
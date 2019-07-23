import axios from 'axios'
import config from '../config'
class CategoryService{
constructor(){}
    static getProductCategory()
    {
       return axios.get(config.API_URL+'/get-product-category')
       
    }

    static deleteCategory(id){
        return axios.get(config.API_URL+'/delete-category/'+id)
    }

    static countCategory(name,id){
        let params='name='+name;
        if(typeof id!='undefined')
        params+="&id="+id
        return axios({
                 method:"get",
                 url:config.API_URL+'/count-category/?'+params,
                 
             }) 
    } 
    static createCategory(form){
        
        return axios({
            method: 'post',
            url: config.API_URL+'/create-category',
            data: form,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
    }
}

export default CategoryService
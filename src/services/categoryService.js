import axios from 'axios'
import config from '../config'
class CategoryService{
constructor(){}
    static getProductCategory()
    {
       return axios.get(config.API_URL+'/get-product-category')
       
    }

    static getProductCategoryById(id)
    {
       return axios.get(config.API_URL+'/get-product-category-by-id/'+id)
       
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
        var fdata=new FormData();
         
         fdata.set('fields',JSON.stringify(form.fields))
        
         fdata.append('cimage',form.images[0],form.images[0].name)
        return axios({
            method: 'post',
            url: config.API_URL+'/create-category',
            data: fdata,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
    }

    static editCategory(form){
        var fdata=new FormData();
         
         fdata.set('fields',JSON.stringify(form.fields))
        
         fdata.append('cimage',form.images[0],form.images[0].name)
        return axios({
            method: 'post',
            url: config.API_URL+'/edit-category',
            data: fdata,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
    }
}

export default CategoryService
import axios from 'axios'
import config from '../config'
class UserService{
     static getAllSettings(){
        return axios.get(config.API_URL+'/get-setting')
     }

     static updateSettings(input){
        return axios.post(config.API_URL+'/update-setting',input)
     }
}

export default UserService;
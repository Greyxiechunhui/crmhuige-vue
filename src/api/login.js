import axios from '../http/myaxios'

let login = {

  login(formData) {
    return axios.post(`login`, formData)
  },

  getUserInfo(){
    return axios.get('userInfo')
  }

}

export default login;

import axios from '../http/myaxios'

let menu={
  /**
   *查询所有
   */
  findAll(){
    return axios.get(`menu/menuTree`)
  },
  updateOrAdd(entity){
    if(entity.menuId){
      return axios.put("menu",entity);
    }else {
      return axios.post("menu",entity);
    }

  },
  findById(id){
    return axios.get(`menu/${id}`)
  },
  deleteById(id){
    return axios.delete(`menu/${id}`)
  }
}

export default  menu;

import axios from '../http/myaxios'

let role={
  /**
   *查询所有
   */
  findAll(){
    return axios.get(`role`)
  },
  updateOrAdd(entity){

    if(entity.roleId){
      return axios.put("role",entity);
    }else {
      return axios.post("role",entity);
    }

  },
  findById(id){
    return axios.get(`role/${id}`);
  },
  deleteById(id){
    return axios.delete(`role/${id}`)
  }
}

export default  role;

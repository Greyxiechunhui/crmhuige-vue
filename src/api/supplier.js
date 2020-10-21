import axios from '../http/myaxios'

let category={
  /**
   *查询所有
   */
  findPage(currentPage,pageSize){
    return axios.get(`supplier/page?currentPage=${currentPage}&pageSize=${pageSize}`)
  },
  updateOrAdd(entity){
    if(entity.id){
      return axios.put("supplier",entity);
    }else {
      return axios.post("supplier",entity);
    }

  },
  findById(id){
    return axios.get(`supplier/${id}`)
  },
  deleteById(id){
    return axios.delete(`supplier/${id}`)
  }
}

export default  category;

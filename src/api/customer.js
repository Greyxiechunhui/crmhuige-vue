import axios from '../http/myaxios'

let category={
  /**
   *查询所有
   */
  findPage(currentPage,pageSize){
    return axios.get(`customer/page?currentPage=${currentPage}&pageSize=${pageSize}`)
  },
  updateOrAdd(entity){
    if(entity.id){
      return axios.put("customer",entity);
    }else {
      return axios.post("customer",entity);
    }

  },
  findById(id){
    return axios.get(`customer/${id}`)
  },
  deleteById(id){
    return axios.delete(`customer/${id}`)
  }
}

export default  category;

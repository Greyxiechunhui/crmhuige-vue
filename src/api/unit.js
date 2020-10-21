import axios from '../http/myaxios'

let category={
  /**
   *查询所有
   */
  findPage(currentPage,pageSize){
    return axios.get(`unit/page?currentPage=${currentPage}&pageSize=${pageSize}`)
  },
  updateOrAdd(entity){
    if(entity.id){
      return axios.put("unit",entity);
    }else {
      return axios.post("unit",entity);
    }

  },
  findById(id){
    return axios.get(`unit/${id}`)
  },
  deleteById(id){
    return axios.delete(`unit/${id}`)
  }
}

export default  category;

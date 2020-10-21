import axios from '../http/myaxios'

let category={
  /**
   *查询所有
   */
  findPage(currentPage,pageSize){
    return axios.get(`good/page?currentPage=${currentPage}&pageSize=${pageSize}`)
  },
  updateOrAdd(entity){
    if(entity.goodCode){
      return axios.put("good",entity);
    }else {
      return axios.post("good",entity);
    }

  },
  findById(id){
    return axios.get(`good/${id}`)
  },
  deleteById(id){
    return axios.delete(`good/${id}`)
  },
  findCategoryTree(){
    return axios.get("category/categoryTree")
  }


}

export default  category;

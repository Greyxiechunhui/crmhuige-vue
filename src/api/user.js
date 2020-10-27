import axios from '../http/myaxios'

let user={
  /**
   *查询所有
   */
  findPage(currentPage,pageSize){
    return axios.get(`user/page?currentPage=${currentPage}&pageSize=${pageSize}`)
  },
  updateOrAdd(entity){
    if(entity.userId){
      return axios.put("user",entity);
    }else {
      return axios.post("user",entity);
    }

  },
  findById(id){
    return axios.get(`user/${id}`);
  },
  deleteById(id){
    return axios.delete(`user/${id}`)
  },
  findRoleByUserId(userId){
    return axios.get(`user/${userId}/roles`)
  },
  deleteRoleByRoleIdAndUserId(userId,roleId){
    return axios.delete(`user/${userId}/role/${roleId}`)
  }

}

export default  user;

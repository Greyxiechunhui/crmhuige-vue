import cookie from './cookie'


let tokenKey = "crmToken"

let token={
  setToken(entity){
    cookie.setCookie(tokenKey,entity);
  },


  getToken(){
    return cookie.getCookie(tokenKey);

  },

  removeToken(){
    cookie.removeCookie(tokenKey);
  }

}

export default token;

import cookie from 'vue-cookies';

let cookies = {
  //设置一个cookie
  setCookie(key, value) {
    cookie.set(key, value)
  },
//获取一个cookie
  getCookie(key) {
    return cookie.get(key);
  },

//存在一个cookie
  keyExists(key) {
    return cookie.isKey(key)
  },
  //删除一个cookie
  removeCookie(key){
    cookie.remove(key)
  }

}

export default cookies;

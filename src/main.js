import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//重置css样式
import 'normalize.css/normalize.css'

import 'animate.css/animate.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import iconPicker from 'e-icon-picker';
import "e-icon-picker/dist/symbol.js"; //基本彩色图标库
import 'e-icon-picker/dist/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css'; //element-ui 图标库
import VueParticles from 'vue-particles'

Vue.use(VueParticles)
Vue.use(ElementUI)
Vue.use(iconPicker);

Vue.config.productionTip = false

// 前端自定义指令控制按钮级别权限
Vue.directive('hasPerm', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding) {
    var perm = binding.value;

    let flag = true;
    if (perm && perm instanceof Array && perm.length > 0) {


      perm.forEach(item => {
        flag &= JSON.parse(localStorage.getItem("perm")).some(sysMenu => {
          console.log(sysMenu.perms);
          console.log(item);

          console.log("----------------");
          sysMenu.perms== item
        })
      });

      if(!flag){
        console.log(flag);
        el.remove();
      }
    }

  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

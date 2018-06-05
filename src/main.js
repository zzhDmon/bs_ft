import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'  
//import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$http = axios;

// Vue.prototype.HOST = ''	//打包去除跨域
Vue.prototype.HOST = '/myurl'	//跨域域名
// Vue.prototype.HOST = '/testurl' //本地测试域名

var myCookie=function(cname) {
		  var name = cname + "=";
		  var ca = document.cookie.split(';');
		  for (var i = 0; i < ca.length; i++) {
		   var c = ca[i];
		   while (c.charAt(0) == ' ') c = c.substring(1);
		   if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
		  }
		  return false;
}
router.beforeEach((to, from, next) => {
  if (to.path!=='/login') { // 判断该路由是否需要登录权限
    if (myCookie("59manage")) { // 通过cookie判断是否登录
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
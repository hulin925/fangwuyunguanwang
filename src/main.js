// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import store from './store'

import VueLazyLoad from 'vue-lazyload'
import * as filters from './filters'
Vue.use(VueLazyLoad,{
    error:'https://hly.1000da.com.cn/assets/img/error.jpg',
  loading:'https://web.3fgj.com/imgVue/bgcolor.png'//http://hly.1000da.com.cn/assets/img/loading.gif
  //http://img.zcool.cn/community/03719f3576ce1e40000012e7ed7c4f1.png
})
// 遍历所有导出的过滤器并添加到全局过滤器
// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

import '@/assets/css/reset.css' //global reset.css

FastClick.attach(document.body);

Vue.config.productionTip = false;

//全局方法
Vue.prototype.download = function (){
  // window.location.href="https://web.3fgj.com/sharePage/download1.html";
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    // window.location.href = "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1420408499&mt=8";
    window.location.href = "https://itunes.apple.com/cn/app/%E8%8A%AF%E6%B1%87%E6%B3%95%E5%8A%A1%E4%BA%91/id1420408499?l=zh&ls=1&mt=8";
  }else if (/(Android)/i.test(navigator.userAgent)) {
    window.location.href = "http://android.myapp.com/myapp/detail.htm?apkName=com.w2893097678.zaz";
  }
}
Vue.prototype.$downloadIos = function (){
  // window.location.href="https://web.3fgj.com/sharePage/download1.html";
  //   window.location.href = "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1420408499&mt=8";
    window.location.href = "https://itunes.apple.com/cn/app/%E8%8A%AF%E6%B1%87%E6%B3%95%E5%8A%A1%E4%BA%91/id1420408499?l=zh&ls=1&mt=8";
}
Vue.prototype.$downloadAndroid = function (){
  // window.location.href="https://web.3fgj.com/sharePage/download1.html";
    window.location.href = "http://android.myapp.com/myapp/detail.htm?apkName=com.w2893097678.zaz";
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  filters,
  render: h => h(App)
}).$mount('#app-box');

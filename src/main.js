// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import ReconnectingWebSocket from 'reconnectingwebsocket';

import echarts from 'echarts'
import '../static/base.css'
import '../static/animate.css'
import axios from './axios'

Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$ws = ReconnectingWebSocket;


Vue.config.productionTip = false

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

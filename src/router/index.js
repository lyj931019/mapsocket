import Vue from 'vue'
import Router from 'vue-router'
import Pages from '../pages'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'map',
      component: Pages.Home
    },
  ]
})

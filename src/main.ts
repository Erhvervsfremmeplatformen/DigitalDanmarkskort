import 'dkfds/dist/css/dkfds.min.css';
import Vue from 'vue';
import store from './store';

const App = () => import(/* webpackPreload: true */ './App.vue');

Vue.config.productionTip = false;

const vue = new Vue({
  store,
  render: (h: any) => h(App)
});

vue.$mount('#app');

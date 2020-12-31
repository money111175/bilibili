import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import http from '../http'
import { Toast } from 'vant'
import './components/style.css'

Vue.prototype.$http = http
Vue.prototype.$msg = Toast
    //这样我们就可以在任意组件里面用this来使用这个封装好的组件

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
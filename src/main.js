import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/base.css"

document.title = '(伪)网易云音乐'
Vue.config.productionTip = true
Vue.config.silent = false
Vue.directive('click-outside', {
        bind: function(el, binding, vnode) {
            el.event = function(event) {
                if (!(el == event.target || el.contains(event.target))) {
                    if (typeof vnode.context[binding.expression] == "function") {
                        vnode.context[binding.expression](event)
                    }
                }

            }

            document.body.addEventListener('click', el.event, true)
        },
        unbind: function(el) {
            document.body.removeEventListener('click', el.event, true)
        }
    })
    // Vue.filter('hightLightKeyWords', function(value) {
    //     let str = value;
    //         let regSrting =  
    //     let replaceHTML =
    //         "<span style='color:#0f75c3';>" + that.value123 + "</span>";
    //     let final = str.replace(that.value123, replaceHTML);
    //     return final;
    // })
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
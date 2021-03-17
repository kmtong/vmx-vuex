# How to Use

## 启动

```js
import Vue from 'vue'

import VueModx from 'vue-modx'
import VuexModule from 'vmx-vuex'

// start plugin framework
Vue.use(VueModx, {
  modules: [VuexModule],
  config: {}
})

// get store to create Vue object
const store = VuexModule.store()

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

```

## 扩展

```js
export default {
  name: 'user-state',
  dependsOn: ['vuex'],
  extensions: {
    'vuex.modules': {
      user: {
        state: () => ({ ... }),
        mutations: { ... },
        actions: { ... },
        getters: { ... } 
      },
      corp: {
        state: () => ({ ... }),
        mutations: { ... },
        actions: { ... },
        getters: { ... } 
      }
    }
  }
}
```

扩展点：

* vuex.modules
* vuex.state
* vuex.mutations
* vuex.getters
* vuex.actions


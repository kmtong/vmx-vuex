# How to Use

## 启动

```js
import { createApp } from 'vue'

import VueModx from 'vue-modx'
import VuexModule from 'vmx-vuex'

import App from './App.vue'

// vue3-style
const app = createApp(App)

// start plugin framework
app.use(VueModx, {
  modules: [VuexModule],
  config: {}
})

app.mount('#app')

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


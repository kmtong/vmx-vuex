import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import VueModx from 'vue-modx'
import VuexModule from '../src/index'
import Comp1 from './comp1.vue'

const MyExtension = {
    name: "my-ext",
    dependsOn: ["vuex"],
    extensions: {
        "vuex.state": { GlobalState: "init global state" },
        "vuex.mutations": {
            SetGlobalState(state, s) {
                state.GlobalState = s;
            }
        },
        "vuex.modules": {
            ext: {
                namespaced: true,
                state: () => {
                    return { myState: "State1" };
                },
                getters: {
                    myState: state => state.myState
                },
                mutations: {
                    setMyState(state, s) {
                        state.myState = s;
                    }
                }
            }
        }
    }
}

const app = createApp({})

app.use(VueModx, {
    modules: [VuexModule, MyExtension],
    config: {
        vue: app
    }
})

const store = VuexModule.store();

test("Init VuexModule Test", () => {
    const wrapper = mount(Comp1, {
        global: {
            plugins: [store]
        }
    });
    expect(wrapper.text()).toContain("State1");
    expect(wrapper.text()).toContain("init global state");

    expect(store.state['ext'].myState).toBe('State1')
    expect(store.getters['ext/myState']).toBe('State1')

    store.commit("ext/setMyState", "State2");
    expect(store.state['ext'].myState).toBe('State2')
    expect(store.getters['ext/myState']).toBe('State2')

    store.commit("SetGlobalState", "another global state");
    expect(store.state['GlobalState']).toBe('another global state')

    wrapper.vm.$nextTick(() => {
        expect(wrapper.text()).toContain("State2");
        expect(wrapper.text()).toContain("another global state");
    })
})
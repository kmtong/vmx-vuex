import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import VueModx from 'vue-modx'
import VuexModule from '../src/index'
import Comp1 from './comp1.vue'

const MyExtension = {
    name: "my-ext",
    dependsOn: ["vuex"],
    extensions: {
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

const localVue = createLocalVue();

localVue.use(VueModx, {
    modules: [VuexModule, MyExtension],
    config: {
        vue: localVue
    }
})

const store = VuexModule.store();

test("Init VuexModule Test", () => {
    const wrapper = mount(Comp1, {
        localVue, store
    });
    expect(wrapper.text()).toContain("State1");
    expect(store.state['ext'].myState).toBe('State1')
    expect(store.getters['ext/myState']).toBe('State1')

    store.commit("ext/setMyState", "State2");
    expect(store.state['ext'].myState).toBe('State2')
    expect(store.getters['ext/myState']).toBe('State2')

    wrapper.vm.$nextTick(() => {
        expect(wrapper.text()).toContain("State2");
    })
})
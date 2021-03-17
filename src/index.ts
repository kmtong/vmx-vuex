import Vuex from 'vuex';

const MODNAME = "vuex";

var _store = null;
var _storeConfig = null;

export default {
    name: MODNAME,
    dependsOn: null,
    extensionPoints: {
        "vuex.modules": function ({ registry }, obj) {
            registry.moduleVarAppend(MODNAME, "modules", obj);
        },
        "vuex.state": function ({ registry }, obj) {
            registry.moduleVarAppend(MODNAME, "state", obj);
        },
        "vuex.mutations": function ({ registry }, obj) {
            registry.moduleVarAppend(MODNAME, "mutations", obj);
        },
        "vuex.getters": function ({ registry }, obj) {
            registry.moduleVarAppend(MODNAME, "getters", obj);
        },
        "vuex.actions": function ({ registry }, obj) {
            registry.moduleVarAppend(MODNAME, "actions", obj);
        },
    },
    start({ vue, registry }) {

        // modules
        const modulesArray = registry.moduleVarGet(MODNAME, "modules");
        const modules = modulesArray != null ? modulesArray.reduce((a, b) => {
            return { ...a, ...b };
        }, {}) : {};

        // global state
        const stateArray = registry.moduleVarGet(MODNAME, "state");
        const state = () => {
            if (stateArray && stateArray.length > 0) {
                // call state creation function
                const stateObjs = stateArray.map(s => s());
                return stateObjs.reduce((a, b) => {
                    return { ...a, ...b };
                }, {})
            }
            return {};
        };

        // global getters
        const gettersArray = registry.moduleVarGet(MODNAME, "getters");
        const getters = gettersArray != null ? gettersArray.reduce((a, b) => {
            return { ...a, ...b };
        }, {}) : {};

        // gloabl mutations
        const mutationsArray = registry.moduleVarGet(MODNAME, "mutations");
        const mutations = mutationsArray != null ? mutationsArray.reduce((a, b) => {
            return { ...a, ...b };
        }, {}) : {};

        // global actions
        const actionsArray = registry.moduleVarGet(MODNAME, "actions");
        const actions = actionsArray != null ? actionsArray.reduce((a, b) => {
            return { ...a, ...b };
        }, {}) : {};

        // initialize vuex
        vue.use(Vuex);

        _storeConfig = {
            state,
            modules,
            getters,
            mutations,
            actions
        };
        _store = new Vuex.Store(_storeConfig);
    },
    store() {
        return _store;
    },
    storeConfig() {
        return _storeConfig;
    }
}

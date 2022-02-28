import Vue from 'vue';
import Vuex, { createLogger, StoreOptions } from 'vuex';
import RootState from './types';
import { mobile } from './modules/mobileLayout';
import { map } from './modules/map';
import { filters } from './modules/filters';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store: StoreOptions<RootState> = {
    modules: {
        mobile,
        map,
        filters
    },
    strict: true,
    plugins: [createLogger()],
};

export default new Vuex.Store<RootState>(store);

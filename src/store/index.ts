import Vue from 'vue';
import Vuex, { createLogger, StoreOptions } from 'vuex';
import RootState from './types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store: StoreOptions<RootState> = {
    modules: {
    },
    strict: true,
    plugins: [createLogger()],
};

export default new Vuex.Store<RootState>(store);

import Vue from 'vue';
import Vuex, { createLogger, StoreOptions } from 'vuex';
import RootState from './types';
import { mobile } from '@/store/modules/mobileLayout';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store: StoreOptions<RootState> = {
    modules: {
        mobile
    },
    strict: true,
    plugins: [createLogger()],
};

export default new Vuex.Store<RootState>(store);

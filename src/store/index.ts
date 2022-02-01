import Vue from 'vue';
import Vuex, { createLogger, StoreOptions } from 'vuex';
import RootState from './types';
import { mobile } from '@/store/modules/mobileLayout';
import { map } from '@/store/modules/map';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store: StoreOptions<RootState> = {
    modules: {
        mobile,
        map
    },
    strict: true,
    plugins: [createLogger()],
};

export default new Vuex.Store<RootState>(store);

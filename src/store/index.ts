import Vuex, { createStore, StoreOptions } from 'vuex';
import { filters } from './modules/filters';
import { map } from './modules/map';
import { mobile } from './modules/mobileLayout';
import RootState from './types';

const debug = process.env.NODE_ENV !== 'production';

const store: StoreOptions<RootState> = createStore({
  modules: {
    mobile,
    map,
    filters
  },
  strict: true,
  plugins: []
});

export default new Vuex.Store<RootState>(store);

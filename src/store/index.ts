import { createStore } from 'vuex';
import { filters } from './modules/filters';
import { map } from './modules/map';
import { mobile } from './modules/mobileLayout';

const debug = process.env.NODE_ENV !== 'production';

/*
const store: StoreOptions<RootState> = createStore({
  modules: {
    mobile,
    map,
    filters
  },
  strict: true,
  plugins: []
});
*/

export const store: any = createStore({
  modules: {
    mobile,
    map,
    filters
  },
  strict: true,
  plugins: []
});

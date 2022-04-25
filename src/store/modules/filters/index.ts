import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import RootState, {Facility, ListItem} from '../../types';
import FilterState from './types';
import axios from 'axios';
import Filter from "ol/format/filter/Filter";

export enum FiltersMutations {
    SET_FACILITIES = 'SET_FACILITIES',
    SET_FILTERED_FACILITIES = 'SET_FILTERED_FACILITIES',
    SET_SEARCHSTRING = 'SET_SEARCHSTRING',
    SET_PROVIDERTYPES = 'SET_PROVIDERTYPES',
    SET_CATEGORIES = 'SET_CATEGORIES',
    SET_AREATYPES = 'SET_AREATYPES',
    SET_SERVICETYPES = 'SET_SERVICETYPES',
    SET_LOADING = 'SET_LOADING',
    SET_ERROR = 'SET_ERROR',
    SET_SHOWFILTER = 'SET_SHOWFILTER',
}

const state: FilterState = {
    facilities: [],
    filteredFacilities: [],
    error: '',
    showFilter: true,
    loading: 'idle',
    searchString: '',
    providerTypes: [],
    categories: [],
    areaTypes: [],
    serviceTypes: [],
};

const getters: GetterTree<FilterState, RootState> = {
    getFilteredFacilities(state): Facility[] {
        return state.filteredFacilities;
    },
    getProviderTypes(state): ListItem[] {
        return state.providerTypes;
    },
    getCategories(state): ListItem[] {
        return state.categories;
    },
    getAreaTypes(state): ListItem[] {
        return state.areaTypes;
    },
    getServiceTypes(state): ListItem[] {
        return state.serviceTypes;
    },
    getError(state): string {
        return state.error
    },
    getLoading(state): string {
        return state.loading
    },
    getShowFilter(state): boolean {
        return state.showFilter
    }
};

const searchInString = (value: string, searchText: string) => {
    return value.toLowerCase().includes(searchText);
};

const searchInArray = (arr: any[], searchText: string) => {
    arr.forEach((value) => {
        if (typeof value === 'string') {
            if (searchInString(value, searchText)) {
                return true;
            }
        }

        if (typeof value === 'object') {
            if (searchInObj(value, searchText)) {
                return true;
            }
        }
        return false;
    });
    return false;
};

const searchInObj = (itemObj: any, searchText: string) => {
    if (!itemObj) {
        return false;
    }

    const propArray = Object.keys(itemObj);

    for (let i = 0; i < propArray.length; i += 1) {
        const prop = propArray[i];
        const value = itemObj[prop];

        if (typeof value === 'string') {
            if (searchInString(value, searchText)) {
                return true;
            }
        } else if (Array.isArray(value)) {
            if (searchInArray(value, searchText)) {
                return true;
            }
        }

        if (typeof value === 'object') {
            if (searchInObj(value, searchText)) {
                return true;
            }
        }
    }
    return false;
};

const mutations: MutationTree<FilterState> = {
    [FiltersMutations.SET_SHOWFILTER] (state){
        state.showFilter = !state.showFilter;
    },
    [FiltersMutations.SET_LOADING] (state, payload: string){
      state.loading = payload;
    },
    [FiltersMutations.SET_ERROR] (state, payload: string){
        state.error = payload;
    },
    [FiltersMutations.SET_FACILITIES] (state, payload: Facility[]) {
        state.facilities = payload;
    },
    [FiltersMutations.SET_FILTERED_FACILITIES] (state, payload: Facility[]) {
        state.filteredFacilities = payload;
    },
    [FiltersMutations.SET_SEARCHSTRING] (state, payload: string) {
        state.searchString = payload.toLowerCase();
    },
    [FiltersMutations.SET_PROVIDERTYPES] (state, payload: ListItem[]) {
        state.providerTypes = payload;
    },
    [FiltersMutations.SET_CATEGORIES] (state, payload: ListItem[]) {
        state.categories = payload;
    },
    [FiltersMutations.SET_AREATYPES] (state, payload: ListItem[]) {
        state.areaTypes = payload;
    },
    [FiltersMutations.SET_SERVICETYPES] (state, payload: ListItem[]) {
        state.serviceTypes = payload;
    },
};

const actions: ActionTree<FilterState, RootState> = {
    async getFacilities({ commit, dispatch }) {
        commit(FiltersMutations.SET_LOADING, "pending");

        //await axios.get(`https://api-ramboll.onltd.dk/v1/facilities`)
        await axios.get(`http://api.ramboll.on-limited.dk/v1/facilities`)
            .then(({ data }) => {
                commit(FiltersMutations.SET_FACILITIES, data);
                commit(FiltersMutations.SET_ERROR, "");
            })
            .catch(() => {
                commit(FiltersMutations.SET_ERROR, "Der opstod en fejl");
            });
        

        // commit(FiltersMutations.SET_FACILITIES, data);
        // commit(FiltersMutations.SET_ERROR, "");
        commit(FiltersMutations.SET_LOADING, "idle");
        await dispatch('filter');
    },
    getFacility({state: FilterState } , facilityId: string): Facility | undefined {
        return state.facilities.find(value => value.uId === facilityId);
    },
    async setSearchString({ commit, dispatch }, value: string) {
        commit(FiltersMutations.SET_SEARCHSTRING, value);
        await dispatch('filter');
    },
    async setProviderTypes({ commit, dispatch }, value: ListItem[]) {
        commit(FiltersMutations.SET_PROVIDERTYPES, value);
        await dispatch('filter');
    },
    async setCategories({ commit, dispatch }, value: ListItem[]) {
        commit(FiltersMutations.SET_CATEGORIES, value);
        await dispatch('filter');
    },
    async setAreaTypes({ commit, dispatch } , value: ListItem[]) {
        commit(FiltersMutations.SET_AREATYPES, value);
        await dispatch('filter');
    },
    async setServiceTypes({ commit, dispatch } , value: ListItem[]) {
        commit(FiltersMutations.SET_SERVICETYPES, value);
        await dispatch('filter');
    },
    filter({state, commit}) {
        let facilities = state.facilities || [];

        if (state.searchString === '') {
            facilities = facilities;
        } else {
            facilities = facilities.filter((itemObj) => searchInObj(itemObj, state.searchString));
        }

        const checker = (arr1: string[], arr2: string[]) => arr1.every(v => arr2.includes(v));

        if (state.providerTypes.length > 0)
            facilities = facilities.filter(x => checker(state.providerTypes.map(y => y.value), x.providerTypes.map(y => y.value)));
        if (state.categories.length > 0)
            facilities = facilities.filter(x => checker(state.categories.map(y => y.value), x.categories.map(y => y.value)));
        if (state.areaTypes.length > 0)
            facilities = facilities.filter(x => checker(state.areaTypes.map(y => y.value), x.areaTypes.map(y => y.value)));
        if (state.serviceTypes.length > 0)
            facilities = facilities.filter(x => checker(state.serviceTypes.map(y => y.value), x.serviceTypes.map(y => y.value)));

        //console.log(facilities)

        commit(FiltersMutations.SET_FILTERED_FACILITIES, facilities);
    },
    setShowFilter({commit}) {
        commit(FiltersMutations.SET_SHOWFILTER);
    },
};

export const filters: Module<FilterState, RootState> = {
    state,
    getters,
    mutations,
    actions,
};

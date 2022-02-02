import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import RootState, {Facility} from '@/store/types';
import FilterState from './types';
import axios from 'axios';

export enum FiltersMutations {
    SET_FACILITIES = 'SET_FACILITIES',
    SET_FILTERED_FACILITIES = 'SET_FILTERED_FACILITIES',
    SET_SEARCHSTRING = 'SET_SEARCHSTRING',
}

const state: FilterState = {
    facilities: [],
    filteredFacilities: [],
    searchString: ''
};

const getters: GetterTree<FilterState, RootState> = {
    getFilteredFacilities(state): Facility[] {
        return state.filteredFacilities;
    }
};

const mutations: MutationTree<FilterState> = {
    [FiltersMutations.SET_FACILITIES] (state, payload: Facility[]) {
        state.facilities = payload;
    },
    [FiltersMutations.SET_FILTERED_FACILITIES] (state, payload: Facility[]) {
        state.filteredFacilities = payload;

    },
    [FiltersMutations.SET_SEARCHSTRING] (state, payload: string) {
        state.searchString = payload.toLowerCase();
        const searchInString = (value: string, searchText: string) => {
            return value.toLowerCase().includes(searchText);
        }
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
        }
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
        }

        if (state.searchString === '') {
            state.filteredFacilities = state.facilities;
        } else {
            state.filteredFacilities = state.facilities.filter((itemObj) => searchInObj(itemObj, state.searchString));
        }
    }
};

const actions: ActionTree<FilterState, RootState> = {
    async getFacilities({ commit }) {
        const { data } = await axios.get(`/facilities`);
        commit(FiltersMutations.SET_FACILITIES, data);
        commit(FiltersMutations.SET_FILTERED_FACILITIES, data);
    }
};

export const filters: Module<FilterState, RootState> = {
    state,
    getters,
    mutations,
    actions,
};

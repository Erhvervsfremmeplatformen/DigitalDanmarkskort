import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import RootState, {Facility} from '@/store/types';
import MapState from '@/store/modules/map/types';
import {MobileState} from '@/store/modules/mobileLayout/types';

const state: MapState = {
    currentFacility: undefined
};

export enum MapMutations {
    SET_CURRENTFACILITY = 'SET_CURRENTFACILITY'
};


const getters: GetterTree<MapState, RootState> = {
    getCurrentFacility(state): Facility | undefined {
        return state.currentFacility;
    }
};

const mutations: MutationTree<MapState> = {
    [MapMutations.SET_CURRENTFACILITY](state, payload: Facility) {
        state.currentFacility = payload;
    }
};

const actions: ActionTree<MapState, RootState> = {
    setCurrentFacility({ commit }, facility: Facility) {
        commit(MapMutations.SET_CURRENTFACILITY, facility);
    }
};

export const map: Module<MapState, RootState> = {
    state,
    getters,
    mutations,
    actions
};

import { GetterTree, Module, MutationTree } from 'vuex';
import RootState from '@/store/types';
import MapState from '@/store/modules/map/types';

const state: MapState = {};

const getters: GetterTree<MapState, RootState> = {};

const mutations: MutationTree<MapState> = {};

export const map: Module<MapState, RootState> = {
    state,
    getters,
    mutations,
};

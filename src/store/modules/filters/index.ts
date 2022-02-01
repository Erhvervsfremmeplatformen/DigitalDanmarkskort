import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import RootState from '@/store/types';
import FilterState from './types';

const state: FilterState = {
    searchString: ''
};

const getters: GetterTree<FilterState, RootState> = {
};

const mutations: MutationTree<FilterState> = {
};

const actions: ActionTree<FilterState, RootState> = {
};

export const filters: Module<FilterState, RootState> = {
    state,
    getters,
    mutations,
    actions,
};

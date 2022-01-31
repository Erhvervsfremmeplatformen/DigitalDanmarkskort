import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import RootState from '@/store/types';
import FiltersState from './types';

const state: FiltersState = {
};

const getters: GetterTree<FiltersState, RootState> = {
};

const mutations: MutationTree<FiltersState> = {
};

const actions: ActionTree<FiltersState, RootState> = {
};

export const filters: Module<FiltersState, RootState> = {
    state,
    getters,
    mutations,
    actions,
};

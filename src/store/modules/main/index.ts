import { GetterTree, Module, MutationTree, ActionTree } from 'vuex';
import RootState from '@/store/types';
import { MainState } from '@/store/modules/main/types';

const state: MainState = {
    tabIndex: 1
}

const getters: GetterTree<MainState, RootState> = {
    getMainTabIndex(state): number {
        return state.tabIndex;
    }
};

const mutations: MutationTree<MainState> = {
    SET_MAINTABINDEX(state, payload: number) {
        state.tabIndex = payload;
    }
}

const actions: ActionTree<MainState, RootState> = {
    setMainTabIndex({ commit }, index: number) {
        commit("SET_TABINDEX", index);
    }
}

export const main: Module<MainState, RootState> = {
    state,
    getters,
    mutations,
    actions
}
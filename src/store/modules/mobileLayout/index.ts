import { GetterTree, Module, MutationTree, ActionTree } from 'vuex';
import RootState from '../../types';
import { MobileState } from './types';

const state: MobileState = {
    tabIndex: 1
};

export enum MainMutations {
    SET_MAINTABINDEX = 'SET_MAINTABINDEX'
};

const getters: GetterTree<MobileState, RootState> = {
    getMainTabIndex(state): number {
        return state.tabIndex;
    }
};

const mutations: MutationTree<MobileState> = {
    [MainMutations.SET_MAINTABINDEX](state, payload: number) {
        state.tabIndex = payload;
    }
};

const actions: ActionTree<MobileState, RootState> = {
    setMainTabIndex({ commit }, index: number) {
        commit(MainMutations.SET_MAINTABINDEX, index);
    }
};

export const mobile: Module<MobileState, RootState> = {
    state,
    getters,
    mutations,
    actions
};

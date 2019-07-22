import Vue from 'vue';
import Vuex from 'vuex';

import boxComponent from './modules/boxComponent';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		boxComponent
	},
});
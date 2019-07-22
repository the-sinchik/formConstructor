export default {
	namespaced: true,
	state: {
		selectedObject: null
	},

	mutations: {
		chooseObject(state, object){
			state.selectedObject = object;
		},
		clearObject(state){
			state.selectedObject = null;
		}
	}
}
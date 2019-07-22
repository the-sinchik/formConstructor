<template>
  <div class="box-component">
    <form-element
      v-for="(obj, num) in formObject"
      :obj="obj"
      :key="obj.id"
      @handleDragStart="handleDragStart($event, obj)"
      @handleDragEnd="handleDragEnd($event)">
    </form-element>
  </div>
</template>

<script>
  import formElement from './formElement'
	import store from '../store';
	export default {
		name: "boxComponent",
		store,
    components: {formElement},
		data() {
			return{
				formObject: [
					{type: 'inputText'},
					{type: 'inputRadio'}
				],
				dragging: null
			}
		},
    methods: {
			handleDragStart(event, el) {
				this.dragging = el;
				this.selectChild(this.dragging);
				console.log('el',el);
      },
			handleDragEnd(event) {
				event.preventDefault();
      },
			getDragEnd(event){
				// console.log('event',this.dragging);
				// this.dragging = null;
			},
			getDropped(){
				console.log(this.dragging);
				return false;
				// this.added.push(this.dragging);
				// this.dragging = null;
			},
			dropOperation(){
				console.log('dropped');
				this.added.push(this.dragging);
			},
			selectChild(child){
        store.commit('boxComponent/chooseObject', {type: child.type});
			}
    }
	}
</script>

<style lang="scss" scoped>
.box-component {
  min-height: 50px;
  display: flex;
  justify-content: center;
  border: 1px solid lightgray;
  align-items: center;
  margin-bottom: 20px;
}
</style>
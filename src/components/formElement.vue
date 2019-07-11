<template>
  <div>
    <div v-if="type === 'inputText'">
      <div class="element"
           draggable="ture"
           @dragstart.stop="$emit('handleDragStart', $event)"
           @dragend.stop="$emit('handleDragEnd', $event)"
           :id="[id]"
           :data-type="[type]">
        <label>Подпись<input type="text"></label>
      </div>
    </div>
    <div v-else-if="type === 'inputRadio'">
      <div class="element"
           draggable="ture"
           @dragstart.stop="$emit('handleDragStart', $event)"
           @dragend.stop="$emit('handleDragEnd', $event)"
           :id="[id]"
           :data-type="[type]">
        <label>Подпись<input type="radio"></label>
      </div>
    </div>
  </div>
</template>

<script>
	import uniqid from 'uniqid';
	export default {
		name: "formElement",
    props: ['obj'],
		data(){
			return{
				id: uniqid(),
				type: this.obj.type
			}
		},
	}
</script>

<style lang="scss" scoped>
.element {
  background-color: rgba(0, 255, 168, 0.11);
  padding: 5px;
  margin: 0 10px;
  & label {
  &:hover {
     cursor: pointer;
   }
}
& input {
    margin: 0 10px;
  }
&:hover {
   cursor: pointer;
 }
}
.over {
  border: 1px dashed gray !important;
}
</style>
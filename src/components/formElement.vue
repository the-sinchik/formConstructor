<template>
  <div>
    <div v-if="type === 'inputText'">
      <i class="fa fa-align-justify icon"
         draggable="ture"
         @dragstart.stop="$emit('handleDragStart', $event)"
         @dragend.stop="$emit('handleDragEnd', $event)"
         :id="[id]"
         :data-type="[type]"></i>
    </div>
    <div v-else-if="type === 'inputRadio'">
      <i class="fa fa-check-square icon"
         draggable="ture"
         @dragstart.stop="$emit('handleDragStart', $event)"
         @dragend.stop="$emit('handleDragEnd', $event)"
         :id="[id]"
         :data-type="[type]"></i>
    </div>
  </div>
</template>

<script>
	import uniqid from 'uniqid';
	export default {
		name: "formElement",
    props: ['obj', 'ident'],
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
  text-align: left;
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

.icon {
  font-size: 25px;
  margin: 0 5px;
}
</style>
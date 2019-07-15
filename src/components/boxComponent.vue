<template>
  <div class="box-component">
    <form-element
      v-for="(obj, num) in formObject"
      :obj="obj"
      :key="obj.id">
    </form-element>
  </div>
</template>

<script>
  import formElement from './formElement'
	export default {
		name: "boxComponent",
    components: {formElement},
    formObject: [
      {type: 'inputText'},
      {type: 'inputRadio'}
    ]
	}
</script>

<style lang="scss" scoped>
.box-component {
  min-height: 50px;
}
</style>
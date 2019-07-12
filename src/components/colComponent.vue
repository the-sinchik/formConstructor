<template>
  <div class="col-block">
    <button @click="$emit('removeCol')">removeCol</button>
    <div>
      <temp-component></temp-component>
    </div>
  </div>
</template>

<script>
  import tempComponent from './tempComponent';
	export default {
		name: "colComponent",
    components: {tempComponent}
	}
</script>

<style lang="scss" scoped>
  .col-block {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
    justify-content: center;
    border: 1px solid #ffab1c;
    padding: 10px;
    margin: 5px 6px;
    background-color: #ffaf00;
  }
</style>
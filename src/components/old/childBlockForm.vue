<template>
    <button class="form-btn inline-block-btn"
            @click="$emit('remove')">
      -
    </button>
</template>

<script>
	export default {
		name: "childBlockForm"
	}
</script>

<style lang="scss" scoped>
  .form-btn {
    border: none;
    font-size: 20px;
    position: absolute;
    top: 0;
    right: 2px;
    &:hover {
      cursor: pointer;
    }
  }
</style>
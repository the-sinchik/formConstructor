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
    &:hover {
      cursor: pointer;
    }
  }
</style>
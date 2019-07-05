<template>
    <div class="main-component">
        <addForm></addForm>
    </div>
</template>

<script>

  import addForm from "./addForm";

  export default {
    name: "mainComponent",
    components: {
      'addForm': addForm
    }
  }
</script>

<style scoped>

</style>
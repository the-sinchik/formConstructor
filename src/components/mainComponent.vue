<template>
    <div class="main-component">
        <add-Form></add-Form>
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
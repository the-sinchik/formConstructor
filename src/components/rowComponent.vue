<template>
  <div class="rowComp">
    <button @click="$emit('addColComp')">add Col</button>
    <button @click="$emit('removeRow')">remove row</button>
    <div class="row-block">
      <col-component
            v-for="(cols, id) in itemRow"
            :key="id"
            @removeCol="$emit('delCol', id)">
      </col-component>
    </div>
  </div>
</template>

<script>
  import colComponent from './colComponent';
	export default {
		name: "rowComponent",
    components: {colComponent},
    props: ['itemRow']
	}
</script>

<style lang="scss" scoped>
.rowComp {
  min-height: 50px;
  border: 1px solid #009eff;
  margin: 5px;
  background-color: #009eff;
}
.row-block {
  display: flex;
  flex-wrap: wrap;
}
</style>
<template>
  <div class="container">
    <button @click="$emit('addRow')">add row</button>
    <button @click="$emit('removeContainer')">delete container</button>
    <row-component
            v-for="(item, index) in row"
            :key="index"
            :itemRow="item"
            @removeRow="$emit('delRow', index)"
            @addColComp="addCol(item)"
            @delCol="remCol($event, item)">
    </row-component>
  </div>
</template>

<script>
  import rowComponent from './rowComponent';
	export default {
		name: "containerComponent",
    components: {rowComponent},
    props: ['count', 'row'],
    methods: {
			remCol(id, item) {
				item.splice(id,1);
			},
			addCol(item) {
				let col = {};
				item.push(col);
			}
    }
	}
</script>

<style lang="scss" scoped>

  .container {
    min-height: 50px;
    border: 1px solid black;
    margin: 10px;
  }

</style>
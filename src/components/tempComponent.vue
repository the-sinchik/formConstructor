<template>
  <div>
    <button @click="addContainer()">
      add container</button>
    <div>
      <container-component
        v-for="(count, id) in containers"
        :key="id"
        :count="count"
        :row="containers[id]"
        @addRow="addRow(id)"
        @removeContainer="removeContainer(id)"
        @delRow="delRow($event, id)">
      </container-component>
    </div>
  </div>

</template>

<script>
	import containerComponent from './containerComponent';
	export default {
		name: "tempComponent",
		components: {containerComponent},
    data: function () {
			return {
      	containers: []
      }
		},
    methods: {
			addContainer() {
				let cont = [];
				this.containers.push(cont);
      },
			removeContainer(id) {
				this.containers.splice(id,1);
      },
      addRow(indexCont) {
				let row = [];
				this.containers[indexCont].push(row);
      },
			delRow(index, indexCont) {
				this.containers[indexCont].splice(index, 1);
      }
    }
	}
</script>

<style scoped>

</style>
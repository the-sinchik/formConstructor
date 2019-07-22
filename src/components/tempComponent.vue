<template>
  <div>
      <i class="fa fa-plus add-btn"
         @click="addContainer()"></i>

    <div class="container-block">
      <container-component
        v-for="(count, id) in containers"
        :key="id"
        :idCont=id
        :id=id
        :count="count"
        :row="containers[id]"
        @addRow="addRow(id)"
        @removeContainer="removeContainer(id)"
        @delRow="delRow($event, id)"

        @containerDragStart="containerDragStart($event)"
        @containerDragEnter="containerDragEnter($event)"
        @containerDragLeave="containerDragLeave($event)"
        @containerDragOver="containerDragOver($event)"
        @containerDrop="containerDrop($event)">
      </container-component>
      <button @click="test()">test</button>
      <button @click="test2()">test2</button>
    </div>
  </div>

</template>

<script>
	import containerComponent from './containerComponent';
	import store from '../store';
	import { mapState } from 'vuex';

	export default {
		name: "tempComponent",
		components: {containerComponent},
    data: function () {
			return {
      	containers: [],
				containerId: null
      }
		},
		computed: {
			...mapState({
				selectedSubject: state => state.boxComponent.selectedSubject,
			})
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
      },

      /////       Drag and Drop     /////
			containerDragStart(event) {
				let imgCont = document.createElement("img");

				event.dataTransfer.effectAllowed = 'copy';
				event.dataTransfer.setData('text', event.target.getAttribute('id'));
				event.dataTransfer.setDragImage(imgCont, 0, 0);
      },
			containerDragEnter(id) {
				this.containerId = id;
				event.target.classList.add('over-cont');
      },
			containerDragLeave(event) {
				event.target.classList.remove('over-cont');
      },
			containerDragOver(event) {
				event.preventDefault();
      },
      containerDrop(event) {
				event.preventDefault();
				let data = event.dataTransfer.getData("text");

				if (this.containerId >= this.containers.length) {
					let k = this.containerId - this.containers.length + 1;
					while (k--) {
						this.containers.push(undefined);
					}
				}
				this.containers.splice(this.containerId, 0, this.containers.splice(data, 1)[0]);
				event.target.classList.remove('over-cont');
				event.stopPropagation();

				return this.containers;
      },
      test() {
				store.commit('boxComponent/clearObject');
      },
			test2() {
				let temp = this.selectedSubject;
				console.log(temp);
			}
    }
	}
</script>

<style lang="scss" scoped>

  .add-btn {
    font-size: 20px;
    z-index: 100;
    &:hover {
      cursor: pointer;
    }
  }

</style>
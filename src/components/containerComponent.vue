<template>
  <div class="container"
       draggable="true"
       @dragstart.stop="$emit('containerDragStart', $event)">
    <div class="container-drop"
            :id="idCont"
            @dragenter.stop="$emit('containerDragEnter', idCont)"
            @dragover.stop="$emit('containerDragOver', $event)"
            @drop.stop="$emit('containerDrop', $event)"
            @dragleave="$emit('containerDragLeave', $event)">
    </div>
    <button @click="$emit('addRow')"
            class="add-btn">
      +
    </button>
    <button @click="$emit('removeContainer')"
            class="delete-btn">
      X
    </button>
    <row-component
            v-for="(item, index) in row"
            :key="index"
            :itemRow="item"
            :rowId="index"
            @removeRow="$emit('delRow', index)"
            @addColComp="addCol(item)"
            @delCol="remCol($event, item)"

            @rowDragStart="rowDragStart($event)"
            @rowDragEnter="rowDragEnter($event)"
            @rowDragOver="rowDragOver($event)"
            @rowDrop="rowDrop($event)"
            @rowDragLeave="rowDragLeave($event)">
    </row-component>
  </div>
</template>

<script>
  import rowComponent from './rowComponent';
	export default {
		name: "containerComponent",
    components: {rowComponent},
    props: ['count', 'row', 'idCont'],
		data: function () {
			return {
				rowId: null
			}
		},
    methods: {
			remCol(id, item) {
				item.splice(id,1);
			},
			addCol(item) {
				let col = {};
				item.push(col);
			},

			rowDragStart(event) {
				let imgCont = document.createElement("img");

				event.dataTransfer.effectAllowed = 'copy';
				event.dataTransfer.setData('par', event.target.getAttribute('id'));
				event.dataTransfer.setDragImage(imgCont, 0, 0);
			},
			rowDragEnter(id) {
				this.rowId = id;
				event.target.classList.add('over-cont');
			},
			rowDragLeave(event) {
				event.target.classList.remove('over-cont');
			},
			rowDragOver(event) {
				event.preventDefault();
			},
			rowDrop(event) {
				event.preventDefault();
				let data = event.dataTransfer.getData("par");

				if (this.rowId >= this.row.length) {
					let k = this.rowId - this.row.length + 1;
					while (k--) {
						this.row.push(undefined);
					}
				}
				this.row.splice(this.rowId, 0, this.row.splice(data, 1)[0]);
				event.target.classList.remove('over-cont');
				event.stopPropagation();
				return this.row;
			}
    }
	}
</script>

<style lang="scss" scoped>

  .container {
    min-height: 50px;
    border: 1px solid black;
    margin: 25px 0px;
    position: relative;
    background: bisque;
    &-drop {
      position: absolute;
      width: 100%;
      top: -23px;
      min-height: 20px;
    }
  }
  .over {
    &-cont {
      background-color: #37c9ff7a;
      box-shadow: 0px 0px 4px 3px #37c9ff;
    }
  }

  .add-btn {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
  }
  .delete-btn {
    position: absolute;
    top: -10px;
    right: -10px;
  }

</style>
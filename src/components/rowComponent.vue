<template>
  <div class="rowComp"
       draggable="true"
       :id="rowId"
       @dragstart.stop="$emit('rowDragStart', $event)">
    <div class="row-drop"
         :id="rowId"
         @dragenter.stop="$emit('rowDragEnter', rowId)"
         @dragover.stop="$emit('rowDragOver', $event)"
         @drop.stop="$emit('rowDrop', $event)"
         @dragleave="$emit('rowDragLeave', $event)">

    </div>
    <button @click="$emit('addColComp')"
            class="add-btn">
      +
    </button>
    <button @click="$emit('removeRow')"
            class="delete-btn">
      X
    </button>
    <div class="row-block">
      <col-component
            v-for="(cols, id) in itemRow"
            :key="id"
            @removeCol="$emit('delCol', id)"
            :colId="id"

            @colDragStart="colDragStart($event)"
            @colDragEnter="colDragEnter($event)"
            @colDragOver="colDragOver($event)"
            @colDrop="colDrop($event)"
            @colDragLeave="colDragLeave($event)">
      </col-component>
    </div>
  </div>
</template>

<script>
  import colComponent from './colComponent';
	export default {
		name: "rowComponent",
    components: {colComponent},
    props: ['itemRow', 'rowId'],
		data: function () {
			return {
				colId: null
			}
		},
    methods: {
			colDragStart(event) {
				let imgCont = document.createElement("img");

				event.dataTransfer.effectAllowed = 'copy';
				event.dataTransfer.setData('param', event.target.getAttribute('id'));
				event.dataTransfer.setDragImage(imgCont, 0, 0);
			},
			colDragEnter(id) {
				this.colId = id;
				event.target.classList.add('over-cont');
			},
			colDragLeave(event) {
				event.target.classList.remove('over-cont');
			},
			colDragOver(event) {
				event.preventDefault();
			},
			colDrop(event) {
				event.preventDefault();
				let data = event.dataTransfer.getData("param");

				if (this.colId >= this.itemRow.length) {
					let k = this.rowId - this.itemRow.length + 1;
					while (k--) {
						this.itemRow.push(undefined);
					}
				}
				this.itemRow.splice(this.colId, 0, this.itemRow.splice(data, 1)[0]);
				event.target.classList.remove('over-cont');
				event.stopPropagation();
				return this.itemRow;
			}
    }
	}
</script>

<style lang="scss" scoped>
.rowComp {
  min-height: 50px;
  border: 1px solid #009eff;
  margin: 25px 5px 5px 5px;
  background-color: #009eff;
  position: relative;
}
.row {
  &-block {
    display: flex;
    flex-wrap: wrap;
  }
  &-drop {
    height: 20px;
    position: absolute;
    top: -23px;
    width: 100%;
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
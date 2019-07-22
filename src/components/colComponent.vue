<template>
  <div class="col-block"
       draggable="true"
       :id="colId"
       @dragstart.stop="$emit('colDragStart', $event)"

       @dragenter="objDragEnter($event)">
    <div class="col-drop"
         :id="colId"

         @dragenter.stop="$emit('colDragEnter', colId)"
         @dragover.stop="$emit('colDragOver', $event)"
         @drop.stop="$emit('colDrop', $event)"
         @dragleave="$emit('colDragLeave', $event)">

    </div>
    <i class="fa fa-minus delete-btn"
       @click="$emit('removeCol')">
    </i>
    <div>

    </div>
  </div>
</template>

<script>
  import tempComponent from './tempComponent';
	export default {
		name: "colComponent",
    components: {
			'tempComponent': tempComponent
    },
		props: ['colId'],
    methods: {
			objDragEnter(event) {
				console.log(event.target);
      }
    }
	}
</script>

<style lang="scss" scoped>
  .col {
    &-block {
      min-height: 30px;
      position: relative;
      display: flex;
      flex: 1 1 auto;
      flex-wrap: wrap;
      justify-content: center;
      border: 1px solid #ffab1c;
      padding: 10px;
      margin-top: 20px;
      margin-bottom: 5px;
      margin-left: 20px;
      background-color: #ffaf00;
      &:last-child {
        margin-right: 20px;
      }
    }
    &-drop {
      position: absolute;
      width: 15px;
      top: 0;
      left: -19px;
      height: 100%;
    }
  }

  .over {
    &-cont {
      background-color: #37c9ff7a;
      box-shadow: 0px 0px 4px 3px #37c9ff;
    }
  }

  .delete-btn {
    position: absolute;
    top: 0px;
    right: 4px;
    font-size: 20px;
    &:hover {
      cursor: pointer;
    }
  }
</style>
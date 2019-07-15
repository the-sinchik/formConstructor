<template>
    <div class="form-block">
        <div class="btn-wrap">
            <button class="form-btn inline-block-btn"
                    @click="insertBlock(item)">
                +
            </button>
            <button class="form-btn inline-block-btn"
                    @click="$emit('delDiv')">
                -
            </button>
        </div>
        {{ item.id }}
        <div class="block-wrap"
             v-if="item.items && item.items.length">
            <div class=" inline-block"
                 v-for="(div, id) in item.items"
                 :id="[id]"
                 draggable="true"
                 @dragstart.stop="$emit('dragstartSmBlock', $event)"
                 @dragenter.stop="$emit('handleDragEnter', id)"
                 @dragover.stop="$emit('handleDragOver', $event)"
                 @dragleave.stop="$emit('handleDragLeave', $event)"
                 @drop.stop="$emit('handleDrop', id)">

                  <div class="blockDrag"
                       :id="[id]"
                       @dragenter.stop="$emit('dragenterSmBlock', id)"
                       @dragstart.stop="$emit('dragstartSmBlock', $event)"
                       @drop.stop="$emit('dropSmBlock', $event)"
                       @dragover.stop="$emit('dragoverSmBlock', $event)"
                       @dragend.stop="$emit('dragendSmBlock', $event)"
                       @dragleave.stop="$emit('dragleaveSmBlock', $event)">
                  </div>

                  <div class="blockForm">
                    <form-element
                      v-for="(obj, num) in item.items[id].listObj"
                      :obj="obj"
                      :key="obj.id"
                      :ident="num"
                      @handleDragStart.stop="handleDragStart($event)"
                      @handleDragEnd.stop="handleDragEnd($event)">
                    </form-element>
                  </div>
                <child-Block-Form
                  @remove="remove(id, item)">
                </child-Block-Form>
              {{ div.id }}
            </div>
        </div>
    </div>
</template>

<script>
  import childBlockForm from './childBlockForm';
  import formElement from './formElement';
  export default {
    name: "blockFormComponent",
    components: {childBlockForm, formElement},
    props: ['item', 'idItem'],
    methods: {
      remove(id, item) {
        item.items.splice(id, 1);
      },
      insertBlock(item){
        let obj = {
        	listObj: [],
          id: item.items.length
        };
        item.items.push(obj);
      }
    }
  }
</script>

<style lang="scss" scoped>

.form-btn {
  border: none;
  margin-left: 5px;
  font-size: 20px;
  &:hover {
      cursor: pointer;
  }
}

.form-block {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border: 1px solid dimgray;
  margin: 20px 0;
  padding: 10px;
  min-height: 15px;
}
.btn-wrap {
  display: flex;
  justify-content: flex-end;
}

.inline-block {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid tomato;
  padding: 10px;
  margin: 5px 6px;
}
.block-wrap {
  display: flex;
  flex-wrap: wrap;
}

.over {
  border: 1px dashed gray !important;
  &-sm {
    background-color: #37c9ff7a;
    box-shadow: 0px 0px 4px 3px #37c9ff;
  }
}

.blockDrag {
  width: 8px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -11px;
}

.form-drop {
  width: 100%;
  height: 15px;
  border: 1px solid black;
  position: absolute;
  top: 0;
  left: 0;
}

.wrapper-block {
  position: relative;
}
</style>
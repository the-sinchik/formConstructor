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
                 :class="{'activeDrop' : [id !== idItem] && process }"
                 draggable="true"
                 @dragstart.stop="$emit('dragstartSmBlock', $event)"
                 @dragenter.stop="$emit('dragenterSmBlock', id)"
                 @drop.stop="$emit('dropSmBlock', $event)"
                 @dragover.stop="$emit('dragoverSmBlock', $event)"
                 @dragend.stop="$emit('dragendSmBlock', $event)"

                 v-for="(div, id) in item.items"
                 :id="[id]">
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
  export default {
    name: "blockFormComponent",
    components: {childBlockForm},
    props: ['item', 'idItem', 'process'],
    methods: {
      remove(id, item) {
        item.items.splice(id, 1);
      },
      insertBlock(item){
        let obj = {
          id: item.items.length
        };
        item.items.push(obj);
      }
    }
  }
</script>

<style lang="scss" scoped>

.activeDrop {
  border: 3px dashed #8080807d !important;
}
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
  margin: 10px 0;
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
  margin: 5px;
}
.block-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
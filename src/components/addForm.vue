<template>
    <div class="wrapper">
        <button class="form-btn"
                @click="addDiv()">
            +
        </button>
        <div class="wrapper">
            <div v-for="(item, index) in fields"
                 :id="index"
                 draggable="true"
                 @dragstart="dragstartLgBlock($event)"
                 @dragenter="dragenterLgBlock(index)"
                 @dragover="dragoverLgBlock($event)"
                 @drop="dropLgBlock($event)"
                 @dragend="dragendLgBlock($event)">

                <block-Form-Component
                  :class="{'activeDrop' : LgId === index && proc }"
                  :item="item"
                  :idItem="idItem"
                  :process="process"
                  @delDiv="delDiv(index)"
                  @dragstartSmBlock="dragstartSmBlock($event)"
                  @dragenterSmBlock="dragenterSmBlock($event)"
                  @dragoverSmBlock="dragoverSmBlock($event)"
                  @dropSmBlock="dropSmBlock($event, item)"
                  @dragendSmBlock="dragendSmBlock($event)"
                >
                </block-Form-Component>
            </div>
        </div>

    </div>
</template>

<script>
  import blockFormComponent from './blockFormComponent';

  export default {
    name: "addForm",
    components: {blockFormComponent},
    data: function () {
      return {
        fields: [],
        LgId: null,
        ids: null,
        idItem: null,
        proc: false,
        process: false
      }
    },
    methods: {
        addDiv() {
          let obj = {
            items: [],
            id: this.fields.length
          };
          this.fields.push(obj);
        },
        delDiv(index){
          this.fields.splice(index, 1);
        },
        dragstartLgBlock(event) {
            event.dataTransfer.setData("param", event.target.getAttribute('id'));
        },
        dragenterLgBlock(id) {
            this.LgId = id;
            this.proc = true;
        },
        dragoverLgBlock(event) {
            event.preventDefault();
        },
        dropLgBlock(event) {
            let data = event.dataTransfer.getData("param");
            [this.fields[data], this.fields[this.LgId]] = [this.fields[this.LgId], this.fields[data]];
            this.fields = [...this.fields];
        },
        dragendLgBlock(event){
            this.proc = false;
            event.preventDefault();
        },
        dragstartSmBlock(event) {
            event.dataTransfer.setData("par", event.target.getAttribute('id'));
            this.idItem = event.target.getAttribute('id');

        },
        dragenterSmBlock(id) {
            this.ids = id;
            this.process = true;
            console.log(this.ids !== this.idItem && this.process);
        },
        dragoverSmBlock(event) {
            event.preventDefault();
        },
        dropSmBlock(event, item) {
            let data = event.dataTransfer.getData("par");
            [item.items[data], item.items[this.ids]] = [item.items[this.ids], item.items[data]];
            item.items = [...item.items];
        },
        dragendSmBlock(event){
            event.preventDefault();
            this.process = false;
        }
    }
  }
</script>

<style lang="scss" scoped>
.form-btn {
    border: none;
    font-size: 20px;
    &:hover {
        cursor: pointer;
    }
}
.activeDrop {
    border: 3px dashed #8080807d !important;
}
</style>
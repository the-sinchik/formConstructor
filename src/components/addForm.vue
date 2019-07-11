<template>
    <div class="wrapper">
        <button class="form-btn"
                @click="addDiv()">
            +
        </button>

        <div class="blockForm">
            <form-element
                 v-for="obj in formObject"
                 :obj="obj"
                 :key="obj.id"
                 @handleDragStart="handleDragStart($event)"
                 @handleDragEnd="handleDragEnd($event)">
            </form-element>
        </div>

        <div class="wrapper">
            <div v-for="(item, index) in fields"
                 :id="index"
                 draggable="true"
                 @dragstart.stop="dragstartLgBlock($event)"
                 @dragenter.stop="dragenterLgBlock(index)"
                 @dragover.stop="dragoverLgBlock($event)"
                 @drop.stop="dropLgBlock($event)"
                 @dragend.stop="dragendLgBlock($event)">
                <block-Form-Component
                  :item="item"
                  :idItem="idItem"
                  @delDiv="delDiv(index)"
                  @handleDragEnter="handleDragEnter($event)"
                  @handleDragOver="handleDragOver($event)"
                  @handleDragLeave="handleDragLeave($event)"
                  @handleDrop="handleDrop($event, item)"
                  >
<!--                  @delDiv="delDiv(index)"-->
<!--                  @dragstartSmBlock="dragstartSmBlock($event)"-->
<!--                  @dragenterSmBlock="dragenterSmBlock($event)"-->
<!--                  @dragoverSmBlock="dragoverSmBlock($event)"-->
<!--                  @dropSmBlock="dropSmBlock($event, item)"-->
<!--                  @dragendSmBlock="dragendSmBlock($event)">-->

                </block-Form-Component>
            </div>
        </div>
    </div>
</template>

<script>
  import blockFormComponent from './blockFormComponent';
  import formElement from './formElement';
  import uniqid from 'uniqid';

  export default {
    name: "addForm",
    components: {blockFormComponent, formElement},
    data: function () {
      return {
      	itemId: uniqid(),
        fields: [],
        formObject: [],
        LgId: null,
        ids: null,
        idItem: null,
        testItem: null
      }
    },
    mounted() {
    	this.createElem();
    },
    methods: {
      addDiv() {
        let obj = {
          items: [
              {
              	listObj: [],
                id: 0
              }
          ],
          id: this.fields.length
        };
        this.fields.push(obj);
      },
      createElem() {
				this.formObject.push({type: 'inputText'}, {type: 'inputRadio'});
      },
      delDiv(index){
        this.fields.splice(index, 1);
      },
      dragstartLgBlock(event) {
        event.dataTransfer.setData("param", event.target.getAttribute('id'));
      },
      dragenterLgBlock(id) {
        this.LgId = id;
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
        event.preventDefault();
      },
      dragstartSmBlock(event) {
        event.dataTransfer.setData("par", event.target.getAttribute('id'));
        this.idItem = event.target.getAttribute('id');

      },
      dragenterSmBlock(id) {
        this.ids = id;
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
      },
      handleDragStart(event) {
        event.dataTransfer.effectAllowed = 'copy';
        // event.dataTransfer.setData('text', event.target.getAttribute('id'));
        event.dataTransfer.setData('text', event.target.getAttribute('data-type'))
      },
      handleDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.dataTransfer.dropEffect = 'copy';
        return false;
      },
      handleDragEnter(divs) {
        event.preventDefault();
        event.target.classList.add('over');
        console.log(divs);
      },
      handleDragLeave(event) {
        event.preventDefault();
        event.target.classList.remove('over');
      },
      handleDrop(id, item) {
        event.preventDefault();
        let data = event.dataTransfer.getData("text");
        //
        // item.items[id].listObj.push({type: data});

        // event.target.appendChild(document.getElementById(data));
        event.target.classList.remove('over');
        event.stopPropagation();
        return false;
      },
      handleDragEnd(event) {
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
.blockForm {
  border: 1px solid black;
  min-height: 100px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.element {
  background-color: rgba(0, 255, 168, 0.11);
  padding: 5px;
  & label {
      &:hover {
          cursor: pointer;
      }
  }
  & input {
      margin: 0 10px;
  }
  &:hover {
      cursor: pointer;
  }
}
.over {
  border: 1px dashed gray !important;
}
</style>
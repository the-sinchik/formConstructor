<template>
    <div class="wrapper">
        <button class="form-btn"
                @click="addDiv()">
            +
        </button>

        <div class="blockForm">
            <form-element
                 v-for="(obj, num) in formObject"
                 :obj="obj"
                 :key="obj.id"
                 :ident="num"
                 @handleDragStart.stop="handleDragStart($event)"
                 @handleDragEnd.stop="handleDragEnd($event)">
            </form-element>
        </div>

        <div class="wrapper">
            <div v-for="(item, index) in fields"
                 class="wrapper-block"
                 :id="index"
                 draggable="true"
                 @dragend.stop="dragendLgBlock($event)"
                 @dragstart.stop="dragstartLgBlock($event)">
                <div class="form-drop"
                     :id="index"
                     @dragenter.stop="dragenterLgBlock(index)"
                     @dragover.stop="dragoverLgBlock($event)"
                     @drop.stop="dropLgBlock($event)"
                     @dragleave="dragleaveLgBlock($event)"
                ></div>
                <block-Form-Component
                  :item="item"
                  @delDiv="delDiv(index)"

                  @handleDragEnter="handleDragEnter($event)"
                  @handleDragOver="handleDragOver($event)"
                  @handleDragLeave="handleDragLeave($event)"
                  @handleDrop="handleDrop($event, item)"

                  @dragstartSmBlock="dragstartSmBlock($event)"
                  @dragenterSmBlock="dragenterSmBlock($event)"
                  @dragoverSmBlock="dragoverSmBlock($event)"
                  @dropSmBlock="dropSmBlock($event, item)"
                  @dragendSmBlock="dragendSmBlock($event)"
                  @dragleaveSmBlock="dragleaveSmBlock($event)">


                  
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
        ids: null
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
				this.formObject.push({type: 'inputText', value: null}, {type: 'inputRadio', value: null});
      },
      delDiv(index){
        this.fields.splice(index, 1);
      },
      dragstartLgBlock(event) {
				let imgLg = document.createElement("img");

        event.dataTransfer.setData("param", event.target.getAttribute('id'));
				event.dataTransfer.setDragImage(imgLg, 0, 0);
      },
      dragenterLgBlock(id) {
        this.LgId = id;
				event.target.classList.add('over-lg');
      },
			dragleaveLgBlock(event) {
				event.target.classList.remove('over-lg');
      },
      dragoverLgBlock(event) {
        event.preventDefault();
      },
      dropLgBlock(event) {
				event.preventDefault();
        let data = event.dataTransfer.getData("param");

					if (this.LgId >= this.fields.length) {
						let k = this.LgId - this.fields.length + 1;
						while (k--) {
							this.fields.push(undefined);
						}
					}
				  this.fields.splice(this.LgId, 0, this.fields.splice(data, 1)[0]);
				  event.target.classList.remove('over-lg');
				  event.stopPropagation();
					return this.fields;

      },
      dragendLgBlock(event){
        event.preventDefault();
      },
      dragstartSmBlock(event) {
				let img = document.createElement("img");

        event.dataTransfer.setData("par", event.target.getAttribute('id'));
				event.dataTransfer.setDragImage(img, 0, 0);
      },
      dragenterSmBlock(id) {
        this.ids = id;
				event.target.classList.add('over-sm');
      },
			dragleaveSmBlock() {
				event.target.classList.remove('over-sm');
      },
      dragoverSmBlock(event) {
        event.preventDefault();
      },
      dropSmBlock(event, item) {
				event.preventDefault();
        let data = event.dataTransfer.getData("par");

        if (this.ids >= item.items.length) {
          let k = this.ids - item.items.length + 1;
          while (k--) {
						item.items.push(undefined);
          }
        }

				item.items.splice(this.ids, 0, item.items.splice(data, 1)[0]);
        event.stopPropagation();
        event.target.classList.remove('over-sm');
				return item.items;

      },
      dragendSmBlock(event){
        event.preventDefault();
      },
      handleDragStart(event) {
        event.dataTransfer.effectAllowed = 'copy';
        event.dataTransfer.setData('text', event.target.getAttribute('data-type'))
      },
      handleDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.dataTransfer.dropEffect = 'copy';
        return false;
      },
      handleDragEnter() {
        event.preventDefault();
        event.target.classList.add('over');
      },
      handleDragLeave(event) {
        event.preventDefault();
        event.target.classList.remove('over');
      },
      handleDrop(id, item) {
        event.preventDefault();
        let data = event.dataTransfer.getData("text");

        if (item.items[id].listObj.length > 0) {
					event.target.classList.remove('over');
        	return;
        }
        item.items[id].listObj.push({type: data, value: null});
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

.form-drop {
  width: 100%;
  height: 15px;
  position: absolute;
  top: -18px;
  left: -1px;
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

.wrapper-block {
  position: relative;
}

.over {
  border: 1px dashed gray !important;
  &-sm {
    background-color: #37c9ff;
  }
  &-lg {
    background-color: #37c9ff7a;
    box-shadow: 0px 0px 4px 3px #37c9ff;
  }
}
</style>
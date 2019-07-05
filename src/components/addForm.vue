<template>
    <div class="wrapper">
        <button class="form-btn"
                @click="addDiv()">
            Добавить
        </button>
        <div class="form-block"
             v-for="(item,index) in fields">
            <div class="btn-wrap">
                <button class="form-btn inline-block-btn"
                        @click="insertBlock(item)">
                    Добавить
                </button>
                <button class="form-btn inline-block-btn"
                        @click="delDiv(index)">
                    Удалить
                </button>
            </div>
            {{ item.id }} {{ index }}
            <div class="block-wrap">
                <div class="inline-block"
                     v-for="(div, id) in item.items">
                    {{ id }} {{ div.id }}
                    <button class="form-btn inline-block-btn"
                            @click="removeBtn(id, item)">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "addForm",
    data: function () {
      return {
        fields: []
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
      insertBlock(item){
        let obj = {
          id: item.items.length
        };

        item.items.push(obj);
      },
      delDiv(index){
        this.fields.splice(index, 1);
      },
      removeBtn(id, item) {
        item.items.splice(id, 1);
      }
    }
  }
</script>

<style lang="scss" scoped>
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
.form-btn {
    border: none;
    padding: 5px;
    border: 1px solid darkslategray;
    background-color: rgba(10, 153, 134, 0.2);
    border-radius: 5px;
}
.inline-block {
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
}
.btn-wrap {
    display: flex;
    justify-content: flex-end;
}
</style>
<template>
    <div class="wrapper">
        <button class="form-btn"
                @click="addDiv()">
            +
        </button>
        <div class="wrapper">
            <div v-for="(item, index) in fields">
                <block-Form-Component
                  :item="item"
                  @delDiv="delDiv(index)">
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
      delDiv(index){
        this.fields.splice(index, 1);
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
</style>
<template>
    <div class="main-component">
        <i class="fa"
           v-for="obj in someObj"
           :class="[obj.class]"
           draggable="true"
           @dragstart="getDrag($event,obj)"
           @dragend="getDragEnd($event)"
           @drop="getDropped()"></i>
        <div class="container" @dragenter="getDropped()" @dragover.prevent="" @drop="dropOperation()">
            <i class="fa"
               v-for="obj in added"
               :class="[obj.class]"></i>
        </div>
    </div>
</template>

<script>
  export default {
    name: "mainComponent",
    data(){
      return{
        someObj: [
          {
            class: 'fa-user',
            text: 'fa-user'
          },
          {
            class: 'fa-users',
            text: 'fa-users'
          },
          {
            class: 'fa-facebook',
            text: 'fa-facebook'
          }
        ],
        dragging: null,
        added:[]
      }
    },
    methods:{
      getDrag(event, el){
        this.dragging = el;
        // console.log('el',el);
      },
      getDragEnd(event){
        // console.log('event',this.dragging);
        // this.dragging = null;
      },
      getDropped(){
        console.log(this.dragging);
        return false;
        // this.added.push(this.dragging);
        // this.dragging = null;
      },
      dropOperation(){
        console.log('dropped');
        this.added.push(this.dragging);
      }
    }
  }
</script>

<style lang="scss" scoped>
.fa{
    padding: 10px;
}
    .container{
        height: 50px;
        border: 1px solid black;
        padding: 10px;
    }
</style>
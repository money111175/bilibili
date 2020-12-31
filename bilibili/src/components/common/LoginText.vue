<template>
<div>
  <van-field
      v-model="content"
      :label="label"
      :type="type"
      :placeholder="placeholder"
      :rule="rule"
  ></van-field>

</div>
</template>

<script>
export default {
  data() {
    return {
      content:''
    }
  },
  props:['label','type','placeholder','rule'],
  methods:{
    handlerulg() {
      // console.log(this.rule)
      const rue = new RegExp(this.rule)
      // console.log(rue)
      if(rue.test(this.content)){
        // console.log('正则效验成功了')
        this.$emit('inputChange',this.content)
        // this.$emit(this.rue)
      }
    }
  },
  watch:{
    //watch函数可以用于对content进行监听,一旦输入框的内容发生改变，立刻调用content里面的方法
    content(){
      this.handlerulg()
    }
  }
}
</script>

<style scoped>

</style>
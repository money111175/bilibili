<template>
<div>
  <div class="LoginTop">
    <div></div>
    <div>{{middleTop}}</div>
    <div>
      <slot name="right"/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:[
     'middleTop'
  ]
}
</script>

<style scoped lang="less">
  .LoginTop{
    height: 45px;
    background-color: orange;
    display: flex;
    div{
      flex: 1;
      display:flex;
      justify-content: center;
      align-items: center;
      font-size: 6vw;
    //  设置VM的话字体大小就会随着屏幕大小的变化而变化

    }
  }
</style>
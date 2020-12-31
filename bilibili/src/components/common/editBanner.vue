<template>
  <div @click="bannerClick">
      <div class="editbanner">
          <span>{{left}}</span>
          <span><slot name="right"></slot></span>        
      </div>
  </div>
</template>

<script>
export default {
    props:['left'],
    methods:{
        bannerClick() {
            this.$emit('bannerClick')
        }
    }
}
</script> 



<style>
.editbanner{
    background-color: white;
    padding: 15px;
    color:#113;
    font-size: 14px;
    border-bottom: 1px solid #fafafa;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
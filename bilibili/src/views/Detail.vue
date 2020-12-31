<template>
  <div @click="pathPush" v-if="detailitem">
      <div class="detailitem" >
      {{detailitem.id}}
      <div class="imgparent">
          <img :src="detailitem.img" alt="" style="width:100%; height:100%" >
          <div class="bottom">
              <div class="icon-play">
                <span class="video ">1233</span>
                <!-- <span class="comment">66</span> -->
              </div>       
          </div>
      </div>
      <p>{{detailitem.name}}</p>
  </div>
  </div>
</template>

<script>
export default {
    props:['detailitem'],
    methods:{
      pathPush(){
        if(this.$route.path != '/article/${this.detailitem.id}'){
            this.$router.push('/article/'+this.detailitem.id+'')

          }
      }
    }
}
</script>

<style scoped lang="less">
.detailitem{
  position: relative;
  p{
    font-size: 12px;
  }
}
.imgparent{
  position: relative;
  .bottom{
      padding: 10px 0;
      margin-bottom: 5px;
      position: absolute; 
      bottom: 8px;
      justify-content: space-between;
      color:white;
      display: flex;
      left: 0;
      right: 0;
    }
  .video{
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .common{
    position: absolute;
    right:0;
    bottom: 0;
  }
}
</style>
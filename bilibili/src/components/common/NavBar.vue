<template>
  <div class="navbar">
    <div class="logo">
      <img src="./logo.png" alt> 
    </div>
    <div>
      <p>
          请输入内容
          <van-icon class="ipt-icon" name="search"/>
      </p>
    </div>
    <div>
        <img :src='imgUrl' @click="$router.push('/userinfo')" v-if="imgUrl">
        <img src='./default_img.jpg' alt="" @click="$router.push('/Login')" v-else>
        <p>下载App</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imgUrl:''
    } 
  },
  async mounted(){
    if(localStorage.getItem('token')){
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
    // console.log(res);
      this.imgUrl = res.data[0].user_img
    }
  }
}
</script>

<style lang='less'>
.navbar{
  height: 12.5vm;
  background-color: white;
  display:flex;
  .logo{
    display:flex;
    justify-content:center;
    align-items:center;
    width: 90px;
    img{
      width: 100%;
    }
  }
   div:nth-child(2){
      flex:1;
      display: flex;
      align-items: center;
      margin:0 5px;
      p{
        font-size:12px;
        line-height: 26px;
        background-color: #f4f4f4;
        height: 23px;
        position: relative;
        padding-left: 30px;
        width: 100%;
        
        border-radius: 13px;
        color:#aaa;
        .ipt-icon{
            position: absolute;
            left:10px;
            top:50%;
            transform: translate(0,-40%);
            color:#aaa;
        }
      }
  }
  div:nth-child(3){
    display: flex;
    justify-content: center;
    align-content: center;
      img{
          width:24px;
          height:24px;
      }
      p{
        // padding: 5 10px;
        // margin:0 8px;
        background-color: #fb7299;
        color: white;
        border-radius: 3px;
        font-size:13px;
      }
  }
}

</style>
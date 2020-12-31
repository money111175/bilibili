<template>
  <div class="userinfo">
      <nav-bar></nav-bar>
      <img src="../components/common/bannerTop_new.png" class="backImg">
      <user-detail :userInfo = "model"/>

  </div>
</template>

<script>
import NavBar from '../components/common/NavBar'
import UserDetail from '../components/userComponent/userDetail.vue'
export default {
    data(){
        return{
            model:{}
        }
    },
    components:{
        NavBar,
        UserDetail
    },
    methods:{
        async UserinfoData(){
            const res = await this.$http.get('/user/' + localStorage.getItem('id'))
        // console.log(res);
            // console.log(res);
       
        this.model = res.data[0]
    }
},
    created(){
        this.UserinfoData()
    }
}
</script >

<style lang="less">
.userinfo{
    .backImg{
        height: 101px;
        width: 100%;
    }
}


</style>
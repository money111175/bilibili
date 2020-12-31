<template>
<div class="btnparent" @click="registerclick">
  <div class="loginbtn">{{btntext}}</div>
</div>
</template>

<script>
export default {
  props:[
      'btntext'
  ],
  methods:{
    registerclick(){
      this.$emit('registersubmit')
    }
  }
}
</script>

<style scoped>
.btnparent{
  padding: 15px 10px;
}
.loginbtn{
  height: 45px;
  background-color: #ff9db5;
  color:white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 22.5px;
  font-size: 16px;
}
</style>
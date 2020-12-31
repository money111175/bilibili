<template>
<div>
  <div>
    <login-top middleTop="登录bilibili">
        <div slot="right" style="font-size:13px" @click="$router.push('/register')">切换到注册</div>
    </login-top>
      <login-text
        label="账号"
        rule="^.{6,16}$"
        style="margin: 15px 0;"
        @inputChange="successInput2"
        placeholder="请输入账号"
    ></login-text>
    <login-text
        label="密码"
        placeholder="请输入密码"
        rule="^.{6,16}$"
        @inputChange="successInput3"
        type="password"
    ></login-text>
  </div>
  <login-btn btntext="登录" @registerclick="registersubmit"></login-btn>
  <!-- 这个@registersubmit表示从LoginBtn接受到的registersubmit事件，之后在等号后面再定义一个方法，这样当接受到LoginBtn
  传来的registersubmit事件之后，就可以在这里来使用这个定义好的方法了 -->
</div>
</template>

<script>
import LoginTop from '../components/common/LoginTop'
import LoginText from "../components/common/LoginText";
import LoginBtn from "../components/common/LoginBtn";

export default {
  data() {
    return {
        model:{
          username:'',
          password:''
        //这个代表我们需要凑齐的数据
        }
    }
  },
  components:{
    LoginTop,
    LoginText,
    LoginBtn,
  },
  methods:{
    successInput1(content){
      // console.log(content)
      this.model.name = content
    },
     successInput2(content){
      // console.log(content)
      this.model.username = content
    },
    successInput3(content){
      // console.log(content)
      this.model.password = content
    },
    async registersubmit() {
      // console.log('点击按钮')
      if(this.model.username && this.model.password){
        // console.log('正则效验成功')
       const res = await this.$http.post('/Login',this.model)
        this.$msg.fail(res.data.msg)
        if(res.data.code == 301||res.data.code==302){
          return
        }
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('id',res.data.id)
        setTimeout(() => {
          this.$router.push('/userinfo')
        }, 1000);
        // console.log(res)
        // console.log('之后再执行')
      }else{
        this.$msg.fail('格式不正确')
        // 这里使用了toast方法，一旦注册的时候输入的格式不正确，就会弹出这个提示消息
      }
    }
  }
}
</script>

<style scoped>

</style>
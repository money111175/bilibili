<template>
<div>
  <div>
    <login-top middleTop="注册bilibili">
      <div slot="right" style="font-size:13px" @click="$router.push('/Login')">切换到登录</div>
    </login-top>
    <login-text
        label="姓名"
        style="margin: 15px 0;"
        rule="^.{6,16}$"
        @inputChange="successInput1"
        placeholder="请输入姓名"
    ></login-text>
    <login-text
        label="账号"
        rule="^.{6,16}$"
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
  <login-btn btntext="注册" @registersubmit="registersubmit"></login-btn>
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
          name:'',
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
      let rulg = /^.{6,16}$/
      if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)){
        // 因为如果姓名账号密码没有校验成功的时候，model里面的东西是没有满的。所以必须是在model里面的所有东西都有了
        // 之后才能够发送请求
        // console.log('正则效验成功')
       const res = await this.$http.post('/register',this.model)
        this.$msg.fail(res.data.msg)
        localStorage.setItem('id',res.data.id)
        localStorage.setItem('token',res.data.objtoken)
        // localStorage.setItem是往本地存储里面存入数据
        setTimeout(() => {
          this.$router.push('/userinfo')
        }, 1000);
        console.log();
        console.log(res)
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
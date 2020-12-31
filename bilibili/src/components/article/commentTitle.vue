<template>
  <div class="comment" >
      <p class="comment-title"> 
          <span>评论</span>
          <span>({{dataLength}})</span>
      </p>

      <div class="commentMyinfo">
          <img :src="myuser.user_img" alt="" v-if="myuser">
          <img src="../common/default_img.jpg" alt="" v-else>
          <input v-model="comcontent" ref="Postipt" type="text" placeholder="说点什么吧">
          <!-- 当光标聚焦在input里面时会触发focus事件，从而触发focusInput方法 -->
          <!-- 这个ref="Postipt"可以 -->
          <button @click="commentPublish">发表</button>
      </div>
  </div>
</template>

<script>
export default {
    props:[
        'dataLength'
    ],
    data(){
        return{
            myuser:{},
            comcontent:'',
        }
    },
    methods:{
         async myUserinfo(){
            const res = await this.$http.get('/user/' + localStorage.getItem('id'))
            this.myuser = res.data[0]
        },
        commentPublish(){
            // console.log('聚焦了');
            if(this.myuser && !localStorage.getItem('token') && !localStorage.getItem('id')){
                this.$msg.fail('请先登录')
                return 
            }
            this.$emit('Postcomment',this.comcontent)
            this.comcontent=''
        },
        focusipt(){
            // console.log(this.$refs.Postipt);
            this.$refs.Postipt.focus()
        }
    },
    created(){
        if(localStorage.getItem('token')){
            this.myUserinfo()
        }
    },
    // updated(){
    //     this.focusipt()
    // }
}
</script>

<style lang="less">
.comment{
    padding: 30px 10px 0 10px;
    .comment-title{
        span:nth-child(2){
            color: #aaa;
            margin-left: 10px;
        }
    }
    .commentMyinfo{
        padding: 10px 0;
        display: flex;

        img{
            height: 25px;
            width: 25px;
            border-radius: 50%;
        }

        input{
            outline: none;
            // 消除input的默认样式
            border: 0;
            background-color: #f4f4f4;
            border-radius: 13px;
            font-size: 12px;
            padding: 0 20px 0 15px;
            margin-left: 10px;
        }

        button{
            outline: none;
            border: 0;
            border-radius: 12px;
            background-color: #fb7299;
            color: white;
            font-size: 12px;
            padding: 0 15px;

        }
    }
}

</style>
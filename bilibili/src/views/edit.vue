<template>
  <div v-if="model" class="editViews">
      <div style="margin-bottom:10px"><nav-bar></nav-bar></div> 


        <div class="uploadfile">
            <van-uploader  class="uploadimg" preview-size="100vw" :after-read="afterRead" />

            <edit-banner left="头像">
                <img slot="right" :src="model.user_img" v-if="model.user_img">
                <img slot="right" src="../components/common/default_img.jpg" v-else>
            </edit-banner>

        </div>

      <edit-banner left="昵称" @bannerClick="show = true">
          <a slot="right">{{model.name}}</a>
      </edit-banner>

      <edit-banner left="UID">
          <a slot="right">{{model.username}}</a>
      </edit-banner>

      <edit-banner left="性别" @bannerClick="gendershow= true">
          <a slot="right">{{model.gender == 1 ? '男' : '女'}}</a>
      </edit-banner>

      <edit-banner left="出生日期"></edit-banner>

      <edit-banner left="个性签名" @bannerClick="textshow = true">
      </edit-banner>

      <div class="editback" @click="$router.back()">返回个人中心页</div>
      <!-- 这个$router.back()是指返回上一级，如果我们是从个人中心页来到编辑资料页的话，我们点击这个就可以回到个人中心页 -->

      <van-dialog v-model="show" 
       @bannerClick="show = true"
       title="昵称"      
       show-cancel-button 
       @confirm="confirmClick"
       @cancel="content = ''">
        <van-field v-model="content" autofocus />
      </van-dialog>

      <van-dialog v-model="textshow" 
      title="个性签名" 
      show-cancel-button 
      @confirm="textareaClick"
      @cancel="content = ''">
        <van-field v-model="content"  type="texyarea" autofocus />
      </van-dialog>


      <van-action-sheet v-model="gendershow"  cancel-text="取消" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import NavBar from '../components/common/NavBar'
import EditBanner from '../components/common/editBanner'

export default {
    data(){
        return{
            model:{},
            show:false,
            textshow:false,
            gendershow:false,
            content:'',
            actions: [
                { name: '女' ,val:0}, 
                { name: '男' ,val:1}, 
            ],
        }
    },
    components:{
        NavBar,
        EditBanner
        
    },
    methods:{
        async selectUser(){
            const res = await this.$http.get('/user/' + localStorage.getItem('id'))
            this.model = res.data[0]
        },
        async afterRead(file){
            // 在将文件从本地上传到网页之后会触发这个afterRead函数
            const fromdata = new FormData()
            // fromdata相当于文件上传需要的格式
            fromdata.append('file',file.file)
            // 将对应的file对象中的file文件append到fromdata中，这个append也是后端规定的。   
            const res = await this.$http.post('/upload',fromdata)
            // 发送请求，并且将返回的对象存进res中，
            console.log(res);
            this.model.user_img = res.data.url;
            // 将res的data中的图片的url传进这个组件定义的model中，从而进行渲染
            // 但是这个时候如果刷新页面，那么图片就会消失，所以我们需要定义一个UserUpdata函数，将已经上传的图片传到后端
            this.UserUpdata()
        },
        async UserUpdata(){
            const res = await this.$http.post('/update/' + localStorage.getItem('id'),this.model)
            console.log(res);
            if(res.data.code = 200){
                this.$msg.fail('修改成功')
            }
        },
        confirmClick() {
            // console.log("用户点击确认了");
            this.model.name = this.content
            this.UserUpdata()
            this.content = ''
        },
        textareaClick() {
            this.model.user_desc = this.content
            this.UserUpdata()
            this.content = ''
        },
        onSelect(data){
            this.model.gender = data.val
            this.UserUpdata()
            this.gendershow = false
        }
    },
    created(){
        this.selectUser()
        
    }
}
</script>

<style scoped lang="less">
.editViews a{
    color: #333;
}
.editViews img{
    height:46px;
    width: 46px;
    border-radius: 50%;
}
.uploadfile{
    position: relative;
    overflow: hidden;
    .uploadimg{
        opacity: 0;
        position: absolute;
    }
}
.editback{
    margin-top: 20px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    // color:white;
    color: #999;
    padding:15px 0;
    font-size: 4vm;
}
</style>
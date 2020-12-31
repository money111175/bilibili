<template>
  <div v-if="model">
      <nav-bar></nav-bar>
      <div class="detailinfoP"> 
          <div class="video">
              <video controls="controls" :src="model.content"></video>
          </div>
          <div class="detailinfotext">
              <div>
                  <span>{{model.category.title}}</span>
                  <span>{{model.name}}</span>
              </div>

              <div>
                  <span>{{model.userinfo.name}}</span>
                  <span>888.888万次观看</span>
                  <span>888弹幕</span>
                  <span>{{model.date}}</span>
              </div>

              <div>
                  <p @click="collectionclick" :class="{activeColor:collectionActive}"> 
                      <span class="icon-mic"></span>
                      <span>收藏</span>
                  </p>
                  <p @click="subscriptclick" :class="{activeColor:subscritionActive}">
                      <span class="icon-office"></span>
                      <span>缓存</span>
                  </p>
                  <p>
                      <span class="icon-home"></span>
                      <span>分享</span>
                  </p>
              </div>

          </div>

      </div>
      <div class="detailparent" >
          <detail class="detailitem" 
                v-for="(item,index) in commendList" 
                :key="index" 
                :detailitem="item">
          </detail>
      </div>

      <comment-title :dataLength="lens" 
                     @Postcomment="PostSuccess"
                     ref="commentIpt"></comment-title>
      <comment @lengthselect="len => lens = len"
               @publishclick="PostChildclick"
               ref="commentPublish" />
  </div>
</template>

<script>
import NavBar from '../components/common/NavBar.vue'
import detail from './Detail'
import CommentTitle from '../components/article/commentTitle.vue'
import comment from '../components/article/comment'


export default {
    data(){
        return {
            model:null,
            commendList:null,
            myuser:null,
            lens:null,
            Postcom:{
                comment_content:'',
                comment_date:'',
                parent_id: null,
                article_id: null,
            },
            collectionActive:null,
            subscritionActive:null
        }
    },
    components:{       
        NavBar,
        detail,
        CommentTitle,
        comment
        
    },
    methods:{
        // 获取文章信息
        async articleitemData(){
            // console.log(this.$route);
            const res = await this.$http.get('/article/' + this.$route.params.id);
            this.model = res.data[0]
            if(this.model){
                this.subscritionInit()
            }
        },
        async commentData(){
            const res = await this.$http.get('/comment')
            // console.log(res);
            this.commendList = res.data
            // console.log(this.commendList);
            
        },
        //发送评论
        async PostSuccess(res){
            // console.log(res);
            const date = new Date()
            let m = date.getMonth() + 1
            let d = date.getDate()
            if(m < 10){
                m='0' + m
            }
            if(d < 10){
                d = '0' + d
            }
            let str = `${m}-${d}`
            console.log(str);
            this.Postcom.comment_content = res
            this.Postcom.comment_date = str
            this.Postcom.article_id = this.$route.params.id
            // console.log(this.Postcom);
            const result = await this.$http.post('/comment_post/' + localStorage.getItem('id'),this.Postcom)
            // console.log(result);
            this.$refs.commentPublish.commentData()
            this.Postcom.parent_id = null
            if(result.status = 200){
                this.$msg.fail('评论发表成功')
            }
        },
        PostChildclick(id){
            // console.log(id);
            this.Postcom.parent_id = id
            this.$refs.commentIpt.focusipt()
        },
        async collectionclick(){
            // 收藏文章
            // console.log('aaa');
           if(localStorage.getItem('token')){
            //    必须是登录的用户才能够发送这个请求进行文章收藏
                const res = await this.$http.post('/collection/' + localStorage.getItem('id'),{
                article_id:this.$route.params.id
            })
            // console.log(res);
                if(res.data.msg == '收藏成功'){
                    this.collectionActive = true
                }else{
                    this.collectionActive = false
                }
                this.$msg.fail(res.data.msg)
            }
        },
        // 进入页面获取是否收藏了
        async collectionInit(){
            if(localStorage.getItem('token')){
                const res = await this.$http.get('/collection/' + localStorage.getItem('id'),{
                    params:{
                        article_id:this.$route.params.id
                    }
                })        
                // console.log(res); 
                this.collectionActive = res.data.success
            }
        },
        // 点击关注发帖用户
        async subscriptclick(){
            // 收藏文章
            // console.log('aaa');
           if(localStorage.getItem('token')){
            //    必须是登录的用户才能够发送这个请求进行用户关注
                const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'),{
                sub_id:this.model.userid
            })
            // console.log(res);
                if(res.data.msg == '关注成功'){
                    this.subscritionActive = true
                }else{
                    this.subscritionActive = false
                }
                // console.log(res);
                this.$msg.fail(res.data.msg)
            }
        },
         async subscritionInit(){
            if(localStorage.getItem('token')){
                const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'),{
                    params:{
                        sub_id:this.model.userid
                    }
                })        
                // console.log(res); 
                this.subscritionActive = res.data.success
            }
        }

    },
    created(){
        this.articleitemData()
        this.commendData()
        this.collectionInit()
       
    },
    watch:{
        $route(){
            console.log('路径变化了');
            this.articleitemData()
            this.commendData()
            this.collectionInit()
        }
    }
}
       
</script>

<style lang="less">
.detailinfoP{
    background-color: white;
    .video{
        width:100%;
        video{
            width:100%;
        }
    }
}
.detailinfotext{
    padding:15px;
    div:nth-child(1){
        span:nth-child(1){
            padding: 0 10px;
            color: #fb7299;
            background-color: #f4f4f4;
            border-radius: 10px;
        }
    }
    div:nth-child(2){
        padding:10px 10px;
        span{
            color:#aaa;
            font-size: 12px;
        }
        span:nth-child(1){
            color: black;
            font-size: 17px;
            padding-right: 10px;
        }
    }
    div:nth-child(3){
        padding: 0 10px;
        display: flex;
        p{
            margin-right:15px;
            display: flex;
            align-items: center;
            color: #757575;
            span:nth-child(1){
                font-size: 21px;
                padding-right: 3px;
            }
            span:bth-child(2){
                font-size: 13px;
            }
        }
        .activeColor{
            color: #fb7299;
        }
    }
}
.detailparent{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem{
    margin: 5px 0;
    width:45%
  }
}
</style>
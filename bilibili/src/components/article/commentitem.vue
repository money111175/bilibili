<template>
  <div class="commentitems">
       <div class="commentItem" v-for="(item,index) in commentChild" :key="index">
                <div class="userimg">
                    <img src="../common/default_img.jpg" alt="">
                    <p>
                        <span v-if="item.userinfo">{{item.userinfo.name}}</span>
                        <span v-else>此用户无姓名</span>
                        <span>{{item.comment_data}}</span>
                    </p>
                </div>
                <div class="commentContent">
                    <div v-if="!temp">
                        {{item.comment_content}}
                        <span class="publish" @click="PostItemcommend(item.comment_id)">回复</span>
                    </div>
                    <div v-else>
                        回复<span style="color:#fb7299">{{item.parent_user_info.name}}</span>:
                        {{item.comment_content}}
                        <span class="publish"  @click="PostItemcommend(item.comment_id)">回复</span>
                    </div>
                </div>
                <commentchild-item :commentChild="item.child" 
                                   @postChild="postChild" 
                                   temp="true"></commentchild-item>
                <!-- 这里是组件的递归，在下面设置一个name属性，之后调用这个组件，然后将一个组件里面的child传进去，这样就可以
                进行组件递归，从而实现评论的渲染 -->
       </div>
  </div>
</template>

<script>
export default {
    name:'commentchildItem',
    props:['commentChild','temp'],
    methods:{
         PostItemcommend(id){
            //  console.log(id);
            this.$emit('postChild',id)
             this.$emit('PostPublish',id)
         },
         postChild(id){
             this.PostItemcommend(id)
             this.$emit('PostPublish',id)
         }
    }
}
</script>

<style scoped lang="less">
.commentitems{
    
    .commentItem{
        display: flex;
        flex-direction: column;
        .userimg{
            display: flex;
            img{
                margin: 0 5px 10px;
            }
            p{
                flex: 1;
                font-size: 13px;
                color: #555;
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
        }
        .commentContent{
            margin-bottom: 8px;
            .publish{
                position: absolute;
                right: 15px;
                color: red;

            }
        }
    }
}
</style>
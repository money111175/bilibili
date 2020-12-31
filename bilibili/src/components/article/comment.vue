<template>
    <div class="commentParent">
        <div v-for="(item,index) in commentList" :key="index">
            <div class="commentItem">
                <div class="userimg">
                    <!-- <img v-if="item.userinfo.user_img && item.usereinfo" :src="item.unsrinfo.user_img" alt=""> -->
                    <img  src="../common/default_img.jpg" alt="">
                </div>
                <div class="commentContent">
                    <p>
                        <span v-if="item.userinfo">{{item.userinfo.name}}</span>
                        <span v-else>此用户无姓名</span>
                        <span>{{item.comment_data}}</span>
                    </p>
                    <div>
                        {{item.comment_content}}
                        <span class="publishs" @click="publishclick(item.comment_id)">回复</span>
                    </div>
                </div>
            </div>
            <div style="padding-left:30px;">
                <comment-item @PostPublish="publishclick" :commentChild="item.child"></comment-item>
            </div>
        </div>
    </div>
</template>

<script>
import commentItem from './commentitem'

export default {
    data(){
        return{
            commentList:null
        }
    },
    components:{
        commentItem
    },
    methods:{
        async commentData(){
            const res = await this.$http.get('/comment/' + this.$route.params.id)
            if(res.data){
                this.$emit('lengthselect',res.data.length)
            }
            // console.log(res.data);
            this.commentList = this.changecommentData(res.data)
        },
        changecommentData(data){
            function fn(temp) {
                let arr1 = []
                for (var i = 0; i < data.length; i++) {
                    if (data[i].parent_id == temp) {
                        // console.log(arr[i]);
                        arr1.push(data[i])
                            // 将arr[i]放到数组arr1里面
                        data[i].child = fn(data[i].comment_id)
                    }
                }
                return arr1
                // console.log(arr1);
            }
            return fn(null)
            // console.log(res);
            },
            publishclick(id){
                // console.log(id);
                this.$emit('publishclick',id)
            }
        },
    created(){
        this.commentData()
    }

}
</script>

<style lang="less">
.commentParent{
    padding: 10px 10px;
    .commentItem{
        display: flex;
        border-bottom: 1px solid #e7e7e7;
        padding: 10px 0;
         .userimg{
            margin-right: 10px;
            img{
                width: 35px;
                height: 35px;
            }
        }
        .commentContent{
            flex: 1;
            position: relative;
            p{
                font-size: 13px;
                color: #555;
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            div{
                font-size: 13px;
            }
            .publishs{
                position: absolute;
                right: 0;
                color: red;
            }
        }
    }
}

</style>
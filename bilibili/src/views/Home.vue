<template>
  <div class="home">
      <nav-bar></nav-bar>

      <van-tabs v-model="active" swipeable >
        <!-- active这里的active是获取到每个分类的数字，初始时需要赋值为0 -->
        <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
          <!-- :title="item.title这句是相当于从后台请求回来的数据里面拿到每个object里面的title -->
            <van-list
              v-model="item.loading"
              :finished="item.finished"
              finished-text="我也是有底线的"
              @load="onLoad"
            >
            
            <div class="detailparent">
              <detail
              class="detailitem"
              :detailitem="categoryitem" 
              v-for="(categoryitem,categoryindex) in item.list" 
              :key='categoryindex'>
              </detail>
              <!--detailitem是父传子，将detailitem传给子组件  -->
            </div>

          </van-list>

        </van-tab>

      </van-tabs>
      
  </div>
</template>

<script>
import NavBar from '../components/common/NavBar' 
import detail from './Detail'

export default {
    data(){
      return {
        category:[],
        active:0
      }
    },
    components:{
      NavBar,
      detail
    },
    methods:{
        async selectCategory(){
              const res = await this.$http.get('/category')
              this.changecategory(res.data)
        },
        changecategory(data){
            const category1 = data.map((item,index) => {
                item.list = [];
                // 对后台返回的元素进行改造,这一句是item里面多一个list数组
                item.page = 0;
                item.finished = false;
                item.loading = false;


                item.pagesize = 10;
                return item;
            })
            this.category = category1
            this.selectArticle()
        },
        // 获取视频数据
        async selectArticle(){
              const categoryitem = this.categoryitem()
              const res = await this.$http.get('/detail/' + categoryitem._id,{
                // 传入当前的页数以及每一页应该渲染多少条
                params:{
                  page:categoryitem.page,
                  pagesize:categoryitem.pagesize
                }
              });
              // console.log(res.data);
              categoryitem.list.push(...res.data)
              categoryitem.loading = false
              if(res.data.length < categoryitem.pagesize){
                // 如果最后一次的请求获得的数据没有达到10个，那么也就是说到底了
                categoryitem.finished = true
              }
        },
        onLoad(){
          console.log('已经到底了');
          const categoryitem = this.categoryitem()
          setTimeout(() => {
            categoryitem.page += 1
            this.selectArticle()
          })
        },
        // 获取被选中的栏目的内容的id
        categoryitem(){
          const categoryitem = this.category[this.active]
          return categoryitem
        }
    },
    watch:{
      // 监听活跃的变化
      active() {
        this.selectArticle()
      }
    },
    created(){
      this.selectCategory()
    }
}
</script>

<style lang="less">
.home{
  background-color: white;
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
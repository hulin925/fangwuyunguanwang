<template>
  <div class="app">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <header>
        <div class="search">
          <img :src="titleImg" alt="">
          <!--<div><img src="../../../assets/img/Back.png" alt="" class="goBack" @click="goBack"></div>-->
          <img src="../../../assets/img/search.png" alt="" class="searchImg">
          <input type="text" placeholder="输入关键之，支持全文检索" v-on:input="inputFunc()" v-model="keywords">
        </div>
      </header>
      <div class="content">
        <h1>最新发条</h1>
        <ul class="list">
          <li v-for="item,index in dataList" @click.stop="goDetails(item)">
            <div class="title">
              <p>{{item.title}}</p>
            </div>
            <div class="listContent clearfix">
              <span>发布机关:{{item.section}}</span>
              <i>发布日期:{{item.release_time}}</i>
            </div>
          </li>
          <li v-if="!dataList.length" class="bordernone">
            <p class="upwarp-nodata">亲,没有更多数据了~</p>
          </li>
        </ul>

        <!--内容...-->


      </div>
    </mescroll-vue>
  </div>
</template>

<script>
  import {SearchBackThree, SearchIdThree} from '@/assets/public.js'
  // @ is an alias to /src
  import MescrollVue from 'mescroll.js/mescroll.vue'

  export default {
    name: "SearchLaw",
    components: {
      MescrollVue // 注册mescroll组件
    },
    data() {
      return {
        classify: '',
        obj: {},
        id: '',
        titleImg: '',
        keywords: '',
        dataList: [],
        mescroll: null, // mescroll实例对象
        mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
          //以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 9 //每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
          noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          toTop: {
            //回到顶部按钮
            src: "https://web.3fgj.com/mes.png", //图片路径,默认null,支持网络图
            offset: 500 //列表滚动1000px才显示回到顶部按钮
          },
          // empty: {
          //   //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示L
          //   warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
          //   icon: "../../../static/mescroll-empty.png", //图标,默认null,支持网络L图
          //   tip: "暂无相关数据~" //提示
          // }
        },
      }
    },
    created() {
      this.initImg();
    },
    methods: {
      GetQueryString(name) { //截取?后想要的数据 lawyerId
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      // goBack(){
      //   SearchBackThree();
      // },
      goDetails(item) {//点击跳转详情
        this.obj.id = item.id;
        this.obj.classify = this.classify;
        // SearchIdThree(this.obj);//ios传递参数
        // window.htmlToAndroid.SearchIdThree(JSON.stringify(this.obj));//android 传递参数

        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          SearchIdThree(this.obj);//ios传递参数
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          window.AndroidMethod.SearchIdThree(JSON.stringify(this.obj));//android 传递参数
        }
        // this.$router.push({name:'LawyerFindLawDetails',query:{id:item.id}})
      },
      inputFunc(v) {
        this.mescroll.resetUpScroll()
      },
      mescrollInit(mescroll) {
        this.mescroll = mescroll
      },
      initImg() {//获取页面图片数据
        let formData = new FormData();
        formData.append('flag', 'legal_guide');
        formData.append('port', '2');
        this.$store.dispatch('LawyerFindImg', formData)
          .then(data => {
            this.titleImg = data[0].pic[0];
          }, err => {

          })
      },
      initSearch(page, mescroll) {//获取搜索数据
        let options = new FormData();
        options.append('page', page.num);
        options.append('key_words', this.keywords);
        this.$store.dispatch('LawyerFindSearch', options).then(response => {
          // 请求的列表数据
          let arr = response.list;
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.dataList = [];
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        }, err => {
        }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
      },
      initData(page, mescroll) {//页面初始数据
        let options = new FormData();
        options.append('page', page.num);
        options.append('tag', 'fatiao');//'fatiao' //this.GetQueryString('tag')
        options.append('id', '0');//'0'
        this.$store.dispatch('LawyerFindFatiao', options)
          .then(response => {
            console.log(response)
            this.classify = response.classify;
            // 请求的列表数据
            // this.titleImg=response.ad[0].picturepath;
            let arr = response.list;
            // 如果是第一页需手动制空列表
            if (page.num === 1) this.dataList = []
            // 把请求到的数据添加到列表
            this.dataList = this.dataList.concat(arr)
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length)
            })
          }, err => {
            mescroll.endErr()
          }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
      },
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback(page, mescroll) {
        if (this.keywords) {
          this.initSearch(page, mescroll)
        } else {
          this.initData(page, mescroll)
        }
      },
    }
  };
</script>

<style scoped lang="less">
  @r: 30rem;
  /*以fixed的方式固定mescroll的高度*/
  .mescroll {
    position: fixed;
    top: 82/@r;
    bottom: 0;
    height: auto;
  }

  .app {
    font-weight: bold;
  }

  .search {
    position: relative;
    height: 500/@r;
  }

  .search .searchImg {
    width: 50/@r;
    position: absolute;
    top: 60/@r;
    left: 120/@r;
    z-index: 3;
  }

  .search .goBack {
    width: 70/@r;
    position: absolute;
    top: 50/@r;
    left: 10/@r;
    z-index: 3;
    padding: 10/@r;

  }

  input {
    position: absolute;
    top: 50/@r;
    left: 50%;
    transform: translateX(-46%);
    width: 85%;
    height: 70/@r;
    border-radius: 45/@r;
    background-color: #cececf;
    padding: 0 30/@r;
    border: none;
    text-align: center;
    color: #6f6f6f;
    font-size: 32/@r;
  }

  header img {
    width: 100%;
  }

  .content {
    padding: 20/@r;
  }

  .content h1 {
    margin-top: 30/@r;
    font-size: 38/@r;
    line-height: 60/@r;
  }

  .list {
    margin-bottom: 50/@r;
  }

  .list li {
    margin-top: 40/@r;
    border-bottom: 1px solid #ccc;
  }

  .title {
    width: 100%;
  }

  .title p {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 58/@r;
    font-size: 32/@r;
    color: #2f2f2f;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .listContent {
    margin-top: 40/@r;
    height: 80/@r;
    color: #9f9f9f;
  }

  .listContent span {
    width: 58%;
    float: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .listContent i {
    text-align: right;
    width: 42%;
    float: right;
  }

  .content .bordernone {
    border: none;
    text-align: center;
    height: 180/@r;
    font-size: 36/@r;
    color: #9d9d9d;
  }
</style>

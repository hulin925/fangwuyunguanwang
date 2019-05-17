<template>
  <div class="app">
    <div class="title">
      <img src="../../../assets/img/goback.png" alt="" @click.stop="$router.go(-1)">
      <span>我的粉丝</span>
    </div>
    <!--mescroll滚动区域的基本结构-->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <!--内容...-->
      <ul class="list">
        <li v-for="item,index in dataList" class="clearfix">
          <div class="left">
            <img :src="item.faces" alt="">
          </div>
          <div class="content">
            <span>{{item.nickname}}</span>
            <i class="iconfont  icon-nan" v-if="item.sex==0"></i>
            <i class="iconfont  icon-nv" v-else-if="item.sex==1"></i>
          </div>

        </li>
      </ul>
    </mescroll-vue>

  </div>
</template>

<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'

  export default {
    name: "myFans",
    components: {
      MescrollVue // 注册mescroll组件
    },
    data() {
      return {
        lid: '',
        mescroll: null, // mescroll实例对象
        mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          //以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 9 //每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">-- 暂无更多关注 --</p>',
          noMoreSize: 2, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
          // 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          // 这就是为什么无更多数据有时候不显示的原因
          toTop: {
            //回到顶部按钮
            src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
            offset: 1000 //列表滚动1000px才显示回到顶部按钮
          },
          empty: {
            //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
            icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
            tip: "暂无相关数据~" //提示
          }
        },
        dataList: [] // 列表数据
      }
    },
    created() {
      this.lid = JSON.parse(sessionStorage.getItem('specialInfo')).lid;
    },
    methods: {
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback(page, mescroll) {
        this.initData(page, mescroll);
      },
      initData(page, mescroll) {
        let options = new FormData();
        options.append('lid', this.lid);
        options.append('page', page.num);
        this.$store.dispatch('MyFans', options)
          .then(data => {
            data.list.forEach(item => {
              item.faces = item.weburl + item.face;
            })
            console.log(data);
            // 请求的列表数据
            let arr = data.list;
            // 如果是第一页需手动置空列表
            if (page.num === 1) this.dataList = [];
            // 把请求到的数据添加到列表
            this.dataList = this.dataList.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length)
            })
          },err=>{
            mescroll.endErr()
          }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })

      }
    }

  }
</script>

<style scoped lang="less">
  @r: 30rem;

  .title {
    padding-top: 35/@r;
    text-align: center;
    height: 130/@r;
    line-height: 100/@r;
    font-size: 34/@r;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    position: relative;
    background-color: #9295ff;
    color: #fff;
  }

  .title img {
    position: absolute;
    width: 80/@r;
    height: 80/@r;
    left: 20/@r;
    top: 44/@r;
    padding: 20/@r;
  }

  .list {
    padding-top: 20/@r;
  }

  li {
    padding: 10/@r 20/@r;
    border-bottom: 1px solid #e6e6e6;
  }

  .left {
    width: 120/@r;
    height: 120/@r;
    border-radius: 60/@r;
    overflow: hidden;
    float: left;
    background: url("../../../assets/img/headerIcon.png") no-repeat;
    background-size: cover;
    margin-right: 20/@r;
    position: relative;
  }

  .left img {
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .content {
    float: left;
    padding-top: 10/@r;
  }

  .content span {
    height: 40/@r;
    line-height: 40/@r;
    font-size: 32/@r;
  }

  .icon-nan {
    color: #5ab3ff;
  }

  .icon-nv {
    color: #ff77fd;
  }

</style>

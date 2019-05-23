+<template>
  <!--mescroll滚动区域的基本结构-->
  <div>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit"  :class="this.$isMobile()?'':'isPc'">
      <LawyerSpecialNav></LawyerSpecialNav>
      <div class="app">

        <ul class="list">
          <li>{{data.introduction}}</li>
          <li>
            <i>地区</i>
            <span v-if="data.province_cn||data.province_cn||data.area_cn">{{data.province_cn}} {{data.city_cn}} {{data.area_cn}}</span>
            <span v-else>无</span>
          </li>
          <li>
            <i>执业年限</i>
            <span>{{data.work_time}}年</span>
          </li>
          <li>
            <i>擅长领域</i>
            <span v-if="industry">{{industry}}</span>
            <span v-else>无</span>
          </li>
        </ul>
        <div class="footer">
          <h1>评论</h1>

          <ul class="listComment">
            <li class="clearfix" v-for="item,index in dataList">
              <div class="left">
                <img :src="list.faces" alt="">
              </div>
              <div class="right">
                <p>{{item.nickname}}</p>
                <p>{{item.province_cn}} {{item.city_cn}}</p>
                <h2>{{item.content}}</h2>
              </div>
            </li>
            <li v-if="dataList" class="CommentFont">~ 亲 暂无更多评论~</li>
          </ul>


        </div>


      </div>
      <!--内容...-->
    </mescroll-vue>

  </div>
</template>

<script>
  // 引入mescroll的vue组件
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import {mapGetters} from 'vuex'
  import LawyerSpecialNav from './LawyerSpecialNav.vue'
  export default {
    name: "Home",
    components: {
      MescrollVue,// 注
      // 册mescroll组件
      LawyerSpecialNav
    },
    data() {
			var _this = this;
      return {
        lid:'',
        pageLength: '',//列表条数
        data: {},
        list: [],//用户列表
        industry: '',//擅长领域
        weburl: "",//图片地址
        mescroll: null, // mescroll实例对象
        mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          //以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: this.pageLength //每页数据条数,默认10
          },
					onScroll:function(mescroll,y){//滚动判断nav定位
						_this.$nextTick(function(){
							let nav = document.querySelector('nav')
							if(y>240){
								nav.style.position = 'fixed';
                nav.style.zIndex="9999";
								nav.style.top='0';
							}else{
								nav.style.position = 'static';
                nav.style.paddingTop="0";
              }
						})
					},
          htmlNodata: '<p class="upwarp-nodata">~暂无更多评论~</p>',
          noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
          // 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          // 这就是为什么无更多数据有时候不显示的原因
          // toTop: {
          //   //回到顶部按钮
          //   src: "../../static/mes.png", //图片路径,默认null,支持网络图
          //   offset: 500 //列表滚动1000px才显示回到顶部按钮
          // },
          empty: {
            //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            // warpId: "", //父布局的id (1.3.5版本支持传入dom元素)
            icon: "../../static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
            tip: "暂无相关数据~" //提示
          }
        },
        dataList: [] // 列表数据
      }
    },
    created() {
      this.lid=JSON.parse(sessionStorage.getItem('LawyerId'));
    },
		mounted(){
		},
    methods: {
      GetQueryString(name) { //截取?后想要的数据 lawyerId
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback(page, mescroll) {
        this.initData(page, mescroll);
      },
      initData(page, mescroll) {//初始化数据
        this.$store.commit("showLoading");
        let options = new FormData();
        options.append('lid',this.lid);//1068 //this.GetQueryString('lid')
        options.append('page', page.num);
        this.$store.dispatch('LawyerSpecial', options)
          .then(data => {
            this.pageLength = data.list.length;
            this.data = data;
            this.list = data.list;//用户列表

             let industry = data.industry.map(item=>{
              return item.industry
            })
            this.industry = industry.join('、');//擅长领域
            this.weburl = data.weburl;
            this.data.list.forEach((item) => {//头像
              item.faces = this.weburl + item.face;
            });
            // 请求的列表数据
            let arr = data.list;
            // 如果是第一页需手动制空列表
            if (page.num === 1) this.dataList = [];
            // 把请求到的数据添加到列表
            this.dataList = this.dataList.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length)
            })
            this.$store.commit("hidenLoading");
          }, err => {
            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr();
            this.$store.commit("hidenLoading");
          }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
          this.$store.commit("hidenLoading");
        });
      },
    },
  }
</script>

<style scoped lang="less">
  @r: 30rem;

  .isPc{
    overflow: hidden;
  }
  /*通过fixed固定mescroll的高度*/
  .mescroll {
    position:absolute;
    top: 0;
    bottom: 0;
    height: auto;
    overflow-y:scroll;
    box-sizing:border-box;
  }
  .app {
    color: #333;
    padding: 26/@r 32/@r;
    background-color: #fff;
  }
  .list li {
    padding: 26/@r 0;
    line-height: 40/@r;
    border-bottom: 1px solid #ddd;
  }
  .list li:nth-child(1) {
    padding-top: 0;
    line-height: 40/@r;
  }
  .list li i {
    width: 140/@r;
    display: inline-block;
  }
  .list li span {
    color: #000;
  }
  img {
    width: 100%;
  }
  .footer h1 {
    line-height: 92/@r;
  }
  .listComment li {
    margin-bottom: 30/@r;
  }
  .listComment .left {
    width: 80/@r;
    height: 80/@r;
    float: left;
    border-radius: 50%;
    background-image: url("../../../assets/img/headerIcon.png");
    background-size: cover;
    margin-right: 10/@r;
    overflow: hidden;
  }
  .listComment .right {
    float: left;
    border-bottom: 1px solid #ddd;
    width: 86%;
  }
  .listComment .right p {
    line-height: 42/@r;
  }
  .listComment .right p:nth-child(2) {
    font-size: 24/@r;
    color: #666666;
  }
  .listComment .right h2 {
    font-size: 32/@r;
    color: #000;
    padding: 0 0 18/@r 0;
  }
  .mainFooter {
    line-height: 96/@r;
    text-align: center;
    color: #fff;
    background: linear-gradient(243deg, rgba(248, 223, 81, 1) 0%, rgba(255, 200, 57, 1) 100%);
    font-size: 36/@r;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .CommentFont{
    text-align:center;
  }
</style>

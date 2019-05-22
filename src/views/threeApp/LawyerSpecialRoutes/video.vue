<template>
  <div class="app">
    <!--mescroll滚动区域的基本结构-->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit"  :class="this.$isMobile()?'':'isPc'">
      <LawyerSpecialNav></LawyerSpecialNav>

      <ul class="list">
        <li v-for="item,index in dataList">
          <div class="title clearfix">
            <div class="left">
              <img :src="item.faces" alt="">
            </div>

            <div class="Grade">
              <img src="../../../assets/img/lanV.png" alt="" v-if="item.cert_type!=1" class="GradeFirst">
              <img src="../../../assets/img/level.png" alt="" v-else class="GradeTwo">
            </div>

            <div class="center">
              <h2 :class="{GradeColor:item.cert_type != 1}">{{item.username}}</h2>
              <p>{{item.add_time}}</p>
            </div>
          </div>

          <div class="topTitle" @click.stop="JumpDetails(item)">{{item.title}}</div>

          <!--<div class="brief clearfix">-->
          <!--<span>刑事</span>-->
          <!--<span>治安</span>-->
          <!--</div>-->
          <div class="Img clearfix">
            <!--<div>-->
              <!--<video-->
                <!--width="320" height="240" :poster="item.cover" controls="controls" style="object-fit:fill"-->
              <!--&gt;-->
                <!--<source :src="item.videos" type="video/mp4">-->
              <!--</video>-->
            <!--</div>-->

            <div v-if="item.local==0">
              <video
                width="320" height="240" :poster="item.cover" controls="controls" webkit-playsinline="true"
                x5-video-player-type="h5"
              >
                <source :src="item.videos" type="video/mp4">
              </video>
            </div>
            <div v-else-if="item.local==1">
              <video
                width="320" height="240" :poster="item.cover" controls="controls" webkit-playsinline="true"
                x5-video-player-type="h5"
              >
                <source :src="item.path" type="video/mp4">
              </video>
            </div>

          </div>
          <div class="border"></div>
          <div class="bottom">
            <div @click.stop="JumpDetails(item)">
              <i class="iconfont  icon-yuedu"></i>
              <span>阅读</span>
              <i>{{item.click}}</i>
            </div>
            <div @click.stop="JumpDetails(item)">
              <i class="iconfont  icon-pinglun"></i>
              <span>评论</span>
              <i>{{item.history_comment_count}}</i>
            </div>
            <div @click.stop="Fabulous(item)" :class="{color:item.iszan == 1}">
              <span><i class="iconfont  icon-zan" :class="{color:item.iszan == 1}"></i></span>
              <span>点赞</span>
              <i>{{item.histort_reward_count}}</i>
            </div>
          </div>
        </li>
      </ul>

      <div class="noneData"  v-if="noneData" >
        <img src="../../../assets/img/follow.png" alt="">
        <p>暂无发布相关视频！</p>
      </div>

      <!--内容...-->
    </mescroll-vue>

    <div class="showStart">
      <toast v-model="showStart" type="text" :time="1000">
        <div class="pointStart">
          <i></i>
        </div>
      </toast>
    </div>

  </div>
</template>

<script>
  // 引入mescroll的vue组件
  import {PopupPicker, Group,Toast} from 'vux'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import LawyerSpecialNav from './LawyerSpecialNav.vue'//引入子组件
  import {
    FabulousVideo,
    ArticleVideo,
  } from '@/assets/public.js'

  export default {
    name: "viewpoint",
    components: {
      MescrollVue, // 注册mescroll组件
      LawyerSpecialNav,
      PopupPicker,//vux
      Group,//vux
      Toast,//vux
    },
    data() {
      var _this = this;
      return {
        videoData:'',//android视频处理
        showStart: false,
        noneData:false,
        obj: {},//储存ios数据传递
        lid: '',
        mescroll: null, // mescroll实例对象
        mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          //以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10 //每页数据条数,默认10
          },
          onScroll: function (mescroll, y) {//滚动判断nav定位
            _this.$nextTick(function () {
              let nav = document.querySelector('nav');
              if (y > 200) {
                nav.style.position = 'fixed';
                nav.style.zIndex = "9999";
                nav.style.top = '0';
              } else {
                nav.style.position = 'static';
                nav.style.paddingTop = "0";
              }
            })
          },
          htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
          noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
          // 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          // 这就是为什么无更多数据有时候不显示的原因
          // toTop: {
          //   //回到顶部按钮
          //   src: "./static/mescroll/mes.png", //图片路径,默认null,支持网络图
          //   offset: 1000 //列表滚动1000px才显示回到顶部按钮
          // },
          empty: {
            //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            // warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
            icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
            tip: "暂无相关数据~" //提示
          }
        },
        dataList: [] // 列表数据
      }
    },
    mounted() {
      // window.Follows= this.Follows();
      // window.FabulousPassVideo = this.FabulousPassVideo;//点赞
    },
    created() {
      this.videoData=this.GetQueryString('video');
      this.lid=JSON.parse(sessionStorage.getItem('LawyerId'));
    },
    methods: {
      GetQueryString(name) { //截取?后想要的数据 lawyerId
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      JumpDetails(obj) {//跳转律师详情页
        this.$router.push({name: 'LawyerFindArticleDetail', query: {obj}});
        sessionStorage.setItem('detailsId',JSON.stringify(obj));
      },
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback(page, mescroll) {
        this.initData(page, mescroll)
      },
      initData(page, mescroll) {//初始数据
        let options = new FormData();
        options.append('lid', this.lid);//1068
        options.append('flag', 'video');
        options.append('page', page.num);
        options.append('uid', this.GetQueryString('uid'));
        this.$store.dispatch('LawyerVideo', options)
          .then(data => {
            if (data.list.length) { //判定数据是否存在,显示关注按钮
              this.noneData = false;
            } else {
              this.noneData = true;
            }
            data.list.forEach((v) => {
              v.faces = v.weburl + v.face;
              v.videos = v.weburl + v.path;
              v.cover = v.weburl + v.thumbnail;
            });

            // 请求的列表数据
            let arr = data.list;
            // 如果是第一页需手动制空列表
            if (page.num === 1) this.dataList = [];
            // 把请求到的数据添加到列表
            this.dataList = this.dataList.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length);

              var videos = document.getElementsByTagName('video');
              for (var i = videos.length - 1; i >= 0; i--) {
                (function(){
                  var p = i;
                  videos[p].addEventListener('play',function(){
                    pauseAll(p);
                  })
                })()

              }
              function pauseAll(index){
                for (var j = videos.length - 1; j >= 0; j--) {
                  if (j!=index) videos[j].pause();
                }
              }
            })
            // this.$store.commit('hidenLoading');
          }, err => {
            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr()
          }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        });
      },
      Fabulous(item) { //点赞接口
        // let options = new FormData();
        // options.append('uid','1006');
        // options.append('lid', item.uid);
        // options.append('fid', item.id);//文章id
        // options.append('type', item.classify);//文章类型
        // options.append('token', '6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15');
        // this.$store.dispatch('Fabulous', options)
        //   .then(data => {
        //     this.dataList=this.dataList.map(obj=>{
        //       if(item.id==obj.id&&item.classify==obj.classify){
        //         obj.iszan=data.data.flag;
        //         if(item.iszan==1){
        //           obj.histort_reward_count = Number(obj.histort_reward_count)+1
        //         }else{
        //           obj.histort_reward_count = Number(obj.histort_reward_count)-1
        //         }
        //         return obj;
        //       }
        //       return obj;
        //     })
        //     // this.mescroll.resetUpScroll()
        //   })
      },


    }
  }
</script>

<style scoped lang="less">
  @r: 30rem;


  .isPc{
    width:700px;
    overflow: hidden;
    left:300px;
  }
  /*通过fixed固定mescroll的高度*/
  .mescroll {
    position: absolute;
    top: 0;
    bottom: 96/@r;
    height: auto;
    overflow-y: scroll;
    box-sizing: border-box;
    background-color: #fff;
  }

  .app {
    background-color: #fff;
  }

  .list {
    background-color: #fff;
  }

  .list li {
    padding: 26/@r 32/@r;
    border-bottom: 20/@r solid #eee;
  }

  .list .title {
    height: 88/@r;
    position:relative;
  }

  .title .left {
    float: left;
    width: 88/@r;
    height: 88/@r;
    background-image: url("../../../assets/img/headerIcon.png");
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
  }

  .title .left img {
    width: 100%;
  }

  .center {
    float: left;
    color: #939393;
    margin-left: 20/@r;
    line-height: 34/@r;
    font-size: 24/@r;
  }

  .center h2 {
    font-size: 32/@r;
    color: #333333;
    line-height: 44/@r;
    margin-bottom: 4/@r;
  }

  .brief {
    margin-top: 16/@r;
  }

  .brief span {
    float: left;
    padding: 0 15/@r;
    border: 1px solid #ddd;
    border-radius: 10/@r;
    text-align: center;
    line-heihgt: 40/@r;
    margin-right: 20/@r;
    color: #666666;
  }

  .brief span:last-child {
    margin: 0;
  }

  .Img {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .Img video {
    width: 100%;
    height: 400/@r;
    display: block;
    border-radius: 3px !important;
    margin-bottom: 20/@r;
  }

  .border {
    border-bottom: 1px solid #dddddd;
    margin-top: 30/@r;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
  }

  .bottom div:nth-child(2) {
    margin-left: -36/@r;
  }

  .icon-zan {
    position: absolute;
    left: -55/@r;
    top: -2/@r;
    font-size: 60/@r;
    color: #878787;
  }

  .icon-pinglun {
    display: inline-block;
    vertical-align: bottom;
    font-size: 40/@r;
  }

  .icon-yuedu {
    display: inline-block;
    vertical-align: bottom;
    font-size: 40/@r;
  }

  .bottom .color {
    color:#FF8200;
  }

  .bottom div {
    line-height: 88/@r;
    color: #666666;
    position: relative;
  }

  .topTitle {
    font-size: 36/@r;
    color: #000;
    padding:10/@r 0;
    line-height: 48/@r;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .noneData {
    width: 100%;
    padding-top:10%;
    text-align: center;
    line-height: 200/@r;
    background-color: #fff;
  }
  #noneData{
    border:none;
  }

  .Grade{
    position:absolute;
    left:50/@r;
    top:60/@r;
    width:32/@r;
  }
  .Grade .GradeFirst{
    width:100%;
  }
  .Grade .GradeTwo{
    width:90%;
  }
  .list .GradeColor{
    color:#FF8200;
  }

  .pointStart {
    width: 220/@r;
    height: 220/@r;
    overflow: hidden;
  }
  .pointStart i {
    display: block;
    width: 100%;
    height: 100%;
    background: url(../../../assets/img/pointStart.png) no-repeat;
    background-size: 2000% 100%;
    animation: moveHande .65s forwards 1 steps(19);
  }
  @keyframes moveHande {
    form {
      background-position-x: left;
    }
    to {
      background-position-x: right;
    }
  }
</style>

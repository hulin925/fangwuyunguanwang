<template>
  <div class="app">
    <!--mescroll滚动区域的基本结构-->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit"  :class="this.$isMobile()?'':'isPc'">
      <LawyerSpecialNav></LawyerSpecialNav>
      <div>
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
              <!--<div class="right" @click.stop="follow(item.uid)">-->
              <!--<span v-if="item.isguanzhu==0">+ 关注</span>-->
              <!--<span v-else>取消关注</span>-->
              <!--</div>-->
            </div>
            <!--<div class="brief clearfix">-->
            <!--<span>刑事</span>-->
            <!--<span>治安</span>-->
            <!--</div>-->
            <div class="topTitle">{{item.title}}</div>

            <div v-if="item.classify==2">
              <div class="content" @click.stop="JumpDetails(item)">
                <div v-html="item.content"></div>
              </div>
              <div class="Img clearfix" :style="{width: item.num==4?'90%':'100%'}">
                <div class="ImgIcon" v-for="itemImg,index in item.arr" v-if="item.num>1&&item.num!=4">
                  <div>
                    <img v-lazy="itemImg" alt="">
                  </div>
                </div>

                <div class="ImgIcon" v-for="everyImg,index in item.arr" v-if="item.num==4">
                  <div>
                    <img v-lazy="everyImg" alt="">
                  </div>
                </div>

                <div class="firstImg" v-else-if="item.num==1">
                  <div>
                    <img v-lazy="item.arr[0]" alt="">
                  </div>
                </div>

              </div>
            </div>
            <div v-if="item.classify==6" :style="{width:item.AndroidNum==4?'80%':'100%'}">

              <div class="content" @click.stop="JumpDetails(item)">
                <div>{{item.content}}</div>
              </div>

              <div class="clearfix" v-if="item.AndroidNum>1&&item.AndroidNum!=4">
                <div class="ImgIcon" v-for="v,index in item.thumbnail">
                  <div>
                    <img v-lazy="v" alt="">
                  </div>
                </div>
              </div>

              <div class="clearfix" v-if="item.AndroidNum==4">
                <div class="ImgIcon" v-for="v,index in item.thumbnail">
                  <div>
                    <img v-lazy="v" alt="">
                  </div>
                </div>
              </div>

              <div class="clearfix" v-else-if="item.AndroidNum==1">
                <div class="firstImg">
                  <div>
                    <img v-lazy="item.thumbnail[0]" alt="">
                  </div>
                </div>
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
      </div>
      <!--内容...-->

      <div class="noneData"  v-if="noneData" >
        <img src="../../../assets/img/follow.png" alt="">
        <p>暂无发布相关文章！</p>
      </div>

      <div class="noData" v-if="noData">
        <p>亲,没有更多数据了~</p>
      </div>

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
  import LawyerSpecialNav from './LawyerSpecialNav.vue'

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
        noData:false,
        showStart: false,
        noneData: false,
        ImgPass: {},//ios图片传递
        lid: '',//律师Id
        mescroll: null, // mescroll实例对象
        mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          //以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 5 //每页数据条数,默认10
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
          noMoreSize: 2, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
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
      // window.FabulousPassViewpoint = this.FabulousPassViewpoint;//点赞

    },
    created() {
      this.lid=JSON.parse(sessionStorage.getItem('LawyerId'));
      // this.lid = JSON.parse(sessionStorage.getItem('specialInfo')).lid;
    },
    methods: {
      GetQueryString(name) { //截取?后想要的数据 lawyerId
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      JumpDetails(obj) {//跳转律师详情页
        sessionStorage.setItem('detailsId',JSON.stringify(obj));

        if(this.$isMobile()){
          this.$router.push({name: 'LawyerFindArticleDetail', query: {obj}});
        }else{
          let routeData = this.$router.resolve({
            path: "/LawyerFindArticleDetail"
          });
          window.open(routeData.href, '_blank');
        }
      },
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback(page, mescroll) {
        this.initData(page, mescroll);
      },
      initData(page, mescroll) {//初始数据
        let options = new FormData();
        options.append('lid', this.lid);//1068
        options.append('flag', 'article');
        options.append('page', page.num);
        options.append('uid', this.GetQueryString('uid'));
        this.$store.dispatch('LawyerViewPointArticle', options)
          .then(data => {
            console.log(data)
            // page.size=data.list.length;//获取每页条数
            if(page.num==1){
              if (data.list.length) { //判定数据是否存在,显示关注按钮
                this.noneData = false;
              } else {
                this.noneData = true;
              }
            }
            if (data.list.length) { //判定数据是否存在,显示关注按钮
              this.noData = false;
            } else {
              this.noData = true;
            }

            var weburl = data.list[0].weburl;
            // 请求的列表数据
            let arr = data.list;
            // 如果是第一页需手动制空列表
            if (page.num === 1) this.dataList = [];
            // 请求的列表数据
            // 把请求到的数据添加到列表
            this.dataList = this.dataList.concat(arr);

            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length)
            })
            data.list.forEach((v) => {

              v.faces = v.weburl + v.face;//拼接头像
              if (!v.thumbnail) {
                v.thumbnail = []
              }
              if (v.classify == 6 && v.thumbnail.length) {
                if (v.thumbnail instanceof Array) {
                  let arr = v.thumbnail;
                  arr = arr.map(v => {
                    return weburl + v;
                  })
                  v.thumbnail = arr;
                } else {
                  let arr = JSON.parse(v.thumbnail);
                  arr = arr.map(v => {
                    return weburl + v;
                  })
                  v.thumbnail = arr;
                }
                v.AndroidNum=v.thumbnail.length;
              }
              //图片截取
              var imgReg = /<img.*?(?:>|\/>)/gi;
              var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
              if (v.content) {//截取长文章里的图片
                let str = v.content;
                v.content = str.replace(imgReg, '');
                let arr = str.match(imgReg);
                if (arr && arr.length) {
                  arr = arr.map(item => {
                    let n = item.indexOf('"');
                    let m = item.lastIndexOf('"');
                    item = item.substring(n + 1, m);
                    return item.split(' ')[0].split('"')[0];
                  });

                  //截取大于6张的图片
                  if (arr.length > 5) {
                    arr = arr.slice(0, 6)
                  } else {
                    arr;
                  }

                  v.num = arr.length;
                  v.arr = arr;
                }
              }

              if (v.content) {//处理文字折叠
                v.content = v.content.replace(/<(?!img).*?>/g, "");
              }
            });

            // this.$store.commit('hidenLoading')
          }, err => {
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
        //           this.showStart=true;
        //           // this.$store.commit('showZan');
        //           // setTimeout(()=>{
        //           //   this.$store.commit('hidenZan');
        //           // },1000)
        //           obj.histort_reward_count = Number(obj.histort_reward_count)+1
        //         }else{
        //           obj.histort_reward_count = Number(obj.histort_reward_count)-1
        //         }
        //       }
        //       return obj;
        //     })
        //     // this.initData({
        //     //   num: this.page
        //     // }, this.mescroll)
        //     // this.mescroll.resetUpScroll
        //   })
      },


    },
  }
</script>

<style scoped lang="less">
  @r: 30rem;

  .isPc{
    overflow: hidden;
  }
  .isPc .ImgIcon{
    width:160px;
    height:160px;
    padding:10px;
  }
  .isPc .Img{
    width:60%;
  }
  .isPc .firstImg{
    width:60%;
    /*height:200px;*/
  }

  .noData{
    line-height:100/@r;
    text-align:center;
    color:#555;
  }
  /*通过fixed固定mescroll的高度*/
  .mescroll {
    /*position: fixed;*/
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
    padding: 26/@r 32/@r 0;
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

  .title .right {
    float: right;
    margin-top: 10/@r;
  }

  .title .right span {
    display: block;
    border: 1px solid #0AC1B2;
    border-radius: 10/@r;
    font-size: 28/@r;
    color: #0AC1B2;
    text-align: center;
    letter-spacing: 4/@r;
    padding: 4/@r 16/@r;
  }

  .brief {
    margin-top: 16/@r;
  }

  .brief span {
    float: left;
    padding: 0 15/@r;
    border: 1px solid #DDDDDD;
    border-radius: 10/@r;
    text-align: center;
    line-heihgt: 40/@r;
    margin-right: 20/@r;
    color: #666666;
  }

  .brief span:last-child {
    margin: 0;
  }

  .content {
    font-size: 32/@r !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    line-height: 48/@r;
    color: #333;
  }

  .content div {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
  }

  .Img {
    margin-top: 16/@r;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .ImgIcon {
    float: left;
    width: 228/@r;
    height: 228/@r;
    padding: 5/@r;
  }

  .ImgIcon > div {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .ImgIcon img {
    position: absolute;
    min-width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /*.ImgIcon:nth-of-type(3n) {*/
  /*margin-right: 0;*/
  /*}*/

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

  .firstImg {
    width: 100%;
    height: 400/@r;
    margin-top: 16/@r;
    z-index: 2;
  }

  .firstImg > div {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .firstImg img {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .topTitle {
    font-size: 36/@r;
    color: #000;
    line-height: 48/@r;
    padding: 16/@r 0 6/@r;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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

  .noneData {
    width: 100%;
    padding-top: 10%;
    text-align: center;
    line-height: 200/@r;
    background-color: #fff;
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
    -webkit-animation:moveHande .65s forwards 1 steps(19);
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

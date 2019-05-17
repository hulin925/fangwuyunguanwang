<template>
  <div>
    <mescroll-vue :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <section>
        <ul class="list">
          <li>
            <div class="title clearfix">

              <div class="left" @click.stop="PersonalTopics(data)">
                <img :src="lidImg" alt="">
              </div>

              <div class="Grade">
                <img src="../../../assets/img/lanV.png" alt="" v-if="data.cert_type!=1" class="GradeFirst">
                <img src="../../../assets/img/level.png" alt="" v-else class="GradeTwo">
              </div>

              <div class="center" @click.stop="PersonalTopics(data)">
                <h2 :class="{GradeColor:data.cert_type != 1}">{{data.username}}</h2>
                <p v-if="data.add_time!=0">{{data.add_time}}</p>
                <p v-else>{{data.company}}</p>
              </div>
              <div class="right" @click.stop="Follows(data)" v-if="isShowFollow!=0">
                <span v-if="data.isguanzhu==0">+ 关注 </span>
                <span v-else>+ 取消关注 </span>
              </div>
            </div>
            <div class="brief clearfix">
              <!--<span>刑事</span>-->
              <!--<span>治安</span>-->
              <i>阅读 {{data.click}}</i>
               <i class="iconfont  icon-yuedu"></i>
            </div>
            <div class="topTitle">{{data.title}}</div>
            <div class="content" v-if="data.classify==2" @click="ImgShow(data.arr)">
              <div v-html="data.content"></div>
            </div>
            <div class="content" v-if="data.classify==3">
              <!--<video width="320" height="240" controls="controls" :poster="data.cover">-->
                <!--<source :src="data.videos" type="video/mp4">-->
              <!--</video>-->

              <div v-if="data.local==0" @click.stop="androidVideo(data.videos)">
                <video
                  width="320" height="240" :poster="data.cover" controls="controls" webkit-playsinline="true"
                  x5-video-player-type="h5" x5-video-player-fullscreen="true"
                >
                  <source :src="data.videos" type="video/mp4">
                </video>
              </div>
              <div v-else-if="data.local==1" @click.stop="androidVideo(data.path)">
                <video
                  width="320" height="240" :poster="data.cover" controls="controls" webkit-playsinline="true"
                  x5-video-player-type="h5"
                >
                  <source :src="data.path" type="video/mp4">
                </video>
              </div>



            </div>
            <div class="content Article" v-if="data.classify==6">
              <div>{{data.content}}</div>
              <div class="clearfix">
                <div class="ImgIcon" v-for="v in data.thumbnail" @click.stop="ImgShow(data.thumbnail)">
                  <img v-lazy="v" alt="">
                </div>
              </div>
              <div class="statement">
                <p>免责声明：本文来自芯汇法务云客户端自媒体，不代表芯汇法务云的观点和立场。</p>
              </div>
              <!--<div class="clearfix" v-else>-->
              <!--<div class="firstImg">-->
              <!--<img :src="item.thumbnail[0]" alt="">-->
              <!--</div>-->
              <!--</div>-->
            </div>
            <div class="bottom">
              <div @click.stop="Forward()">
                <i class="iconfont  icon-zhuanfa"></i>
                <span>转发</span>
                <i></i>
              </div>
              <div @click.stop="Comment(data)">
                <i class="iconfont  icon-pinglun"></i>
                <span>评论</span>
                <i>{{data.history_comment_count}}</i>
              </div>
              <div @click.stop="Fabulous(data)" :class="{color:data.iszan == 1}">
                <span><i class="iconfont  icon-zan" :class="{color:data.iszan == 1}"></i></span>
                <span>点赞</span>
                <i>{{data.histort_reward_count}}</i>
              </div>
            </div>
          </li>
        </ul>
        <ul class="userComment">
          <li class="clearfix" v-for="item,index in dataList" v-if="dataList.length">
            <div class="userHead">
              <img :src="weburl+item.face" alt="">
            </div>
            <div class="userInfo">
              <p>{{item.nickname}}</p>
              <p>{{item.content}}</p>
              <p>{{item.add_time*1000 | getAddTime}}</p>
            </div>
          </li>
          <li class="Product">
            <p>~ 亲 暂无更多评论~</p>
          </li>
        </ul>
      </section>

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
  import {
    PersonalTopics,//律师专题页
    Follows,//关注
    Fabulous,//点赞
    Comment,//评论
    Collection,//收藏
    ImgShow,//图片
    Forward,//转发

  } from '@/assets/public.js'

  export default {
    name: "lawyerFind",
    components: {
      MescrollVue,// 注册mescroll组件
      PopupPicker,//vux
      Group,//vux
      Toast,//vux
    },
    data() {
      return {
        showStart: false,
        isShowFollow: '',//判断是否有关注
        collection: {},//收藏传递数据
        obj: {},//储存ios传递的数据
        userMessage: {},//存uid
        cover: '',
        videos: '',
        weburl: '',
        data: {},//初始数据
        navIndex: 0,
        navList: [],
        id: '',
        type: '',
        lidImg: '',
        uidImg: '',
        list: [],
        mescroll: null, // mescroll实例对象
        mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          //以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 9 //每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
          noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
          // 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          // 这就是为什么无更多数据有时候不显示的原因
          // toTop: {
          //   //回到顶部按钮
          //   src: "../../../static/mes.png", //图片路径,默认null,支持网络图
          //   offset: 1000 //列表滚动1000px才显示回到顶部按钮
          // },
          empty: {
            //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            // warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
            icon: "../../../static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
            tip: "暂无相关数据~" //提示
          }
        },
        dataList: [] // 列表数据
      }
    },
    mounted() {
    },
    created() {
      this.isShowFollow = this.GetQueryString('isShowFollow');//判断是否有关注
      // window.FollowsPass = this.FollowsPass;//关注传递参数的方法名
      // window.FabulousPass = this.FabulousPass;//点赞传递参数的方法名
      window.CommentPass = this.CommentPass;//评论传递参数的方法名
    },
    methods: {
      androidVideo(item){//android处理视频播放
        let obj={};
        obj.videos=item;
        window.AndroidMethod.androidVideo(JSON.stringify(obj));//android 传递参数
      },
      Forward(){//转发传递参数
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          Forward(this.collection);//转发方法
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          window.AndroidMethod.Forward(JSON.stringify(this.collection));//android 传递参数
        }
        // Forward(this.collection)
      },
      ImgShow(arr) {//图片传递参数ios

        // ImgShow(arr);
        this.obj.dataImg=arr;
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          ImgShow(arr);//ios传递参数
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          window.AndroidMethod.ImgShow(JSON.stringify(this.obj));//android 传递参数
        }
      },
      CommentPass(obj) {//评论接口，ios传递数据
        let now = JSON.parse(obj);
        let options = new FormData();
        options.append('uid', now.uid);//1068有评论
        options.append('token', now.token);//6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d
        options.append('type', now.type);
        options.append('toid', now.toid);
        options.append('content', now.content);
        this.$store.dispatch('LawyerFindArticleComment', options)
          .then(data => {
            this.mescroll.resetUpScroll()
          })
      },
      Comment(item) {//评论，ios传递数据
        this.obj.type = item.classify;
        this.obj.toid = item.id;
        // Comment(this.obj);//ios 传递参数
        // window.htmlToAndroid.Comment(JSON.stringify(this.obj));//android 传递参数

        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          Comment(this.obj);//ios 传递参数
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          window.AndroidMethod.Comment(JSON.stringify(this.obj));//android 传递参数
        }
      },
      PersonalTopics(item) {//跳转个人律师专题页
        this.obj.lid = item.uid;

        // PersonalTopics(this.obj);

        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          PersonalTopics(this.obj);//ios 传递参数
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          window.AndroidMethod.PersonalTopics(JSON.stringify(this.obj));//android 传递参数
        }

      },
      GetQueryString(name) { //截取?后想要的数据 lawyerId
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      initFind(page, mescroll) { //获取页面初始数据
        this.$store.commit("showLoading");
        let options = new FormData();
        options.append('id', this.GetQueryString('id'));
        options.append('tag', this.GetQueryString('tag'));
        // options.append('type', this.GetQueryString('type'));
        options.append('classify', this.GetQueryString('classify'));
        options.append('uid', this.GetQueryString('uid'));
        options.append('page', page.num);
        this.$store.dispatch('LawyerFindArticleDetail', options)
          .then(data => {
            console.log(data)
            data.videos = data.weburl + data.path;//拼接后的video
            data.cover = data.weburl + data.thumbnail;//拼接后的封面
            this.weburl = data.weburl;
            this.data = data;//初始数据
            this.lidImg = data.weburl + data.face;//拼接的头像
            this.list = data.list;
            // 如果是第一页需手动制空列表
            if (page.num === 1) this.dataList = [];
            // 把请求到的数据添加到列表
            this.dataList = this.dataList.concat(this.list);
            this.$nextTick(() => {
              mescroll.endSuccess(this.list.length)
            })
            if (data.classify == 6) { //获取app端图片
              let arr = JSON.parse(data.thumbnail);
              arr = arr.map(v => {
                return data.weburl + v
              })
               data.thumbnail = arr;
            }

            //图片截取
            var imgReg = /<img.*?(?:>|\/>)/gi;
            if (data.content) {
              let str = data.content;
              data.contents = str.replace(imgReg, '');
              let arr = data.content.match(imgReg);
              if (arr && arr.length) {
                arr = arr.map(item => {
                  let n = item.indexOf('"');
                  let m = item.lastIndexOf('"');
                  item = item.substring(n + 1, m);
                  return item.split(' ')[0].split('"')[0];
                });
                data.arr = arr;
              }
            }

            this.$store.commit("hidenLoading");

            // 请求的列表数据
            this.collection.classify = data.classify;//收藏数据传递
            this.collection.ArticleId = data.id;//收藏数据传递
            this.collection.iscollection = data.iscollection;//收藏数据传递

            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
              //Ios
              Collection(this.collection);//收藏方法
            } else if (/(Android)/i.test(navigator.userAgent)) {
              //Android终端
              window.AndroidMethod.Collection(JSON.stringify(this.collection));//android 传递参数
            }
          }, err => {
            mescroll.endErr()
          }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
      },
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback(page, mescroll) {
        this.initFind(page, mescroll)
      },
      Follows(item) {//关注接口
        this.obj.lid = item.uid;
        // Follows(this.obj);//ios 传递参数
        // window.htmlToAndroid.Follows(JSON.stringify(this.obj));//android 传递参数

        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          Follows(this.obj);//ios 传递参数

          if (this.GetQueryString('uid') != null) {
            let options = new FormData();
            options.append('uid', this.GetQueryString('uid'));//1006
            options.append('lid', item.uid);//1ba10ba7695a436779076e71af056d4f8fe18ff1  //1069
            options.append('token',this.GetQueryString('token'));//6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15
            this.$store.dispatch('follows', options)
              .then(data => {
                // this.mescroll.resetUpScroll()
                if(item.uid==this.data.uid){
                  this.data.isguanzhu=data.data.flag;
                }
                return this.data
              })
          }

        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          // window.AndroidMethod.Follows(JSON.stringify(this.obj));//android 传递参数
          var abc = window.AndroidMethod.FabulousViewpoint(JSON.stringify(this.obj));
          var now = JSON.parse(abc);
          if (now.login == 1) {
            let options = new FormData();
            options.append('uid', now.uid);//getdetail1006
            options.append('lid', item.uid);//1ba10ba7695a436779076e71af056d4f8fe18ff1  //1069
            options.append('token',now.token);//6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15
            this.$store.dispatch('follows', options)
              .then(data => {
                // this.mescroll.resetUpScroll()
                  if(item.uid==this.data.uid){
                    this.data.isguanzhu=data.data.flag;
                  }
                  return this.data
              })
          }

        }
      },
      // FollowsPass(obj) {//关注接口，ios传递数据改变页面
      //   let now = JSON.parse(obj);
      //   let options = new FormData();
      //   options.append('uid', now.uid);//1006
      //   options.append('lid', now.lid);
      //   options.append('token', now.token);//6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d
      //   this.$store.dispatch('follows', options)
      //     .then(data => {
      //       this.mescroll.resetUpScroll()
      //     })
      // },
      Fabulous(item) { //点赞接口
        this.obj.lid = item.uid;
        this.obj.fid = item.id;
        this.obj.type = item.classify;
        // Fabulous(this.obj);//ios 参数传递
        // window.htmlToAndroid.Fabulous(JSON.stringify(this.obj));//android 点赞

        // let options = new FormData();
        // options.append('uid','1006');
        // options.append('lid', item.uid);
        // options.append('fid', item.id);//文章id
        // options.append('type', item.classify);//文章类型
        // options.append('token', '6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15');
        // this.$store.dispatch('Fabulous', options)
        //   .then(data => {
        //     if (item.id == this.data.id && item.classify == this.data.classify) {
        //       this.data.iszan = data.data.flag;
        //       this.data.histort_reward_count = data.data.zannum;
        //     }
        //     return this.data;
        //     // this.mescroll.resetUpScroll()
        //   })
        // return;

        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          Fabulous(this.obj);//ios 传递参数
          if (this.GetQueryString('uid') != null) {
            let options = new FormData();
            options.append('uid', this.GetQueryString('uid'));
            options.append('lid', item.uid);
            options.append('fid', item.id);//文章id
            options.append('type', item.classify);//文章类型
            options.append('token', this.GetQueryString('token'));
            this.$store.dispatch('Fabulous', options)
              .then(data => {
                if(data.data.flag==1){
                  this.showStart=true;
                }
                if (item.id == this.data.id && item.classify == this.data.classify) {
                  this.data.iszan = data.data.flag;
                  this.data.histort_reward_count = data.data.zannum;
                }
                return this.data;
              })
          }


        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          // window.AndroidMethod.Fabulous(JSON.stringify(this.obj));//android 点赞

          var abc = window.AndroidMethod.FabulousViewpoint(JSON.stringify(this.obj))
          var now = JSON.parse(abc);
          if (now.login == 1) {
            let options = new FormData();
            options.append('uid', now.uid);
            options.append('lid', item.uid);
            options.append('fid', item.id);//文章id
            options.append('type', item.classify);//文章类型
            options.append('token', now.token);
            this.$store.dispatch('Fabulous', options)
              .then(data => {
                if(data.data.flag==1){
                  this.showStart=true;
                }
                  if (item.id == this.data.id && item.classify == this.data.classify) {
                    this.data.iszan = data.data.flag;
                    this.data.histort_reward_count = data.data.zannum;
                  }
                  return this.data;
              })
          }


        }
      },
      // FabulousPass(obj) { //点赞接口,ios传递数据改变页面
      //   let now = JSON.parse(obj);
      //   let options = new FormData();
      //   options.append('uid', now.uid);
      //
      //   options.append('lid', now.lid);
      //   options.append('fid', now.fid);
      //   options.append('type', now.type);
      //   options.append('token', now.token);
      //   this.$store.dispatch('Fabulous', options)
      //     .then(data => {
      //       this.mescroll.resetUpScroll()
      //     })
      // },


    },

  }
</script>

<style scoped lang="less">
  @r: 30rem;

  /*通过fixed固定mescroll的高度*/
  .mescroll {
    position: fixed;
    top: 0;
    bottom: 0;
    height: auto;
  }

  video {
    width: 100%;
    height: 400/@r;
    display: block;
    border-radius: 3px !important;
  }

  .topTitle {
    font-size: 36/@r;
    color: #000;
    line-height: 48/@r;
    padding: 10/@r 0;
  }

  section {
    padding-bottom: 40/@r;
  }

  .list li {
    padding: 32/@r 32/@r 0;
    border-bottom: 1px solid #ddd;
    overflow:hidden;
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
    height: 100%;
  }

  .center {
    float: left;
    color: #939393;
    margin-left: 20/@r;
    line-height: 34/@r;
    font-size:24/@r;
  }

  .center h2 {
    font-size: 32/@r;
    color: #000;
    line-height: 50/@r;
    margin-bottom: 4/@r;
  }

  .title .right {
    float: right;
  }

  .title .right span {
    display: block;
    border: 1px solid #0AC1B2;
    border-radius: 10/@r;
    font-size: 28/@r;
    color: #0AC1B2;
    text-align: center;
    line-height: 50/@r;
    letter-spacing: 4/@r;
    padding: 4/@r 16/@r;
  }

  .brief {
    margin-top: 16/@r;
    color:#878787;
  }
  .brief .icon-yuedu{
    margin-right:12/@r;
    margin-top:-8/@r;
  }

  .brief span {
    float: left;
    padding: 0 15/@r;
    border: 1px solid #ddd;
    border-radius: 10/@r;
    text-align: center;
    line-height: 40/@r;
    margin-right: 20/@r;
    margin-bottom: 20/@r;
    color: #666666;
  }

  .brief span:last-child {
    margin: 0;
  }

  .brief i {
    float: right;
  }

  .content {
    font-size:32/@r;
    color: #333;
  }

  .content div {
    line-height: 40/@r;
  }

  .Img {
    margin-top: 16/@r;
    width: 100%;
    position: relative;
  }

  .Img .ImgIcon {
    float: left;
    width: 31%;
    height: 100px;
    background-color: red;
    margin: 0 20/@r 20/@r 0;
  }

  .border {
    border-bottom: 1px solid #dddddd;
    margin-top: 30/@r;
  }

  .bottom {
    margin-top: 30/@r;
    display: flex;
    justify-content: space-between;
  }

  .bottom div:nth-child(2){
    margin-left:-38/@r;
  }
  .icon-zan{
    position:absolute;
    left:-55/@r;
    top:-2/@r;
    font-size:60/@r;
    color:#878787;
  }
  .icon-zhuanfa{
    font-size:38/@r;
    vertical-align: bottom;
  }
  .icon-pinglun{
    display: inline-block;
    vertical-align: bottom;
    font-size:40/@r;
  }
  .icon-yuedu{
    display: inline-block;
    vertical-align: bottom;
    font-size:40/@r;
  }
  .bottom .color{
    color:#FF8200;
  }
  .bottom div {
    line-height: 88/@r;
    color: #666666;
    position:relative;
  }

  .userComment {
    padding: 0 32/@r;
  }

  .userComment li {
    padding: 30/@r 0;
    border-bottom: 1px solid #eee;
    color: #666;
  }

  .userComment .userHead {
    float: left;
    width: 80/@r;
    height: 80/@r;
    background-image: url("../../../assets/img/headerIcon.png");
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20/@r;
  }

  .userComment .userHead img {
    width: 100%;
    height: 100%;
  }

  .userComment .userInfo {
    float: right;
    width: 85%;
  }

  .userComment .userInfo p {
    line-height: 40/@r;
    padding: 8/@r 0;
  }

  .userComment .userInfo p:nth-child(2) {
    color: #000;
    font-size:32/@r;
  }
  .userComment .userInfo p:nth-child(3) {
    font-size:24/@r;
  }

  .Product {
    text-align: center;
    line-height: 100/@r;
  }

  .Article img {
    margin-bottom: 20/@r;
  }
  .openApp{
    position:fixed;
    bottom:20/@r;
    left:2%;
    background-color:#8c94ff;
    color:#fff;
    width:96%;
    line-height:80/@r;
    font-size:32/@r;
    text-align:center;
    -webkit-border-radius: 30/@r;
    -moz-border-radius: 30/@r;
    border-radius: 30/@r;
  }
  .Grade{
    position:absolute;
    left:46/@r;
    top:54/@r;
    width:34/@r;
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
  .statement{
    padding-top:20/@r;
    font-size:24/@r;
    text-align:center;
    color:#878787;
  }
  .statement p{
    line-height:40/@r;
  }
</style>

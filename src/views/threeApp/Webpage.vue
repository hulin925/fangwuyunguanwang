<template>
  <div id="app">
      <section>
        <ul class="list">
          <li>
            <!--<div class="topTitle">{{data.title}}</div>-->
            <div class="title clearfix">
              <div class="left" @click.stop="PersonalTopics(data)">
                <img :src="lidImg" alt="">
              </div>

              <div class="Grade">
                <img src="../../assets/img/lanV.png" alt="" v-if="data.cert_type!=1" class="GradeFirst">
                <img src="../../assets/img/level.png" alt="" v-else class="GradeTwo">
              </div>

              <div class="center" @click.stop="PersonalTopics(data)">
                <h2 :class="{GradeColor:data.cert_type != 1}">{{data.username}}</h2>
                <p>{{data.add_time}}</p>
              </div>
              <div class="right" @click.stop="download">
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
            <div class="content" v-if="data.classify==2" @click="ImgShow(data.arr)">
              <p v-html="data.content"></p>
            </div>
            <div class="content" v-if="data.classify==3">
              <!--<video width="320" height="240" controls="controls" :poster="cover">-->
                <!--<source :src="videos" type="video/mp4">-->
              <!--</video>-->

              <div v-if="data.local==0">
                <video
                  width="320" height="240" :poster="cover" controls="controls"
                  preload="auto"
                  webkit-playsinline="true"
                  playsinline="true"
                  x-webkit-airplay="allow"
                  x5-video-player-type="h5"
                  x5-video-player-fullscreen="true"
                  x5-video-orientation="portraint"
                >
                  <source :src="data.videos" type="video/mp4">
                </video>
              </div>
              <div v-else-if="data.local==1">
                <video
                  width="320" height="240" :poster="cover" controls="controls"
                  preload="auto"
                  webkit-playsinline="true"
                  playsinline="true"
                  x-webkit-airplay="allow"
                  x5-video-player-type="h5"
                  x5-video-player-fullscreen="true"
                  x5-video-orientation="portraint"
                >
                  <source :src="data.path" type="video/mp4">
                </video>
              </div>


            </div>
            <div class="content Article" v-if="data.classify==6">
              <p>{{data.content}}</p>
              <div class="clearfix">
                <div class="ImgIcon" v-for="v in data.thumbnail" @click.stop="ImgShow(data.thumbnail)">
                  <img v-lazy="v" alt="">
                </div>
              </div>
              <!--<div class="clearfix" v-else>-->
              <!--<div class="firstImg">-->
              <!--<img :src="item.thumbnail[0]" alt="">-->
              <!--</div>-->
              <!--</div>-->
            </div>
            <div class="bottom">
              <div @click.stop="download">
                <i class="iconfont  icon-zhuanfa"></i>
                <span>转发</span>
                <!--<i>154</i>-->
              </div>
              <div @click.stop="download">
                <i class="iconfont  icon-pinglun"></i>
                <span>评论</span>
                <i>{{data.history_comment_count}}</i>
              </div>
              <div @click.stop="download">
                <span><i class="iconfont  icon-zan"></i></span>
                <span>点赞</span>
                <i>{{data.histort_reward_count}}</i>
              </div>
            </div>
          </li>
        </ul>
        <ul class="userComment">
          <li class="clearfix" v-for="item,index in list" v-if="list.length">
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

    <div class="openApp" @click.stop="download">
      <span>打开APP查看更多详情</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
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
      }
    },
    mounted() {
    },
    created() {
      this.$nextTick(()=>{
        this.initFind();
      })
    },
    methods: {
      PersonalTopics(data){//个人律师专题页
        console.log(data);
        window.location.href="https://xhfwy3.sanhedao.com.cn/dist3/?lid="+data.uid+"&isAid=0&isWebpage=1&uid=1#/LawyerSpecial/home";
      },
      GetQueryString(name) { //截取?后想要的数据 lawyerId
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      initFind() { //获取页面初始数据
        let options = new FormData();
        options.append('id', this.GetQueryString('id'));
        options.append('classify', this.GetQueryString('classify'));
        options.append('page', 1);
        this.$store.dispatch('LawyerFindArticleDetail', options)
          .then(data => {
            console.log(data,13)
            this.videos = data.weburl + data.path;//拼接后的video
            this.cover = data.weburl + data.thumbnail;//拼接后的封面
            this.weburl = data.weburl;
            this.data = data;//初始数据
            this.lidImg = data.weburl + data.face;//拼接的头像
            this.list = data.list;
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
                  return item;
                });
                data.arr = arr;
              }
            }
            // this.$store.commit("hidenLoading");
          }, err => {
            // mescroll.endErr()
          }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          // mescroll.endErr()
        })
      },


    },

  }
</script>

<style scoped lang="less">
  @r: 30rem;

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
  }

  .list .title {
    position:relative;
    height: 88/@r;
  }

  .title .left {
    float: left;
    width: 88/@r;
    height: 88/@r;
    background-image: url("../../assets/img/headerIcon.png");
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
  }

  .title .left img {
    width: 100%;
    height: 100%;
  }

  .title .center {
    float: left;
    color: #939393;
    margin-left: 20/@r;
    line-height: 34/@r;
    font-size:24/@r;
  }

  .title .center h2 {
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
    padding: 16/@r 0;
    font-size:32/@r;
  }

  .content p {
    line-height: 40/@r;
    color: #333333;
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
    background-image: url("../../assets/img/headerIcon.png");
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
</style>

<template>
  <div :class="this.$isMobile()?'':'isPc'">
    <div class="noneData" v-if="noneData">
      <img src="../../../assets/img/follow.png" alt>
      <p>暂无关注律师！</p>
    </div>
    <div id="contentWrap" ref="contain" v-else>
      <section id="contain">
        <ul class="list">
          <li v-for="item,index in dataList">
            <div v-if="item.pro">
              <div class="title clearfix">
                <div class="left">
                  <img :src="item.pic[0]" alt>
                </div>
                <div class="center">
                  <h2>{{item.advtitle}}</h2>
                </div>
                <div class="right">
                  <span class="Advertisement">广 告</span>
                </div>
              </div>
              <div class="AdvertisementContent" @click.stop="pictureJump(item)">
                <img :src="item.pic[0]" alt>
              </div>
            </div>
            <div v-else>
              <div class="title clearfix" @click.stop="PersonalTopics(item)">
                <div class="left">
                  <img :src="item.faces" alt>
                </div>

                <div class="Grade">
                  <img
                    src="../../../assets/img/lanV.png"
                    alt
                    v-if="item.cert_type!=1"
                    class="GradeFirst"
                  >
                  <img src="../../../assets/img/level.png" alt v-else class="GradeTwo">
                </div>

                <div class="center">
                  <h2 :class="{GradeColor:item.cert_type != 1}">{{item.username}}</h2>
                  <p v-if="item.add_time!=0">{{item.add_time}}</p>
                  <p v-else>{{item.company}}</p>
                </div>
                <div class="right" @click.stop="download">
                  <span v-if="item.isguanzhu==0">+ 关注</span>
                  <span v-else class="cancelFollow">
                    <i class="iconfont icon-gou"></i>
                    已关注
                  </span>
                </div>
              </div>
              <div class="topTitle" @click.stop="JumpDetail(item)">{{item.title}}</div>
              <!--<div class="brief clearfix">-->
              <!--<span>刑事</span>-->
              <!--<span>治安</span>-->
              <!--</div>-->
              <div v-if="item.classify==2">
                <div class="content" @click.stop="JumpDetail(item)" ref="contentss">
                  <div v-html="item.content"></div>
                </div>
                <div class="Img clearfix" :style="{width:item.num==4?'80%':'100%'}">
                  <div class="ImgIcon" v-for="v,index in item.arr" v-if="item.num>1&&item.num!=4">
                    <div>
                      <img v-lazy="v" alt>
                    </div>
                  </div>

                  <div class="ImgIcon" v-for="v,index in item.arr" v-if="item.num==4">
                    <div>
                      <img v-lazy="v" alt>
                    </div>
                  </div>

                  <div class="firstImg" v-if="item.num==1">
                    <div>
                      <img v-lazy="item.arr[0]" alt>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="item.classify==6">
                <div class="content" @click.stop="JumpDetail(item)">
                  <div v-html="item.content"></div>
                </div>
                <div class="Img clearfix" :style="{width:item.AndroidNumber==4?'80%':'100%'}">
                  <div
                    class="ImgIcon"
                    v-for="v,index in item.thumbnail"
                    v-if="item.AndroidNumber>1&&item.AndroidNumber!=4"
                  >
                    <div>
                      <img v-lazy="v" alt>
                    </div>
                  </div>

                  <div
                    class="ImgIcon"
                    v-for="v,index in item.thumbnail"
                    v-if="item.AndroidNumber==4"
                  >
                    <div>
                      <img v-lazy="v" alt>
                    </div>
                  </div>

                  <div class="firstImg" v-if="item.AndroidNumber==1">
                    <div>
                      <img v-lazy="item.thumbnail[0]" alt>
                    </div>
                  </div>
                </div>
              </div>
              <div class="Img clearfix" v-if="item.classify==3">
                <div v-if="item.local==0" @click.stop="androidVideo(item.videos)">
                  <video width="320" height="240" :poster="item.cover" controls="controls">
                    <source :src="item.videos" type="video/mp4">
                  </video>
                </div>
                <div v-else-if="item.local==1" @click.stop="androidVideo(item.path)">
                  <video width="320" height="240" :poster="item.cover" controls="controls">
                    <source :src="item.path" type="video/mp4">
                  </video>
                </div>
              </div>

              <div class="bottom">
                <div @click.stop="JumpDetail(item)">
                  <i class="iconfont icon-yuedu"></i>
                  <span>阅读</span>
                  <i>{{item.click =''?'0':item.click?item.click:'0'}}</i>
                </div>
                <!--//item.id,item.classify,item.isguanzhu-->
                <div @click.stop="JumpDetail(item)">
                  <i class="iconfont icon-pinglun"></i>
                  <span>评论</span>
                  <i>{{item.history_comment_count}}</i>
                </div>
                <div @click.stop="download" :class="{color:item.iszan == 1}">
                  <span>
                    <i class="iconfont icon-zan" :class="{color:item.iszan == 1}"></i>
                  </span>
                  <span>点赞</span>
                  <i>{{item.histort_reward_count}}</i>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p v-show="isLoading && dataList.length" style="text-align:center">
          <img
            class="d2-home__loading"
            src="https://hly.1000da.com.cn/assets/images/loading-spinner.svg"
            alt="loading"
          >加载中
        </p>
        <p v-show="!isLoading && dataList.length && dataList.length >= total">没有更多数据了...</p>
        <p v-show="!dataList.length">暂无数据...</p>
      </section>
    </div>
    <div class="showStart">
      <toast v-model="showStart" type="text" :time="1000">
        <div class="pointStart">
          <i></i>
        </div>
      </toast>
    </div>
    <!--<oneImg :value="isOff" :data="arrImg" @setShow="isOff=false"></oneImg>-->

    <div class="openApp" @click.stop="download" v-if="this.$isMobile()">
      <span>打开APP查看更多详情</span>
    </div>
    <div class="goTop" v-show="showTop" @click.stop="goTop">
      <svg-icon icon-class="goTop"></svg-icon>
    </div>
  </div>
</template>

<script>
import { PopupPicker, Group, Toast } from "vux";
import { mapGetters } from "vuex";
import svgIcon from "@/components/SvgIcon";
// import oneImg from '@/components/Img.vue'
export default {
  name: "lawyerFind",
  components: {
    svgIcon,
    PopupPicker, //vux
    Group, //vux
    Toast //vux
    // oneImg
  },
  data() {
    return {
      fatiao: "",
      navId: "", //nav
      navType: "", //导航
      AdvertisingData: [], //广告
      showStart: false, //点赞
      ImgPass: {}, //传图片对象
      isOff: false,
      isLoading: false,
      noneData: "",
      lid: "",
      dataList: [],
      showTop: false,
      total: 0,
      page: 1
    };
  },
  computed: mapGetters(["arrImg"]),
  created() {
    this.Advertisement(); //广告接口

    this.initData();
  },
  mounted() {
    var _this = this;
    _this.$nextTick(() => {
      this.$refs.contain.addEventListener("scroll", function() {
        let viewH = this.clientHeight; //可见高度
        let contentH = this.scrollHeight; //内容高度
        let scrollTop = this.scrollTop; //滚动高度
        if (scrollTop > viewH + 100) {
          _this.showTop = true;
        } else {
          _this.showTop = false;
        }
        console.log(scrollTop / (contentH - viewH));
        //if(contentH - viewH - scrollTop <= 100) { //到达底部100px时,加载新内容
        if (scrollTop / (contentH - viewH) >= 0.95) {
          //到达底部100px时,加载新内容
          // 这里加载数据..
          if (!_this.isLoading) {
            _this.$nextTick(() => {
              _this.isLoading = true;
              _this.page++;
              _this.initData().then(
                data => {
                  _this.dataList = _this.dataList.concat(data);
                  _this.isLoading = false;
                },
                err => {
                  console.log(err);
                  _this.isLoading = false;
                }
              );
            });
          }
        }
      });
    });
  },
  methods: {
    //返回顶部
    goTop() {
      this.$refs.contain.scrollTop = 0;
    },
    pictureJump(item) {
      //广告跳转对接
      window.location.href = item.outside_link;
    },
    Advertisement() {
      //广告接口
      let options = new FormData();
      options.append("flag", "find");
      this.$store.dispatch("Advertisement", options).then(data => {
        this.AdvertisingData = data;
      });
    },
    GetQueryString(name) {
      //截取?后想要的数据 lawyerId
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    PersonalTopics(item) {
      //跳转个人律师专题页
      this.$router.push({ name: "LawyerSpecial", query: { lid: item.uid } });
      sessionStorage.setItem("LawyerId", item.uid);
    },
    JumpDetail(obj) {
      //跳转律师详情页
      sessionStorage.setItem("detailsId", JSON.stringify(obj));

      if (this.$isMobile()) {
        this.$router.push({ name: "LawyerFindArticleDetail", query: { obj } });
      } else {
        let routeData = this.$router.resolve({
          path: "/LawyerFindArticleDetail"
        });
        window.open(routeData.href, "_blank");
      }
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    initData() {
      //获取页面初始数据
      return new Promise((relove, reject) => {
        // this.$store.commit("showLoading");
        let options = new FormData();
        options.append("id", "0");
        options.append("tag", "tuijian");
        options.append("page", this.page);
        options.append("uid", this.GetQueryString("uid"));
        this.$store
          .dispatch("LawyerFindRecommend", options)
          .then(
            data => {
              this.total = data.total;
              var data = data.list;
              // this.total =
              if (data == 10001) {
                //判定数据是否存在,显示关注按钮
                this.noneData = true;
              } else {
                this.noneData = false;
              }
              this.$nextTick(() => {
                //视频处理
                var videos = document.getElementsByTagName("video");
                for (var i = videos.length - 1; i >= 0; i--) {
                  (function() {
                    var p = i;
                    videos[p].addEventListener("play", function() {
                      pauseAll(p);
                    });
                  })();
                }

                function pauseAll(index) {
                  for (var j = videos.length - 1; j >= 0; j--) {
                    if (j != index) videos[j].pause();
                  }
                }
              });
              var weburl = data[0].weburl;
              //图片截取
              var imgReg = /<img.*?(?:>|\/>)/gi;
              var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;

              data.forEach(v => {
                if (!v.thumbnail) {
                  v.thumbnail = [];
                }
                //拼接链接图片和视频
                v.faces = v.weburl + v.face;
                if (v.classify == 3) {
                  v.cover = v.weburl + v.thumbnail;
                  v.videos = v.weburl + v.path;
                }
                if (v.classify == 6 && v.thumbnail.length) {
                  if (v.thumbnail instanceof Array) {
                    let arr = v.thumbnail;
                    arr = arr.map(v => {
                      return weburl + v;
                    });
                    v.thumbnail = arr;
                  } else {
                    let arr = JSON.parse(v.thumbnail);
                    arr = arr.map(v => {
                      return weburl + v;
                    });
                    v.thumbnail = arr;
                  }
                  v.AndroidNumber = v.thumbnail.length;
                }
                if (v.classify == 2) {
                  let str = v.content;
                  v.content = str.replace(imgReg, "");
                  let arr = str.match(imgReg);
                  if (arr && arr.length) {
                    arr = arr.map(item => {
                      let n = item.indexOf('"');
                      let m = item.lastIndexOf('"');
                      item = item.substring(n + 1, m);
                      return item.split(" ")[0].split('"')[0];
                    });
                    //截取大于6张的图片
                    if (arr.length > 5) {
                      arr = arr.slice(0, 6);
                    } else {
                      arr;
                    }
                    v.arr = arr;
                    v.num = arr.length;
                  }

                  if (v.content) {
                    v.content = v.content.replace(/<(?!img).*?>/g, "");
                    // v.content=v.content.replace(/<[^<]+?>/g);
                  }
                }
              });
              this.dataList = data;
              relove(data);

              // this.$store.commit("hidenLoading");
              //广告处理
              // this.$nextTick(()=>{
              let randomData = Math.floor(10 * Math.random());
              for (let i = 0; i < this.AdvertisingData.length; i++) {
                if (page.num == i + 1) {
                  let AdvertisingData = this.AdvertisingData[i];
                  if (page.num == 1 && randomData + i * 9 == 0) {
                    this.dataList.splice(
                      randomData + i * 9 + 1,
                      0,
                      AdvertisingData
                    );
                  } else {
                    this.dataList.splice(
                      randomData + i * 9,
                      0,
                      AdvertisingData
                    );
                  }
                }
              }
            },
            err => {
              reject(err);
            }
          )
          .catch(e => {});
      });
    },
    Fabulous(item) {
      //点赞接口
      let options = new FormData();
      options.append("uid", "1006");
      options.append("lid", item.uid);
      options.append("fid", item.id); //文章id
      options.append("type", item.classify); //文章类型
      options.append(
        "token",
        "6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15"
      );
      this.$store.dispatch("Fabulous", options).then(data => {
        console.log(data);
        if (data.data.flag == 1) {
          this.showStart = true;
        }
        this.dataList = this.dataList.map(obj => {
          if (obj.id == item.id) {
            obj.iszan = data.data.flag;
            obj.histort_reward_count = data.data.zannum;
          }
          return obj;
        });
      });
    },
    Follows(item) {
      //关注接口
      let options = new FormData();
      options.append("uid", 1006); //1006
      options.append("lid", item.uid); //1ba10ba7695a436779076e71af056d4f8fe18ff1  //1069
      options.append(
        "token",
        "6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15"
      ); //6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15
      this.$store.dispatch("follows", options).then(data => {
        console.log(data);
        // this.mescroll.resetUpScroll()
        this.dataList = this.dataList.map(obj => {
          if (item.uid == obj.uid) {
            obj.isguanzhu = data.data.flag;
            return obj;
          }
          return obj;
        });
      });
    }
  }
};
</script>

<style scoped lang="less" type="text/less">
@r: 30rem;
#contentWrap {
  position: fixed;
  top: 169px;
  left: 0;
  bottom: 0;
  overflow: auto;
  width: 100%;
}
#contain {
  height: 100%;
  width: 700px;
  margin: 0 auto;
}
.d2-home__loading {
  height: 22px;
  width: 22px;
  margin-bottom: 10px;
  -webkit-animation: run 1s linear 0s infinite;
}
section > .goTop {
  position: fixed;
  bottom: 60px;
  right: 60px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

section > .goTop > svg {
  display: block;
  width: 100%;
  height: 100%;
  color: #fff;
}

.isPc {
  width: 700px;
  /*overflow: hidden;*/
  margin-left: 300px;
}

.isPc .ImgIcon {
  width: 160px;
  height: 160px;
  padding: 10px;
}

.isPc .Img {
  width: 60%;
}

.isPc .firstImg {
  width: 60%;
  /*height:200px;*/
}

.icon-gou {
  font-size: 20 / @r;
  color: #000;
}

.topTitle {
  font-size: 36 / @r;
  color: #000;
  line-height: 48 / @r;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 12 / @r 0 6 / @r;
}

.list li {
  padding: 32 / @r 32 / @r 0;
  border-bottom: 20 / @r solid #eee;
}

.list .title {
  height: 88 / @r;
  position: relative;
}

.title .left {
  float: left;
  width: 80 / @r;
  height: 80 / @r;
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
  margin-left: 20 / @r;
  line-height: 34 / @r;
  font-size: 24 / @r;
}

.center h2 {
  font-size: 30 / @r;
  color: #000;
  height: 44 / @r;
  line-height: 44 / @r;
  margin-bottom: 4 / @r;
}

.title .right {
  float: right;
}

.title .right span {
  display: block;
  border: 1px solid #ff8200;
  border-radius: 10 / @r;
  font-size: 28 / @r;
  color: #ff8200;
  text-align: center;
  line-height: 50 / @r;
  letter-spacing: 4 / @r;
  padding: 4 / @r 16 / @r;
}

.title .right .cancelFollow {
  border: 1px solid #b0b0b0;
  color: #b0b0b0;
}

.title .right .Advertisement {
  border: 1px solid #0ac1b2;
  color: #0ac1b2;
}

.brief {
  margin-top: 16 / @r;
}

.brief span {
  float: left;
  padding: 0 15 / @r;
  border: 1px solid #dddddd;
  border-radius: 10 / @r;
  text-align: center;
  line-heihgt: 40 / @r;
  margin-right: 20 / @r;
  color: #666666;
}

.brief span:last-child {
  margin: 0;
}

.content {
  font-size: 32 / @r !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  line-height: 48 / @r;
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
  margin: 16 / @r 0;
  width: 100%;
  height: 100%;
  position: relative;
}

.Img video {
  width: 100%;
  height: 400 / @r;
  display: block;
  border-radius: 3px !important;
  margin-bottom: 20 / @r;
}

.ImgIcon {
  float: left;
  /*width: 31%;*/
  width: 228 / @r;
  height: 228 / @r;
  padding: 5 / @r;
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

.bottom {
  border-top: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
}

.bottom div:nth-child(2) {
  margin-left: -36 / @r;
}

.icon-zan {
  position: absolute;
  left: -55 / @r;
  top: -2 / @r;
  font-size: 60 / @r;
  color: #878787;
}

.icon-pinglun {
  display: inline-block;
  vertical-align: bottom;
  font-size: 40 / @r;
}

.icon-yuedu {
  display: inline-block;
  vertical-align: bottom;
  font-size: 40 / @r;
}

.bottom div {
  line-height: 72 / @r;
  color: #666;
  position: relative;
}

.bottom .color {
  /*color: #db5f5f;*/
  color: #ff8200;
}

.firstImg {
  width: 100%;
  height: 400 / @r;
  position: relative;
  overflow: hidden;
  margin-bottom: 20 / @r;
}

.firstImg img {
  display: block;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.noneData {
  width: 100%;
  text-align: center;
  margin-top: 40%;
  line-height: 200 / @r;
}

.noneData img {
  /*width:100%;*/
}

.Grade {
  position: absolute;
  left: 44 / @r;
  top: 50 / @r;
  width: 32 / @r;
}

.Grade .GradeFirst {
  width: 100%;
}

.Grade .GradeTwo {
  width: 90%;
}

.list .GradeColor {
  color: #ff8200;
}

.pointStart {
  width: 220 / @r;
  height: 220 / @r;
  overflow: hidden;
}

.pointStart i {
  display: block;
  width: 100%;
  height: 100%;
  background: url(../../../assets/img/pointStart.png) no-repeat;
  background-size: 2000% 100%;
  animation: moveHande 0.65s forwards 1 steps(19);
}

@keyframes moveHande {
  form {
    background-position-x: left;
  }
  to {
    background-position-x: right;
  }
}

.AdvertisementContent {
  margin: 20 / @r 0;
  position: relative;
  width: 100%;
  height: 400 / @r;
  overflow: hidden;
}

.AdvertisementContent img {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.openApp {
  position: fixed;
  z-index: 99999;
  bottom: 20 / @r;
  left: 2%;
  background-color: #8c94ff;
  color: #fff;
  width: 96%;
  line-height: 80 / @r;
  font-size: 32 / @r;
  text-align: center;
  -webkit-border-radius: 30 / @r;
  -moz-border-radius: 30 / @r;
  border-radius: 30 / @r;
}
</style>

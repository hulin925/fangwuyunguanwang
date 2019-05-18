<template>
  <div>
    <nav>
      <div class="totalWidth clearfix" ref="totalWidth">
        <div v-for="item,index in navType" class="navList" :class="{active:item.isId==navId}"
             @click.stop="changeNav(item,index)">
          <span>{{item.name}}</span>
        </div>
      </div>
    </nav>

    <div v-if="fatiao!='fatiao'">
      <mescroll-vue :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">

        <div class="noneData" v-if="noneData">
          <img src="../../../assets/img/follow.png" alt="">
          <p>暂无关注律师！</p>
        </div>

        <section v-else>
          <ul class="list">
            <li v-for="item,index in dataList">
              <div v-if="item.pro">
                <div class="title clearfix">
                  <div class="left">
                    <img :src="item.pic[0]" alt="">
                  </div>
                  <div class="center">
                    <h2>{{item.advtitle}}</h2>
                  </div>
                  <div class="right">
                    <span class="Advertisement">广 告</span>
                  </div>
                </div>
                <div class="AdvertisementContent" @click.stop="pictureJump(item)">
                  <img :src="item.pic[0]" alt="">
                </div>
              </div>
              <div v-else>
                <div class="title clearfix" @click.stop="PersonalTopics(item)">
                  <div class="left">
                    <img :src="item.faces" alt="">
                  </div>

                  <div class="Grade">
                    <img src="../../../assets/img/lanV.png" alt="" v-if="item.cert_type!=1" class="GradeFirst">
                    <img src="../../../assets/img/level.png" alt="" v-else class="GradeTwo">
                  </div>

                  <div class="center">
                    <h2 :class="{GradeColor:item.cert_type != 1}">{{item.username}}</h2>
                    <p v-if="item.add_time!=0">{{item.add_time}}</p>
                    <p v-else>{{item.company}}</p>
                  </div>
                  <div class="right" @click.stop="Follows(item)" v-if="fans!='fans'">
                    <span v-if="item.isguanzhu==0">+ 关注</span>
                    <span v-else class="cancelFollow">
                    <i class="iconfont  icon-gou"></i>
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

                    <div class="ImgIcon" v-for="v,index in item.arr" v-if="item.num>1&&item.num!=4"
                         @click.stop="ImgShow(item.arr,index)">
                      <div>
                        <img v-lazy="v" alt="">
                      </div>
                    </div>

                    <div class="ImgIcon" v-for="v,index in item.arr" v-if="item.num==4"
                         @click.stop="ImgShow(item.arr,index)">
                      <div>
                        <img v-lazy="v" alt="">
                      </div>
                    </div>

                    <div class="firstImg" v-if="item.num==1" @click.stop="ImgShow(new Array(item.arr[0]),index)">
                      <div>
                        <img v-lazy="item.arr[0]" alt="">
                      </div>
                    </div>

                  </div>
                </div>

                <div v-if="item.classify==6">
                  <div class="content" @click.stop="JumpDetail(item)">
                    <div v-html="item.content"></div>
                  </div>
                  <div class="Img clearfix" :style="{width:item.AndroidNumber==4?'80%':'100%'}">

                    <div class="ImgIcon" v-for="v,index in item.thumbnail"
                         v-if="item.AndroidNumber>1&&item.AndroidNumber!=4"
                         @click.stop="ImgShow(item.thumbnail,index)">
                      <div>
                        <img v-lazy="v" alt="">
                      </div>
                    </div>

                    <div class="ImgIcon" v-for="v,index in item.thumbnail" v-if="item.AndroidNumber==4"
                         @click.stop="ImgShow(item.thumbnail,index)">
                      <div>
                        <img v-lazy="v" alt="">
                      </div>
                    </div>

                    <div class="firstImg" v-if="item.AndroidNumber==1"
                         @click.stop="ImgShow(new Array(item.thumbnail[0]),index)">
                      <div>
                        <img v-lazy="item.thumbnail[0]" alt="">
                      </div>
                    </div>

                  </div>
                </div>
                <div class="Img clearfix" v-if="item.classify==3">
                  <div v-if="item.local==0" @click.stop="androidVideo(item.videos)">
                    <video
                      width="320" height="240" :poster="item.cover" controls="controls"
                    >
                      <source :src="item.videos" type="video/mp4">
                    </video>
                  </div>
                  <div v-else-if="item.local==1" @click.stop="androidVideo(item.path)">
                    <video
                      width="320" height="240" :poster="item.cover" controls="controls"
                    >
                      <source :src="item.path" type="video/mp4">
                    </video>
                  </div>

                </div>

                <div class="bottom">
                  <div @click.stop="JumpDetail(item)">
                    <i class="iconfont  icon-yuedu"></i>
                    <span>阅读</span>
                    <i>{{item.click =''?'0':item.click?item.click:'0'}}</i>
                  </div>
                  <!--//item.id,item.classify,item.isguanzhu-->
                  <div @click.stop="JumpDetail(item)">
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
              </div>
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
      <!--<oneImg :value="isOff" :data="arrImg" @setShow="isOff=false"></oneImg>-->
    </div>

    <div v-else>
      <LawyerFindFatiao></LawyerFindFatiao>
    </div>

  </div>
</template>

<script>
  import LawyerFindFatiao from './LawyerFindFatiao.vue'//法条组件
  import {PopupPicker, Group, Toast} from 'vux'
  import {mapGetters} from "vuex"
  import MescrollVue from 'mescroll.js/mescroll.vue'
  // import oneImg from '@/components/Img.vue'
  import {
    ArticleDetail,//跳转文章详情
    PersonalTopics,//跳转律师专题页
    Follows,//关注
    Fabulous,//点赞
    ImgShow,//图片处理
    pictureUrl,//图片链接跳转
  } from '@/assets/public.js'

  export default {
    name: "lawyerFind",
    components: {
      MescrollVue, // 注册mescroll组件
      PopupPicker,//vux
      Group,//vux
      Toast,//vux
      LawyerFindFatiao,//法条
      // oneImg
    },
    data() {
      return {
        fatiao: '',
        judgeId: '',
        navTag: 'tuijian',//跳转页面
        navId: '',//nav
        navType: '',//导航
        AdvertisingData: [],//广告
        showStart: false,//点赞
        ImgPass: {},//传图片对象
        isOff: false,
        fans: '',//获取关注标识
        noneData: '',
        lid: '',
        dataList: [],
        mescroll: null, // mescroll实例对象
        mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
          //以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 9//每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
          noMoreSize: 1, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          // toTop: {
          //   //回到顶部按钮
          //   src: "../../static/mes.png", //图片路径,默认null,支持网络图
          //   offset: 1000 //列表滚动1000px才显示回到顶部按钮
          // },
          empty: {
            //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示L
            // warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
            icon: "../../static/mescroll/mescroll-empty.png", //图标,默认null,支持网络L图
            tip: "暂无相关数据~" //提示
          }
        },
      }
    },
    computed: mapGetters([
      'arrImg'
    ]),
    created() {
      this.Advertisement();//广告接口
      this.getType();//获取分类
      this.$nextTick(() => {
        this.fans = this.GetQueryString('tag');
      });
    },
    mounted() {
      // window.FollowsPass = this.FollowsPass;//关注
      window.pictureUrl = this.pictureUrl;//图片跳转链接
    },
    methods: {
      changeNav(item, index) {//nav跳转
        this.navId = index;
        this.navTag = item.tag;
        this.judgeId = item.id;
        this.fatiao = item.tag;
      },
      getType() {//获取分类
        let options = new FormData();
        // options.append('uid','1006');
        // options.append('token','6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15');
        this.$store.dispatch('getType', options)
          .then(data => {
            for (let i = 0; i < data.length; i++) {
              data[i].isId = i;
            }
            this.navType = data;
          })
      },
      pictureJump(item) {//广告跳转对接
        window.location.href = item.outside_link;
      },
      Advertisement() {//广告接口
        let options = new FormData();
        options.append('flag', 'find');
        this.$store.dispatch('Advertisement', options)
          .then(data => {
            this.AdvertisingData = data;
          })
      },
      androidVideo(item) {//android处理视频播放
        let obj = {};
        obj.videos = item;
        window.AndroidMethod.androidVideo(JSON.stringify(obj));//android 传递参数
      },
      ImgShow(arr, index) {//图片放大处理
        this.ImgPass.dataImg = arr;
        this.ImgPass.index = index;
        // ImgShow(this.ImgPass);//ios传递参数

        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          ImgShow(this.ImgPass);//ios传递参数
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          window.AndroidMethod.ImgShow(JSON.stringify(this.ImgPass));//android 传递参数
        }
      },
      GetQueryString(name) { //截取?后想要的数据 lawyerId
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      PersonalTopics(item) {//跳转个人律师专题页
        this.$router.push({name: 'LawyerSpecial', query: {lid: item.uid}});
      },
      JumpDetail(obj) { //跳转律师详情页
        this.$router.push({name: 'LawyerFindArticleDetail', query: {obj}});
      },
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      initData(page, mescroll) { //获取页面初始数据
        // this.$store.commit("showLoading");
        let options = new FormData();
        options.append('id', this.judgeId);
        options.append('tag', this.navTag);
        options.append('page', page.num);
        options.append('uid', this.GetQueryString('uid'));
        this.$store.dispatch('LawyerFindRecommend', options)
          .then(data => {
            this.$nextTick(() => {
              //nav
              var totalWidth = this.$refs.totalWidth;
              var lists = totalWidth.children;
              var w = 0;
              for (let i = 0; i < lists.length; i++) {
                w += lists[i].getBoundingClientRect().width;
              }
              totalWidth.style.width = w + 'rem';
              let scrolls = new BScroll('nav', {
                startX: 0,
                click: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: 'vertical'
              });
            });

            if (data == 10001) { //判定数据是否存在,显示关注按钮
              this.noneData = true;
            } else {
              this.noneData = false;
            }
            // 请求的列表数据
            let arr = data;
            // 如果是第一页需手动制空列表
            if (page.num === 1) this.dataList = [];
            // 把请求到的数据添加到列表
            if (arr == 10001) {
              arr = [];
            }
            arr = arr.map(item => {
              item.page = page.num
              return item
            })
            this.dataList = this.dataList.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length);

              //视频处理
              var videos = document.getElementsByTagName('video');
              for (var i = videos.length - 1; i >= 0; i--) {
                (function () {
                  var p = i;
                  videos[p].addEventListener('play', function () {
                    pauseAll(p);
                  })
                })()
              }

              function pauseAll(index) {
                for (var j = videos.length - 1; j >= 0; j--) {
                  if (j != index) videos[j].pause();
                }
              }

            })

            var weburl = data[0].weburl;
            //图片截取
            var imgReg = /<img.*?(?:>|\/>)/gi;
            var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
            data.forEach(v => {
              if (!v.thumbnail) {
                v.thumbnail = []
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
                  })
                  v.thumbnail = arr;
                } else {
                  let arr = JSON.parse(v.thumbnail);
                  arr = arr.map(v => {
                    return weburl + v;
                  })
                  v.thumbnail = arr;
                }
                v.AndroidNumber = v.thumbnail.length;
              }
              if (v.classify == 2) {
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
                  v.arr = arr;
                  v.num = arr.length;
                }

                if (v.content) {
                  v.content = v.content.replace(/<(?!img).*?>/g, "");
                  // v.content=v.content.replace(/<[^<]+?>/g);
                }
              }
            })
            // this.$store.commit("hidenLoading");
            //广告处理
            // this.$nextTick(()=>{
            let randomData = Math.floor(10 * Math.random());
            for (let i = 0; i < this.AdvertisingData.length; i++) {
              if (page.num == i + 1) {
                let AdvertisingData = this.AdvertisingData[i];
                if (page.num == 1 && randomData + (i * 9) == 0) {
                  this.dataList.splice(randomData + (i * 9) + 1, 0, AdvertisingData)
                } else {
                  this.dataList.splice(randomData + (i * 9), 0, AdvertisingData)
                }
              }
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
        this.initData(page, mescroll)
      },
      Fabulous(item) { //点赞接口
        let options = new FormData();
        options.append('uid', '1006');
        options.append('lid', item.uid);
        options.append('fid', item.id);//文章id
        options.append('type', item.classify);//文章类型
        options.append('token', '6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15');
        this.$store.dispatch('Fabulous', options)
          .then(data => {
            console.log(data)
            if (data.data.flag == 1) {
              this.showStart = true;
            }
            this.dataList = this.dataList.map(obj => {
              if (obj.id == item.id) {
                obj.iszan = data.data.flag
                obj.histort_reward_count = data.data.zannum;
              }
              return obj
            })
          })
      },
      Follows(item) { //关注接口
        let options = new FormData();
        options.append('uid', 1006);//1006
        options.append('lid', item.uid);//1ba10ba7695a436779076e71af056d4f8fe18ff1  //1069
        options.append('token', '6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15');//6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15
        this.$store.dispatch('follows', options)
          .then(data => {
            console.log(data)
            // this.mescroll.resetUpScroll()
            this.dataList = this.dataList.map(obj => {
              if (item.uid == obj.uid) {
                obj.isguanzhu = data.data.flag;
                return obj;
              }
              return obj;
            })
          })
      },


    },
  }
</script>

<style scoped lang="less" type="text/less">
  @r: 30rem;

  nav {
    width: 100%;
    height: 82/@r;
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999999;
    border-bottom: 1px solid #ccc;
  }

  .totalWidth .navList {
    font-size: 34/@r;
    text-align: center;
    float: left;
    width: 140/@r;
    line-height: 80/@r;
    height: 80/@r;
    position: relative;
  }

  .navList.active:before {
    position: absolute;
    bottom: 0;
    left: 50%;
    content: '';
    width: 50/@r;
    height: 6/@r;
    background-color: #e60012;
    -webkit-border-radius: 3/@r;
    -moz-border-radius: 3/@r;
    border-radius: 3/@r;
    transform: translateX(-50%);
  }

  nav div.active {
    font-size: 28/@r;
    color: #e60012;
    font-weight: bold;
  }

  .icon-gou {
    font-size: 20/@r;
    color: #000;
  }

  /*通过fixed固定mescroll的高度*/
  .mescroll {
    position: fixed;
    top: 82/@r;
    bottom: 0;
    height: auto;
    background-color: #fff;
  }

  .topTitle {
    font-size: 36/@r;
    color: #000;
    line-height: 48/@r;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 12/@r 0 6/@r;
  }

  .list li {
    padding: 32/@r 32/@r 0;
    border-bottom: 20/@r solid #eee;
  }

  .list .title {
    height: 88/@r;
    position: relative;
  }

  .title .left {
    float: left;
    width: 80/@r;
    height: 80/@r;
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
    font-size: 24/@r;
  }

  .center h2 {
    font-size: 30/@r;
    color: #000;
    height: 44/@r;
    line-height: 44/@r;
    margin-bottom: 4/@r;
  }

  .title .right {
    float: right;
  }

  .title .right span {
    display: block;
    border: 1px solid #FF8200;
    border-radius: 10/@r;
    font-size: 28/@r;
    color: #FF8200;
    text-align: center;
    line-height: 50/@r;
    letter-spacing: 4/@r;
    padding: 4/@r 16/@r;
  }

  .title .right .cancelFollow {
    border: 1px solid #b0b0b0;
    color: #b0b0b0;
  }

  .title .right .Advertisement {
    border: 1px solid #0AC1B2;
    color: #0AC1B2;
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
    margin: 16/@r 0;
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

  .ImgIcon {
    float: left;
    /*width: 31%;*/
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

  .bottom {
    border-top: 1px solid #e9e9e9;
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

  .bottom div {
    line-height: 72/@r;
    color: #666;
    position: relative;
  }

  .bottom .color {
    /*color: #db5f5f;*/
    color: #FF8200;
  }

  .firstImg {
    width: 100%;
    height: 400/@r;
    position: relative;
    overflow: hidden;
    margin-bottom: 20/@r;
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
    line-height: 200/@r;
  }

  .noneData img {
    /*width:100%;*/
  }

  .Grade {
    position: absolute;
    left: 44/@r;
    top: 50/@r;
    width: 32/@r;
  }

  .Grade .GradeFirst {
    width: 100%;
  }

  .Grade .GradeTwo {
    width: 90%;
  }

  .list .GradeColor {
    color: #FF8200;
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

  .AdvertisementContent {
    margin: 20/@r 0;
    position: relative;
    width: 100%;
    height: 400/@r;
    overflow: hidden;
  }

  .AdvertisementContent img {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

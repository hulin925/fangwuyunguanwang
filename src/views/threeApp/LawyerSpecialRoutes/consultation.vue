<template>
  <div>
    <LawyerSpecialNav></LawyerSpecialNav>
    <div class="wrap"  :class="this.$isMobile()?'':'isPc'">

      <dl>
        <dt>请选择咨询类型</dt>
        <dd v-for="item,index in industry" @click.stop="changeShow(item,index)">
          <i :class="{active:nowActive==index}"></i>
          <span>{{item.industry}}</span>
        </dd>
      </dl>
      <div class="foot">
        <span>注：图文咨询价格 <i>￥{{data.price}}次</i></span>
        <!--<span v-else>注：<i>免费咨询！</i></span>-->
      </div>
    </div>

    <div class="footerButton">
      <div @click.stop="follow(data.uid)">
        <span v-if="followObj.isguanzhu==0">+ 关注</span>
        <span v-else>取消关注</span>
      </div>
      <div @click.stop="Consultation()">
        <span>立即咨询</span>
      </div>

    </div>

  </div>
</template>

<script>
  import LawyerSpecialNav from './LawyerSpecialNav.vue'//引入子组件
  import {Consultation,FollowsV} from '@/assets/public.js'//引入方法ios
  import {mapGetters} from 'vuex';
  export default {
    name: "consultation",
    components:{//引入组件
      LawyerSpecialNav,
    },
    data() {
      return {
        isAssistance:'',//判断是否是援助
        iosObj:{},//存储ios传递参数
        lid: '',//律师id
        data: {},
        nowActive: 0,
        price: '',//价格
        industry: [],//类型
      }
    },
    computed:mapGetters([//关注数据
      'followObj'
    ]),
    mounted(){
      window.FollowsPassV=this.FollowsPassV;
    },
    created() {
      this.lid = JSON.parse(sessionStorage.getItem('LawyerId'));
      this.$nextTick(() => {
        this.initData();
      })
    },
    methods: {
      GetQueryString(name) { //截取?后想要的数据 lawyerId
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      Consultation(){//咨询
        this.iosObj.price=this.price;
        this.iosObj.industry=this.industry[this.nowActive].industry;
        this.iosObj.gid=this.industry[this.nowActive].id;
        this.iosObj.lid=this.lid;
        this.iosObj.type=0;

        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          Consultation(this.iosObj);//ios 传递参数
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          window.AndroidMethod.Consultation(JSON.stringify(this.iosObj));//android 传递参数
        }
      },
      changeShow(item, index) {
        this.nowActive = index;
      },
      initData() {//初始数据
        // this.$store.commit('showLoading');
        let options = new FormData();
        options.append('lid', this.lid);
        options.append('page', '1');
        options.append('uid', this.GetQueryString('uid'));//1006
        this.$store.dispatch('LawyerSpecial', options)
          .then(data => {
            console.log(data)
            this.price = data.price;
            this.industry = data.industry;
            this.data = data;
            // this.$store.commit('hidenLoading');
          });
      },
      follow(lid){//关注接口
        this.iosObj.lid=lid;

        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          FollowsV(this.iosObj);//ios传递参数

          if (this.GetQueryString('uid') != null) {
            let options = new FormData();
            options.append('uid', this.GetQueryString('uid'));//1006
            options.append('lid', this.GetQueryString('lid'));//1ba10ba7695a436779076e71af056d4f8fe18ff1  //1069
            options.append('token',this.GetQueryString('token'));//6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15
            this.$store.dispatch('follows', options)
              .then(data => {
                this.initData()
              })
          }

        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          // window.AndroidMethod.FollowsV();//android 判断是否登录

          var abc = window.AndroidMethod.FabulousViewpoint(JSON.stringify(this.obj));
          var now = JSON.parse(abc);
          if (now.login == 1) {
            let options = new FormData();
            options.append('uid', now.uid);//1006
            options.append('lid', lid);//1ba10ba7695a436779076e71af056d4f8fe18ff1  //1069
            options.append('token',now.token);//6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15
            this.$store.dispatch('follows', options)
              .then(data => {
                this.initData()
              })
          }
        }
      }


    }
  }
</script>

<style scoped lang="less">
  @r: 30rem;

  header {
    padding-top: 88/@r;
    height: 460/@r;
    background-image: url("../../../assets/img/bgIcon.png");
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
  }

  .goBack {
    position: absolute;
    left: 16/@r;
    top: 0;
    padding: 20/@r;
  }

  .goBack img {
    width: 48/@r;
    height: 48/@r;
  }

  .headerIcon {
    width: 128/@r;
    height: 128/@r;
    border-radius: 50%;
    background-image: url("../../../assets/img/headerIcon.png");
    background-size: cover;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .headerIcon img {
    width: 100%;
  }

  .headerIcon .level {
    position: absolute;
    width: 32/@r;
    height: 32/@r;
    bottom: 0;
    right: 20/@r;
  }

  header h2 {
    font-size: 36/@r;
    line-height: 60/@r;
  }

  .nav {
    margin-top: 32/@r;
    display: flex;
  }

  .nav div {
    width: 25%;
    line-height: 40/@r;
    position: relative;
  }

  .nav div:before {
    position: absolute;
    height: 48/@r;
    width: 1px;
    background-color: #333333;
    content: '';
    top: 20%;
    right: 0;
  }

  .nav div:last-child:before {
    width: 0;
  }

  .nav div p {
    font-size: 24/@r;
  }

  nav {
    display: flex;
    justify-content: space-around;
    line-height: 88/@r;
    color: #333333;
    font-size: 32/@r;
  }

  nav div {
    position: relative;
  }

  nav div.active:before {
    position: absolute;
    content: '';
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 56/@r;
    height: 6/@r;
    background-color: #F8DF51;
  }

  nav div.active {
    color: #000;
    font-weight: bold;
  }

  section {
    background-color: #fff;
    padding-bottom: 120/@r;
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


  .wrap {
    padding: 26/@r 32/@r;
    background-color: #fff;

  }

  dl dt {
    border-bottom: 1px solid #ddd;
    padding-bottom: 30/@r;
  }

  dl dd {
    line-height: 92/@r;
    border-bottom: 1px solid #ddd;
    position: relative;
    font-size: 32/@r;
    font-weight: bold;
  }

  dl dd i {
    position: absolute;
    top: 32/@r;
    left: 20/@r;
    display: inline-block;
    width: 32/@r;
    height: 32/@r;
    border-radius: 50%;
    border: 1px solid #ddd;
  }

  dl dd i.active {
    background-image: url("../../../assets/img/selection.png");
    background-size: cover;
    border: none;
  }

  dl dd span {
    margin-left: 70/@r;
  }

  .foot {
    line-height: 100/@r;
  }

  .foot i {
    color: #FF0000;
  }

  .footerButton {
    position: fixed;
    left: 0;
    bottom: 0;
    line-height: 96/@r;
    text-align: center;
    color: #fff;
    background: linear-gradient(243deg, rgba(248, 223, 81, 1) 0%, rgba(255, 200, 57, 1) 100%);
    display: flex;
    font-size: 36/@r;
    width: 100%;
    z-index: 999999;
  }

  .footerButton div {
    width: 50%;
    position: relative;
  }

  .footerButton div:nth-child(1):before {
    position: absolute;
    content: '';
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 48/@r;
    background-color: #fff;
  }


</style>

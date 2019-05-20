<template>
  <div>
    <LawyerSpecialNav></LawyerSpecialNav>
    <div class="app">
      <group>
        <popup-picker
          v-if="!switch6"
          title="合同类型"
          placeholder="请选择"
          :data="popupData"
          :columns="1"
          :show-name="true"
          v-model="value6"
        ></popup-picker>
      </group>
      <div class="content">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          maxlength="200"
          placeholder="您可以简单的描述您的文书服务要求。"
          v-model="content"
        ></textarea>
        <div class="computeFont">
          <span><i>{{content.length}}</i>/200</span>
        </div>
      </div>
      <div class="border"></div>
      <h1>注：图文咨询价格 <span>￥{{data.price}}/单</span></h1>

      <!--定制说明-->
      <div class="Explain">
        <h2>定制说明</h2>
        <div class="explain" v-html="data.detail">
        </div>
      </div>
      <div class="footerButton">
        <div @click.stop="follow(dataList.uid)">
          <span v-if="followObj.isguanzhu==0">+ 关注</span>
          <span v-else>取消关注</span>
        </div>
        <div @click="Consultation()">
          <span>立即咨询</span>
        </div>
      </div>

    </div>

    <toast v-model="showErr" type='cancel' :text='errCon'></toast>

  </div>
</template>

<script>
  import {PopupPicker, Group,Toast} from 'vux'
  import LawyerSpecialNav from './LawyerSpecialNav.vue'//引入组件
  import {ConsultationService} from '@/assets/public.js'//引入传给ios端的方法
  import {mapGetters} from 'vuex'

  export default {
    name: "service",
    components: {
      PopupPicker,//vux
      Group,//vux
      Toast,//vux
      LawyerSpecialNav,//引入子组件
    },
    data() {
      return {
        price:'',
        iosObj:{},
        errCon:'',//弹出内容
        showErr:false,//提示框状态
        content:'',
        lid:'',//律师初始id
        switch6: false,
        value6: [],
        dataList: {},//关注
        data: {},//初始数据
        popupData: [],//合同类型
        showToast: true
      }
    },
    computed:mapGetters([
      'followObj'
    ]),
    mounted() {
      this.dataList;
    },
    created() {
      this.lid = JSON.parse(sessionStorage.getItem('LawyerId'));
      this.initDataService();
      this.LawyerServiceContract()
        .then(data => {
          this.popupData = data.map((item) => {
            item.value = item.id + '';
            return item
          })
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
        if(!this.value6.length){
          this.showErr=true;
          this.errCon="请选择合同类型"
        }else if(this.content==''){
          this.showErr=true;
          this.errCon="请填写内容"
        }else{
          let obj = this.popupData.filter(item=>{
            if(item.value==this.value6[0]){
              return true
            }else{
              return false
            }
          })[0];
          this.iosObj.gid=obj.id;
          this.iosObj.name=obj.name;
          this.iosObj.price=this.price;
          this.iosObj.content=this.content;
          this.iosObj.lid=this.lid;
          this.iosObj.type=1;

          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            //Ios
            ConsultationService(this.iosObj);//ios传递参数
          } else if (/(Android)/i.test(navigator.userAgent)) {
            //Android终端
            window.AndroidMethod.ConsultationService(JSON.stringify(this.iosObj));//android 传递参数
          }

        }
      },
      LawyerServiceContract() {//获取合同类型
        return this.$store.dispatch('LawyerServiceContract')
      },
      initDataService() {//获取定制说明
        this.$store.dispatch('LawyerService')
          .then((data) => {
            this.data = data;
            this.price=data.price;
          }, err => {

          })
      },
      initData() {//初始数据
        let options = new FormData();
        options.append('lid', this.lid);
        options.append('page', '1');
        options.append('uid', this.GetQueryString('uid'));
        this.$store.dispatch('LawyerSpecial', options)
          .then(data => {
            this.dataList = data;
            console.log(this.dataList)
          });
      },
      // FollowsPassV(obj) {//关注接口，ios传递数据改变页面
      //   let now=JSON.parse(obj);
      //   let options = new FormData();
      //   options.append('uid', now.uid);//1006
      //   options.append('lid', now.lid);
      //   options.append('token',now.token);//6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d
      //   this.$store.dispatch('follows', options)
      //     .then(data => {
      //       this.initData();
      //     })
      // },
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

  /*.aaa{*/
    /*background-image: url("https://img.t.sinajs.cn/t6/skin/public/like/p_0000_pc.png?version=201904291605");*/
    /*animation: stepsV1 .65s forwards 1 steps(19);*/
    /*width:100px;*/
    /*height:100px;*/
  /*}*/
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


  .app {
    padding: 26/@r 32/@r;
    margin-top: -53/@r;
  }

  .app group {
    border-top: none;
  }

  .content {
    margin-top: 20/@r;
    position: relative;
  }

  textarea {
    width: 100%;
    height: 300/@r;
    outline: none;
    border: none;
  }

  .computeFont {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .computeFont i {
    color: red;
  }

  .border {
    margin-top: 40/@r;
    border-bottom: 1px solid #ddd;
  }

  h1 {
    line-height: 100/@r;
  }

  h1 span {
    color: red;
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

  .Explain h2 {
    font-size: 40/@r;
    margin-bottom: 20/@r;
    color: #000;
  }
</style>

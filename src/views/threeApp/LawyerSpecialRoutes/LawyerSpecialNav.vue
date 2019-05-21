<template>
  <div>
    <header>
      <div class="goBack" @click="specialBack()">
        <img src="../../../assets/img/goback.png" alt="">
      </div>
      <div class="headerIcon">
        <img :src="WrapData.faces" alt="">
      </div>

      <div class="Grade">
        <img src="../../../assets/img/lanV.png" alt="" v-if="WrapData.cert_type!=1" class="GradeFirst">
        <img src="../../../assets/img/level.png" alt="" v-else class="GradeTwo">
      </div>

      <h2>
        {{followObj.username}}
        <i class="iconfont  icon-nan" v-if="followObj.sex==0"></i>
        <i class="iconfont  icon-nv" v-else-if="followObj.sex==1"></i>
      </h2>
      <h3>认证：{{followObj.company}}</h3>
      <div class="nav">
        <div>
          <h1>{{getTowPoint(followObj.star)}}</h1>
          <p>星级</p>
        </div>
        <div>
          <h1>{{followObj.history_order_count}}</h1>
          <p>接单数</p>
        </div>
        <div>
          <h1>{{followObj.click_num}}</h1>
          <p>获赞数</p>
        </div>
        <div @click.stop="myFans()">
          <h1>{{followObj.history_fansh_count}}</h1>
          <p>粉丝</p>
        </div>
      </div>
    </header>

    <nav>
      <div v-for="item,index in WrapNavList" @click="navSwitch(item,index)" :class="{active:item.active}">
        <span>{{item.title}}</span>
      </div>
    </nav>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "LawyerSpecialNav",
		props:{
			value:Boolean
		},
    data(){
      return{
        lid:'',
        WrapData: {},//初始数据
        WrapSpecialInfo: {},//律师信息储存
      }
    },
    computed:mapGetters([
      'WrapNavList',//把数据从getters拿过来
			'followObj'
    ]),
    created(){
      this.lid=JSON.parse(sessionStorage.getItem('LawyerId'));

      // this.lid = JSON.parse(sessionStorage.getItem('specialInfo')).lid;
      for (let i = 0; i < this.WrapNavList.length; i++) {
        if (this.WrapNavList[i].routerName == this.$route.name) {
          this.$store.commit('setLawyerNav', i);
        }
      }
      this.WrapInitData();
    },
    mounted(){

    },
    methods:{
      myFans(){//我的粉丝
        this.$router.push({name:'myFans'})
      },
      specialBack(){//返回键
        this.$router.push({name:'LawyerFindRecommend'});
      },
      GetQueryString(name) { //截取?后想要的数据 lawyerId
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      navSwitch(item, index) {//导航切换
        // this.WrapNavIndex = index;
        this.$store.commit('setLawyerNav',index);
        this.$router.push({
          name: item.routerName
        });
      },
      WrapInitData() {//初始数据
        // this.$store.commit("showLoading");
        let options = new FormData();
        options.append('lid', this.lid);
        options.append('page', 1);
        options.append('uid', this.GetQueryString('uid'));
        this.$store.dispatch('LawyerSpecial', options)
          .then(data => {
            data.faces = data.weburl + data.face;
            this.WrapSpecialInfo.lid = data.uid;
            this.WrapData = data;
            // this.$store.commit('hidenLoading');
          })
      },
      getTowPoint(val) { //截取保留小数点后两位
        if (val) {
          val = val + '';
          let arr = val.split('.');
          if (!arr.length) {
            return '0.00'
          }
          if (arr.length == 1) {
            return arr[0] + '.00';
          } else {
            if (arr[1].length > 1) {
              return arr[0] + '.' + arr[1].substring(0, 2);
            } else {
              return arr[0] + '.' + arr[1] + '0';
            }
          }
        } else {
          return '0.00'
        }
      }
    },
  }
</script>

<style scoped lang="less">
  @r: 30rem;
  //导航定位
  .app {
    color: #333;
    background-color: #fff;
  }
  header {
    padding-top: 88/@r;
    height: 460/@r;
    background-image: url("../../../assets/img/bgIcon.png");
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
		z-index: 1000;
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
    overflow:hidden;
  }
  .headerIcon img{
    width:100%;
    height:100%;
  }
  .level {
    position: absolute;
    width: 32/@r;
    height: 32/@r;
    left: 400/@r;
    top: 185/@r;
  }
  header h2 {
    font-size: 36/@r;
    line-height: 60/@r;
    height:60/@r;
    margin-top:10/@r;
    padding-left:48/@r;
  }
  header h3 {
    line-height: 44/@r;
    height:44/@r;
  }
  .nav {
    margin-top: 20/@r;
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
		width:100%;
    line-height: 88/@r;
    color: #333333;
    font-size: 32/@r;
		background-color: #fff;
		border-bottom:1px solid #ccc;
		box-sizing: border-box;
    -webkit-overflow-scroll:touch;
    -webkit-overflow-scrolling : touch;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    display: flex;
    justify-content: space-around;
  }
  nav div {
		text-align: center;
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
  .Grade{
    position:absolute;
    left:390/@r;
    top:180/@r;
    width:40/@r;
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

  .icon-nan{
    color:#5ab3ff;
  }
  .icon-nv{
    color:#ff77fd;
  }
</style>

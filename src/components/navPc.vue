<template>
  <div class="app">
    <div class="headerWrap">
      <div class="top">
        <div class="wrap">
          <span>开发者平台</span>
          <span>品牌介绍</span>
          <span>侵权投诉</span>
          <span>代理合作</span>
        </div>
      </div>
      <div class="wrap">
        <div class="header clearfix">
          <div class="headerLeft">
            <img src="https://web.3fgj.com/imgVue/fawuyunLogo.ico" alt="">
            <h1>芯汇法务云</h1>
          </div>
          <div class="headerRight">
            <div class="download">
              <span>下载APP</span>
            </div>
            <div class="singIn">
              <span class="beforeNone">登录</span>
            </div>
          </div>
        </div>
        <div class="nav">
          <div v-for="item,index in navList" @click="changeShow(index)" :class="{active:item.isId==indexData}">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>


    <LawyerFindRecommendPc></LawyerFindRecommendPc>

  </div>
</template>

<script>
  import LawyerFindRecommendPc from '../views/threeApp/stylePc/LawyerFindRecommendPc.vue'

  export default {
    name: "navPc",
    data() {
      return {
        navList: [],
        indexData: 1,
      }
    },
    components: {
      LawyerFindRecommendPc
    },
    created() {
      this.getType();
    },
    methods: {
      getType() {//获取分类
        let options = new FormData();
        this.$store.dispatch('getType', options)
          .then(data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
              data[i].isId = i;
            }
            this.navList = data;
          })
      },
      changeShow(index) {
        this.indexData = index;
      }

    }

  }
</script>

<style scoped>

  .wrap {
    width: 1080px;
    margin: 0 auto;
  }

  .headerWrap {
    border-bottom: 1px solid #dfdfdf;
  }

  .top {
    text-align: right;
    height: 36px;
    border-bottom: 1px solid #dfdfdf;
    color: #999;
  }

  .top span {
    display: inline-block;
    line-height: 36px;
    padding: 0 10px;
    font-size: 14px;
    position: relative;
  }

  .top span:hover {
    color: #d3d3d3;
    cursor: pointer;
  }

  .top span:before {
    position: absolute;
    content: '';
    height: 15px;
    border-right: 1px solid #ccc;
    right: -3px;
    top: 10px;
  }

  .top span:last-child:before {
    border: 0;
  }

  .header {
    padding: 20px 0;
  }

  .headerLeft {
    float: left;
  }

  .headerLeft img {
    width: 40px;
    vertical-align: bottom;
  }

  h1 {
    display: inline-block;
    font-size: 28px;
    font-family: 'KaiTi';
    font-weight: bold;
  }

  .headerRight {
    float: right;
    display: flex;
  }

  .headerRight span {
    color: #da3838;
    padding: 3px 20px;
    line-height: 44px;
    font-size: 16px;
    position: relative;
  }

  .headerRight span:before {
    position: absolute;
    content: '';
    height: 15px;
    border-right: 1px solid #ccc;
    right: 0;
    top: 8px;
  }

  .headerRight div:first-child {
    margin-right: 30px;
  }

  .headerRight .beforeNone:before {
    border: 0;
  }

  .singIn span {
    border: 1px solid #da3838;
    border-radius: 4px;
  }

  .singIn span:hover {
    background-color: #da3838;
    color: #fff;
    cursor: pointer;
  }

  .download span:hover {
    color: #f18787;
    cursor: pointer;
  }

  .nav {
    display: flex;
    justify-content: space-around;
  }

  .nav div {
    padding: 10px 15px;
    position: relative;
  }

  .active {
    color: #da3838;
  }

  .nav div.active:before {
    position: absolute;
    content: '';
    height: 3px;
    width: 100%;
    background-color: #da3838;
    left: 0;
    bottom: 0;
    border-radius: 3px;
  }

  .nav div:hover {
    cursor: pointer;
    color: #da3838;
  }

  .nav span {
    font-size: 18px;
  }
</style>

<template>
<section class="main">
    <section class="main-1">
        <div class="handphone"><img src="../../../assets/img/handphone.png" /></div>
        <div class="main-1-block">
            <h1 class="block-1-tit"><span>芯汇法务云</span> <span>您身边的法律专家</span></h1>
            <p class="block-1-content">大咖云集 万家律所</p>
            <div class="down">
              <div class="btns">
                  <div class="ios" @click.stop="$downloadIos"><img src="../../../assets/img/apple.png" /></div>
                  <div class="android" @click.stop="$downloadAndroid"><img src="../../../assets/img/android.png" /></div>
              </div>
              <div class="QR">
                <div class="yhd"><qrcode class="qrcode" :value="android" :options="{ size:120,padding:2 }"></qrcode><p>法务云用户端</p></div>
                <div class="lsd"><qrcode class="qrcode" :value="fwylsd" :options="{ size:120,padding:2 }"></qrcode><p>法务云律师端</p></div>
              </div>
            </div>
            <div class="block-bottom">
                <div class="block-item">
                    <div class="block-item-title">权威</div>
                    <div class="block-item-content">律师大咖</div>
                </div>
                <div class="block-item">
                    <div class="block-item-title">全面</div>
                    <div class="block-item-content">法条检索全</div>
                </div>
                <div class="block-item">
                    <div class="block-item-title">快捷</div>
                    <div class="block-item-content">一对一服务</div>
                </div>
            </div>
        </div>
    </section>
    <section class="main-2">
        <div class="main-2-block">
            <h2>高效解答</h2>
            <h3>专业律师，秒速为你答疑</h3>
        </div>
    </section>
    <section class="main-3">
        <div class="main-3-block">
            <h2>金牌律师</h2>
            <h3>由你指定，一对一深度咨询</h3>
        </div>
        <div class="main-3-content">
            <img src="../../../assets/img/2.png">
        </div>
    </section>
    <section class="main-4">
        <div class="main-4-block">
            <h2>为你发声</h2>
            <h3>占据主动，律师函快速代发</h3>
        </div>
        <div class="main-4-content">
            <img src="../../../assets/img/3.png">
        </div>
    </section>
    <section class="main-5">
        <div class="main-5-block">
            <h2>法律培训</h2>
            <h3>执法懂法，法律风险提前规避</h3>
        </div>
        <div class="main-5-content">
            <img src="../../../assets/img/4.png">
        </div>
    </section>
</section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      android: "http://www.xhfwy.com/static/xhfwy.apk",
      fwylsd: "http://www.xhfwy.com/static/fwylsd.apk",
      ios:
        "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1367112695&mt=8"
    };
  },
  components: {},
  mounted() {
    axios.get("/static/config.json").then(res => {
      this.android = res.data.xhfwy;
      this.ios = res.data.ios;
      this.fwylsd = res.data.fwylsd;
    });
  }
};
</script>

<style scoped lang="less" type="text/less">

  @r:30rem;

  .main{
    position:relative;
    top:82/@r;
  }

* {
  padding: 0;
  margin: 0;
}
.main-1{
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background: url("../../../assets/img/1.jpg") no-repeat;
  overflow: hidden;
}

.main-1-block {
  flex: 1;
  margin-top: 70px;
  margin-left: 10px;
  text-align: left;
}

.block-1-tit {
  font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB",
    "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  font-size: 60/@r;
  font-weight: normal;
  color: #fff;
  white-space: nowrap;
}

.block-1-content {
  font-size: 40/@r;
  margin-top: 40/@r;
  color: #fff;
  white-space: nowrap;
}

.btns {
  margin-left: 10px;
  margin-top: 4rem;
}

.ios,
.android {
  width: 100%;
}

.btns img {
  width: 400/@r;
  margin: 1rem 0;
  cursor: pointer;
}

.down {
  display: flex;
  align-items: center;
}
.QR {
  margin-top: 4rem;
  display: flex;
}
.yhd,
.lsd {
  flex: 1;
}
.QR p {
  text-align: center;
  margin-left: 3rem;
  color: #fff;
  font-size: 1.2rem;
  line-height: 2rem;
}
.QR .qrcode {
  margin-left: 3rem;
}

.block-bottom {
  display: flex;
  flex-direction: row;
  margin-top: 100/@r;
}

.block-item {
  margin-right: 5rem;
  text-align: center;
  white-space: nowrap;
}

.block-item-title {
  font-size: 32/@r;
  color: #fff;
}

.block-item-content {
  margin-top: 30/@r;
  color: #fff;
}

.handphone {
  margin-left: 10vw;
  align-self: flex-end;
  text-align: right;
  margin-bottom: -7px;
}

.handphone img {
  width: 32rem;
}

.main-2 {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url("../../../assets/img/downloadphone.png") no-repeat;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  text-align:center;
}

.main-2-block {
  position: absolute;
  top: 15%;
  left: 50%;
  margin-left: -8.8rem;
}

.main-2-block h2 {
  font-size: 60/@r;
  font-weight: bold;
  color: #333;
  padding: 5px 0;
}

.main-2-block h3 {
  font-size: 40/@r;
  color: #666;
  padding: 5px 0;
}

.main-3 {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-3-block {
  flex-grow: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-3-block h2 {
  font-size: 60/@r;
  font-weight: bold;
  color: #333;
  padding: 5px 0;
}

.main-3-block h3 {
  font-size: 40/@r;
  color: #666;
  padding: 5px 0;
}

.main-3-content {
  flex-grow: 1;
  width: 32rem;
  margin: auto;
}

.main-3-content img {
  width: 100%;
}

.main-4 {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f2f2f2;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-4-block {
  flex-grow: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-4-block h2 {
  font-size: 60/@r;
  font-weight: bold;
  color: #333;
  padding: 5px 0;
}

.main-4-block h3 {
  font-size: 40/@r;
  color: #666;
  padding: 5px 0;
}

.main-4-content {
  flex-grow: 1;
  width: 28rem;
  margin: auto;
}

.main-4-content img {
  width: 100%;
}

.main-5 {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-5-block {
  flex-grow: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-5-block h2 {
  font-size: 60/@r;
  font-weight: bold;
  color: #333;
  padding: 5px 0;
}

.main-5-block h3 {
  font-size: 40/@r;
  color: #666;
  padding: 5px 0;
}

.main-5-content {
  flex-grow: 1;
  width: 32rem;
  margin: auto;
}

.main-5-content img {
  width: 100%;
}

@media (max-width: 480px) {
  .handphone,
  .main-3-content,
  .main-4-content,
  .main-5-content,
  .QR {
    display: none;
  }
  .ios,
  .android {
    text-align: center;
  }
  .main-2 {
    background: #f2f2f2;
    align-items: center;
    display: flex;
  }
  .main-2-block {
    position: static;
    margin: auto;
    align-self: center;
  }
  .block-1-tit {
    /* text-align: center; */
  }
  .block-1-tit span {
    display: block;
    text-align: center;
  }
  .block-1-content {
    text-align: center;
  }
  .btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
  .block-item {
    margin: auto;
  }
}

@media (min-width: 481px) and (max-width: 800px) {
  .handphone,
  .main-3-content,
  .main-4-content,
  .main-5-content,
  .QR {
    display: none;
  }
  .ios,
  .android {
    text-align: center;
  }
  .main-2 {
    background: #f2f2f2;
    align-items: center;
    display: flex;
  }
  .main-2-block {
    position: static;
    margin: auto;
    align-self: center;
  }
  .block-1-tit {
    /* text-align: center; */
  }
  .block-1-tit span {
    display: block;
    text-align: center;
  }
  .block-1-content {
    text-align: center;
  }
  .btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
  .block-item {
    margin: auto;
  }
}

@media (min-width: 801px) and (max-width: 1200px) {
  .handphone {
    margin-left: 0;
  }
  .handphone img {
    width: 35rem;
  }
}
@media (min-width: 1201px) {
}
</style>

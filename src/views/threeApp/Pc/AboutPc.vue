<template>
<section class="main">
    <section class="main-1">
        <div class="cloud1"><img src="../../../assets/img/cloud1.png"></div>
        <div class="cloud2"><img src="../../../assets/img/cloud2.png"></div>
        <div class="main-1-block">
            <div class="main-1-content">
                <h3 class="block-1-title">关于芯汇法务云</h3>
                <ul class="block-1-content">
                    <li><i><img src="../../../assets/img/fast.png"></i><span>快速响应 一对一服务 专业律师 秒速解答</span></li>
                    <li><i><img src="../../../assets/img/full.png"></i><span>百万法律人学习、工作首选的检索工具</span></li>
                    <li><i><img src="../../../assets/img/template.png"></i><span>万份模板 任意选择 一次购买 永久使用</span></li>
                    <li><i><img src="../../../assets/img/train.png"></i><span>法律培训 知法懂法 法律风险提前规避</span></li>
                </ul>
            </div>
            <div class="phone"><img src="../../../assets/img/phoneframe1.png"></div>
        </div>
    </section>
    <section class="main-2">
        <div class="main-2-block">
        </div>
        <div class="main-2-content">
            <h3 class="block-2-title">关于我们</h3>
            <h3 class="block-2-title-eg">Who are we</h3>
            <p class="block-2-content">芯汇法务云隶属于芯汇科技有限公司，是一个能让用户在线上联系律师 咨询法律问题的云端法务神器。解决法律事务的综合法务平台，能够让 有法律需求的用户快速解决法律问题，降低法律咨询的门槛，突破传统 法律服务时间、空间的桎梏，致力于让法律帮助更多人，保护每个人应 得的法律权益。
            </p>
        </div>
    </section>
        <section class="main-3">
        <div class="handphone"><img src="../../../assets/img/handphone.png" /></div>
        <div class="main-3-block">
            <h1 class="block-3-tit"><span>芯汇法务云</span> <span>您身边的法律专家</span></h1>
            <p class="block-3-content">大咖云集 万家律所</p>
            <div class="btns">
                <button class="download-app"><a :href="android" download="芯汇法务云">下载APP</a></button>
                <button class="detail">了解详情</button>
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
</section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      android: "/static/xhfwy.apk"
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

.main-1 {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #d6d6d6;
  text-align:center;
}

.main-1-block {
  position: relative;
  z-index: 2;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  margin: auto;
}

.cloud1 {
  top: 5%;
  left: 5%;
}

.cloud2 {
  bottom: 5%;
  right: 5%;
}

.cloud1,
.cloud2 {
  z-index: 1;
  position: absolute;
  width: 20rem;
}

.cloud1 img,
.cloud2 img {
  width: 100%;
}

.phone img {
  width: 15rem;
}

.phone {
  z-index: 2;
  margin-left: 2.5rem;
}

.block-1-title {
  font-size: 60/@r;
  /* font-weight: bold; */
  color: #666;
  margin-bottom: 120/@r;
}

.block-1-content {
  list-style: none;
  white-space: nowrap;
  text-align: left;
}

.block-1-content li span {
  font-size: 32/@r;
  font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB",
    "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  vertical-align: middle;
}

.block-1-content li i {
  padding: 5px;
  margin: 30px 35px 30px 0;
  width: 30px;
  height: 30px;
  display: inline-block;
  vertical-align: middle;
}

.main-2 {
  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around; */
  position: relative;
  /* margin: auto; */
  /* max-width: 65%; */
  height: 100vh;
  background: #fff;
  overflow: hidden;
}

.main-2-block {
  /* flex-grow: 1; */
  height: 100%;
  width: 50vw;
  float: left;
  background: url("../../../assets/img/about.png") no-repeat;
  background-size: cover;
}
.main-2-block::after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}

.main-2-content {
  /* flex-grow: 1; */
  width: 35vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  padding: 20px 10px;
  border: 1px solid #ccc;
  margin-left: -17vw;
}

.block-2-title {
  font-size: 2.5rem;
  /* color: #666; */
  /* font-weight: bold; */
  margin: 5px 0;
  text-align: center;
  white-space: nowrap;
}

.block-2-title-eg {
  font-size: 2rem;
  margin: 5px 0;
  text-align: center;
  white-space: nowrap;
}

.block-2-content {
  font-size: 1.2rem;
  line-height: 2rem;
  text-align: justify;
  text-indent: 2rem;
}

.main-3 {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background: url("../../../assets/img/5.jpg") no-repeat;
  overflow: hidden;
}

.main-3-block {
  flex-grow: 1;
}

.block-3-tit {
  font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB",
    "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  font-size: 3rem;
  font-weight: normal;
  color: #333;
  text-align: left;
  white-space: nowrap;
}

.block-3-content {
  font-size: 2rem;
  text-align: left;
  color: #333;
  margin-top: 3rem;
  white-space: nowrap;
}

.btns {
  text-align: left;
  margin-top: 5rem;
  white-space: nowrap;
}

.btns button {
  width: 10rem;
  height: 3rem;
  margin-right: 20px;
  font-size: 1.5rem;
  color: #fff;
  outline: none;
  border-radius: 30px;
  cursor: pointer;
}
.btns a {
  text-decoration: none;
  color: #fff;
}

.download-app {
  background-image: linear-gradient(0deg, #ffab54 0%, #ffa149 50%, #fe943c 100%),
    linear-gradient(#ff9827, #ff9827);
  background-blend-mode: normal, normal;
  border: none;
}

.detail {
  background-color: #ffd751;
  border: solid 2px rgba(255, 255, 255, 0.5);
}

.block-bottom {
  display: flex;
  flex-direction: row;
  margin-top: 5rem;
  text-align: left;
}

.block-item {
  padding-right: 5rem;
}

.block-item-title {
  font-size: 1.5rem;
  color: #333;
  white-space: nowrap;
}

.block-item-content {
  margin-top: 1.125rem;
  white-space: nowrap;
}

.handphone {
  margin-left: 10vw;
  align-self: flex-end;
  padding: 0 1.875rem;
  margin-bottom: -7px;
}

.handphone img {
  width: 32rem;
}
@media (max-width: 480px) {
  .handphone,
  .phone,
  .main-2-block {
    display: none;
  }
  .main-2 {
    display: flex;
    align-items: center;
  }
  .main-2-content {
    position: static;
    margin-left: 0;
    left: auto;
    top: auto;
    transform: none;
    width: auto;
    border: none;
    padding: 30px;
  }
  .block-2-content {
    font-size: 1.5rem;
    line-height: 3rem;
  }
  .block-1-content li i {
    margin: 20px 25px 20px 0;
    width: 20px;
    height: 20px;
  }
  .block-2-title,
  .block-2-title-eg {
    text-align: center;
  }

  .block-3-tit span {
    display: block;
    text-align: center;
  }
  .block-3-content {
    text-align: center;
  }
  .btns {
    text-align: center;
  }
  .block-item-title {
    text-align: center;
  }
  .block-item {
    padding-right: 0;
    margin: auto;
  }
}

@media (min-width: 481px) and (max-width: 800px) {
  .handphone,
  .phone,
  .main-2-block {
    display: none;
  }
  .main-2 {
    display: flex;
    align-items: center;
  }
  .main-2-content {
    position: static;
    margin-left: 0;
    left: auto;
    top: auto;
    transform: none;
    width: auto;
    border: none;
    padding: 30px;
  }
  .block-2-content {
    font-size: 1.5rem;
    line-height: 3rem;
  }
  .block-2-title,
  .block-2-title-eg {
    text-align: center;
  }
  .block-2-content {
    font-size: 1.5rem;
    line-height: 2;
  }
  .block-3-tit span {
    display: block;
    text-align: center;
  }
  .block-3-content {
    text-align: center;
  }
  .btns {
    text-align: center;
  }
  .block-item-title {
    text-align: center;
  }
  .block-item {
    padding-right: 0;
    margin: auto;
  }
}

@media (min-width: 801px) and (max-width: 1200px) {
  .handphone {
    margin-left: 0;
    padding-left: 0;
  }
  .handphone img {
    width: 35rem;
  }
}
@media (min-width: 1201px) {
}
</style>

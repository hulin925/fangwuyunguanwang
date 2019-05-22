<template>
<section class="main">
    <section class="main-1">
        <div class="main-block">
            <div class="main-1-no">01</div>
            <h1 class="main-tit"><span>芯汇法务云</span> <span>您身边的法律专家</span></h1>
            <p class="main-con">大律所+律师大咖+移动互联网</p>
            <div class="main-1-more">more</div>
        </div>
    </section>
    <section class="main-2">
        <div class="main-block">
            <div class="main-2-no">02</div>
            <h1 class="main-tit"><span>芯汇法务云</span> <span>在线快速法务咨询</span></h1>
            <p class="main-con">价格透明 快速透明 专业高效</p>
            <div class="main-2-more">more</div>
        </div>
        <div class="main-2-phone"><img src="../../../assets/img/phone.png" /></div>
        <div class="main-2-linellae"><img src="../../../assets/img/linellae.png" /></div>
    </section>
    <section class="main-3">
        <div class="main-block">
            <div class="main-3-no">03</div>
            <h1 class="main-tit"><span>芯汇法务云</span> <span>法条探索</span></h1>
            <p class="main-con">百万法律人信息、工作首选的探索工具</p>
            <div class="main-3-more">more</div>
        </div>
        <div class="main-3-bulb"><img src="../../../assets/img/bulb.png" /></div>
        <div class="main-3-linellae"><img src="../../../assets/img/linellae.png" /></div>
    </section>
    <section class="main-4">
        <div class="main-4-block">
            <div class="block">
                <div class="block-cover"><img src="../../../assets/img/ht.png" /></div>
                <div class="block-title">合同模板</div>
                <div class="block-content"><span>万份模板</span><span>任意选择</span><span>一次购买</span><span>永久使用</span></div>
            </div>
            <div class="block">
                <div class="block-cover"><img src="../../../assets/img/fl.png" /></div>
                <div class="block-title">法律培训</div>
                <div class="block-content"><span>专业培训</span><span>业务精湛</span><span>经验丰富</span></div>
            </div>
            <div class="block">
                <div class="block-cover"><img src="../../../assets/img/gw.png" /></div>
                <div class="block-title">顾问服务</div>
                <div class="block-content"><span>资深顾问</span><span>随时随地</span><span>高效服务</span></div>
            </div>
        </div>
    </section>
    <section class="main-5">
        <div class="handphone"><img src="../../../assets/img/handphone.png" /></div>
        <div class="main-5-block">
            <h1 class="block-5-tit"><span>芯汇法务云</span> <span>您身边的法律专家</span></h1>
            <p class="block-5-content">大咖云集 万家律所</p>
            <div class="btns">
                <button class="download-app" @click.stop="download">下载APP</button>
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
export default {
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {

  }
};
</script>

<style scoped lang="less" type="text/less">
  @r:30rem;

  .main{
    position:relative;
    top:82/@r;
  }
.main-1 {
  position: relative;
  height: 100vh;
  background: url("../../../assets/img/bantoum.png") no-repeat;
  background-size: cover;
  overflow: hidden;
}

.main-block {
  padding: 0 20vw;
  position: absolute;
  top: 35%;
  transform: translateY(-35%);
}

.main-tit {
  text-align: left;
  font-size: 60/@r;
  color: #fff;
  margin-top: 60px;
  font-weight: normal;
  white-space: nowrap;
}

.main-con {
  text-align: left;
  font-size: 34/@r;
  color: #fff;
  margin-top: 40px;
  opacity: 0.59;
  white-space: nowrap;
}

.main-1-no {
  text-align:center;
  font-size: 1rem;
  line-height: 2.8rem;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
}

.main-1-more {
  margin-top: 60px;
  border: 1px solid #fff;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  font-size: 1rem;
  line-height: 2.8rem;
  color: #fff;
}

.main-1-line {
  position: absolute;
  left: 30%;
  bottom: -30%;
  width: 40rem;
}

.main-1-line img {
  width: 100%;
}

.main-2 {
  position: relative;
  height: 100vh;
  background-size: cover;
  background: url("../../../assets/img/2.jpg") no-repeat;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.main-2-no {
  text-align:center;
  font-size: 1rem;
  line-height: 2.8rem;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
}

.main-2-more {
  margin-top: 60px;
  border: 1px solid #fff;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  font-size: 1rem;
  line-height: 2.8rem;
  color: #fff;
}

.main-2-phone {
  position: absolute;
  bottom: 30px;
  left: 35%;
  width: 32.5rem;
}

.main-2-phone img {
  width: 100%;
}

.main-2-linellae {
  position: absolute;
  bottom: -20px;
  height: 7.5rem;
  width: 100%;
}

.main-2-linellae img {
  height: 100%;
  width:100%;
}

.main-3 {
  position: relative;
  height: 100vh;
  background-size: cover;
  background: url("../../../assets/img/3.jpg") no-repeat;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.main-3-no {
  font-size: 1rem;
  line-height: 2.8rem;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
}

.main-3-more {
  margin-top: 60px;
  border: 1px solid #fff;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  font-size: 1rem;
  line-height: 2.8rem;
  color: #fff;
}

.main-3-bulb {
  position: absolute;
  left: 55%;
  top: 20%;
  width: 17.5rem;
}

.main-3-bulb img {
  width: 100%;
}

.main-3-linellae {
  position: absolute;
  bottom: -20px;
  height: 7.5rem;
  width: 100%;
}

.main-3-linellae img {
  height: 100%;
  width:100%;
}

.main-4 {
  position: relative;
  height: 100vh;
  background-size: cover;
  background: url("../../../assets/img/4.jpg") no-repeat;
  background-position: bottom;
  overflow: hidden;
  text-align:center;
}

.main-4-block {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.main-4-block .block {
  margin: 0 5%;
}

.block-cover {
  margin: 5px;
  width: 17rem;
}

.block-cover img {
  width: 100%;
}

.block-title {
  font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB",
    "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  font-size: 40/@r;
  color: #fff;
  margin: 5px;
  white-space: nowrap;
}

.block-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  padding: 5px;
  width: 15rem;
}

.block-content span {
  display: block;
  white-space: nowrap;
  font-size: 30/@r;
  padding: 5px;
  color: #fff;
  width: 40%;
}

.main-5 {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background: url("../../../assets/img/5.jpg") no-repeat;
  overflow: hidden;
}

.main-5-block {
  flex-grow: 1;
}

.block-5-tit {
  font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB",
    "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  font-size: 60/@r;
  font-weight: normal;
  color: #333;
  text-align: left;
  white-space: nowrap;
}

.block-5-content {
  font-size: 40/@r;
  text-align: left;
  color: #333;
  margin-top: 40/@r;
  white-space: nowrap;
}

.btns {
  text-align: left;
  margin-top: 100/@r;
  margin-left:40/@r;
  white-space: nowrap;
}

.btns button {
  width: 240/@r;
  height: 70/@r;
  margin-right: 40/@r;
  font-size: 30/@r;
  color: #fff;
  outline: none;
  border-radius: 70/@r;
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
  margin-top: 100/@r;
  text-align: left;
}

.block-item {
  padding-right: 80/@r;
}

.block-item-title {
  text-align: center;
  font-size: 32/@r;
  color: #333;
  white-space: nowrap;
}

.block-item-content {
  margin-top: 30/@r;
  white-space: nowrap;
}

.handphone {
  margin-left: 10vw;
  align-self: flex-end;
  padding: 0 30px;
  margin-bottom: -7px;
}

.handphone img {
  width: 30rem;
}

@media (max-width: 480px) {
  .main-block {
    padding: 0 5vw;
  }
  .main-1-line,
  .main-2-phone,
  .main-3-bulb,
  .block-cover,
  .handphone,
  .main-2-linellae,
  .main-3-linellae,
  .main-1-no,
  .main-2-no,
  .main-3-no,
  .main-1-more,
  .main-2-more,
  .main-3-more {
    display: none;
  }
  .main-1 {
    display: flex;
  }
  .main-block {
    position: static;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    margin: auto;
  }
  .main-tit {
    text-align: center;
  }
  .main-tit span {
    display: block;
  }
  .main-4-block {
    flex-direction: column;
  }
  .block {
    padding: 2rem 0;
  }
  .block-5-tit {
    text-align: center;
  }
  .block-5-tit span {
    display: block;
  }
  .block-5-content {
    text-align: center;
  }
  .btns {
    text-align: center;
  }
  .block-bottom {
    justify-content: space-around;
  }
  .block-item {
    padding-right: 0;
    text-align: center;
  }
}

@media (min-width: 481px) and (max-width: 800px) {
  .main-block {
    padding: 0 10vw;
  }
  .main-block {
    padding: 0 5vw;
  }
  .main-1-line,
  .main-2-phone,
  .main-3-bulb,
  .block-cover,
  .handphone,
  .main-2-linellae,
  .main-3-linellae,
  .main-1-no,
  .main-2-no,
  .main-3-no,
  .main-1-more,
  .main-2-more,
  .main-3-more {
    display: none;
  }
  .main-1 {
    display: flex;
  }
  .main-block {
    position: static;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    margin: auto;
  }
  .main-tit {
    text-align: center;
  }
  .main-tit span {
    display: block;
  }
  .main-4-block {
    flex-direction: column;
  }
  .block {
    padding: 2rem 0;
  }
  .block-5-tit {
    text-align: center;
  }
  .block-5-tit span {
    display: block;
  }
  .block-5-content {
    text-align: center;
  }
  .btns {
    text-align: center;
  }
  .block-bottom {
    justify-content: space-around;
  }
  .block-item {
    padding-right: 0;
    text-align: center;
  }
}

@media (min-width: 801px) and (max-width: 1200px) {
  .main-block {
    padding: 0 15vw;
  }
  .handphone {
    margin-left: 0;
    padding-left: 0;
  }
  .handphone img {
    width: 33rem;
  }
}
@media (min-width: 1201px) {
  .main-block {
    padding: 0 20vw;
  }
}
</style>

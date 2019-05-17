<template>
  <div>
    <div id="wrap" v-show="show">
      <header>
        <div class="closeICon" @click="closeImage"><i></i></div>
        <strong>{{imageIndex + 1}}/{{data.length}}</strong>
      </header>
      <section>
        <swiper style="position: relative;width: 100%;height: 100%;" height="100%" loop v-model="imageIndex">
          <swiper-item
            class="swiper-demo-img"
            v-for="item,index in data"
            :key="index"
          >
            <img
              class="imgClass"
			  :key="item"
			  v-lazy="item"
            >
          </swiper-item>
        </swiper>
      </section>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Swiper, SwiperItem} from 'vux'
  export default {
    components: {
      Swiper,
      SwiperItem,
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: () => []
      },
    },
    computed: mapGetters([]),
    created() {
      if (this.value) {
        this.show = true;
      }
    },
    watch: {
      show(val) {
        if (val) {
          this.$emit('input', false)
        }
      },
      value(val) {
        this.show = val;
      }
    },
    data() {
      return {
        show: false,
        imageIndex: 0,
      }
    },
    methods: {
      closeImage() {
        this.show = false;
		    this.imageIndex = 0
        this.$emit('setShow')
      }
    },
    mounted() {

    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  #wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #000;
    z-index: 100000;
  }
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 88/@r;
  }
  .closeICon {
    width: 50/@r;
    height: 50/@r;
    padding: 10/@r;
    position: absolute;
    left: 30/@r;
    top: 19/@r;
  }
  .closeICon i {
    display: block;
    width: 30/@r;
    height: 30/@r;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAA6klEQVRIicXWSwrCMBCA4UEP68IWX/V1lG57AfFq2p3g70LFEPOaNNWBLprJ8JGWISOAAB1wAWav99JPDVyBVoApcOMZd2BeGFvzict7cWsslkRNDKA2k0cLrQpjK0DsTaXQjQtzgQIcBqI2tjTzvqJcNIiFwBw0isVAF1p79jUpWAoowD6CNlbei6WCIVSFaUAXetJiWtBG1VgOKMDOwhaa+on8OgacLuuUQz7lOQfNxXxtEUVz2mHUxo9harQEpkJTsZzryYm6ikpewF9oacyFYqJjYEHU98PHGhMr4U+DcAf0jDvq90D7APLLk1QV4/63AAAAAElFTkSuQmCC) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  header strong {
    display: block;
    text-align: center;
    color: #fff;
    line-height: 88/@r;
    font-size: 30/@r;
    font-family: "微软雅黑";
  }
  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .imgClass {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-60%);
  }
</style>

<template>
  <div class="app">


    <section>
      <router-view/>
    </section>
    <!--关注-->
    <div class="mainFooter" @click.stop="Follows(WrapData.uid)">
      <span v-if="followObj.isguanzhu==0">+ 关注</span>
      <span v-else>取消关注</span>
    </div>

  </div>
</template>

<script>
	import {mapGetters} from 'vuex'
  import {
    FollowsV
  } from '@/assets/public.js'
  export default {
    name: "lawyerSpecial",
		computed:mapGetters([
		  'followObj'//把数据从getters拿过来
		]),
    data() {
      return {
        lid:'',
        WrapData: {},//初始数据
        WrapSpecialInfo: {},//律师信息储存
      }
    },
    created() {
      this.$nextTick(()=>{
        this.lid=this.$route.query.lid;
        this.WrapInitData();
      })
    },
    mounted() {
      // window.FollowsPassV= this.FollowsPassV;
    },
    methods: {
      GetQueryString(name) { //截取?后想要的数据 lawyerId
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      WrapInitData() {//初始数据
        // this.$store.commit('showLoading');
        let options = new FormData();
        options.append('lid', this.lid);//1068
        options.append('page', 1);
        this.$store.dispatch('LawyerSpecial', options)
          .then(data => {
            data.faces=data.weburl+data.face;
            this.WrapSpecialInfo.lid=data.uid;
            sessionStorage.setItem('specialInfo',JSON.stringify(this.WrapSpecialInfo));
            this.WrapData = data;
            // this.$store.commit('hidenLoading')
          })
      },
      Follows(lid) { //关注接口
        options.append('uid', '1006');//1006
        options.append('lid', this.GetQueryString('lid'));
        options.append('token','6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d15');//6dfd23173ef55ba12ce6e6bfc04b9da24e1d45b3e88a163156bda33fc6351f8d
        this.$store.dispatch('follows', options)
          .then(data => {
            this.WrapInitData();
          })

      },
    }
  }
</script>

<style scoped lang="less">
  @r: 30rem;
  .app {
    color: #333;
    background-color: #fff;
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
    z-index: 10;
  }
</style>

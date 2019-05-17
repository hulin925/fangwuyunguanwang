<template>
    <div class="app">
      <div v-html="data.content"></div>
    </div>
</template>

<script>
    export default {
        name: "aboutThree",
      data(){
          return {
            data:{},
          }
      },
      created(){
        this.initData();
      },
      methods:{
        GetQueryString(name) { //截取?后想要的数据 lawyerId
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) return unescape(r[2]);
          return null;
        },
        initData(){//获取页面初始数据
          let options=new FormData();
          options.append('flag',this.GetQueryString('flag'));
          this.$store.dispatch('aboutThree',options)
            .then(data=>{
              this.data=data;
            })
        },
      },
    }
</script>

<style scoped lang="less">
  @r:30rem;
  .app{
    padding:20/@r;
  }

</style>

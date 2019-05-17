<template>
  <div class="Details">
		<div class="content">
			<h1>{{data.title}}</h1>
			<ul class="release">
				<li>发布机关：{{data.section}}</li>
				<li>发布日期：{{data.release_time}}</li>
				<li>发文字号：{{data.code}}</li>
				<li>生效日期：{{data.release_time}}</li>
				<li>效力等级：{{data.effect?'':'无'}}</li>
				<li>时效性：现行有效</li>
				<li v-if="data.classify">类别：{{data.fatiaotype}}</li>
				<li v-else>类别：无</li>
			</ul>
			<div v-html="data.content" style="font-size:1rem; margin-top:20px; text-align: left !important;">
			</div>
		</div>

    <div class="openApp" @click.stop="download" v-if="isWebpage==1">
      <span>打开APP查看更多法条</span>
    </div>
  </div>
</template>

<script>
  import {Collection} from '@/assets/public.js'//收藏
export default {
  name: 'LawDetails',
  data () {
    return {
      isWebpage:'',//判断是否是H5网页打开
      collection:{},//收藏数据
			data:{},
    }
  },
	created(){
    this.isWebpage =this.GetQueryString('isWebpage');//判断是否有下载按钮
		this.initData();
	},
	methods:{
		initData(){
			let options=new FormData();
			options.append('id',this.GetQueryString('id'));//510
			options.append('uid',this.GetQueryString('uid'));//510
      options.append('classify','5');//5
			// options.append('tag','fatiao');//fatiao
			this.$store.dispatch('LawyerFindFatiaoDetails',options)
        .then(data=>{
          console.log(data)
				  this.data=data;
          this.collection.classify=data.classify;//收藏数据传递
          this.collection.ArticleId=data.id;//收藏数据传递
          this.collection.iscollection=data.iscollection;//收藏数据传递
          // Collection(this.collection);//收藏方法ios

          // if(this.isWebpage==1){
          //   return;
          // }

          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            //Ios
            Collection(this.collection);//收藏方法
          } else if (/(Android)/i.test(navigator.userAgent)) {
            //Android终端
            window.AndroidMethod.Collection(JSON.stringify(this.collection));//android 传递参数
          }
			})
		},
    GetQueryString(name) { //截取?后想要的数据 lawyerId
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
	}
}
</script>

<style scoped lang="less">
	@r:30rem;

	h1{
		font-size:38/@r;
	}
	.Details{
		font-weight:bold;
	}
	.content{
		padding:20/@r;
		font-size:36/@r;
		line-height:64/@r;
	}
	.release{
		font-size:34/@r;
		margin-top:40/@r;
	}
	.release li{
		padding:10/@r 0;
		line-height:44/@r;
		color:#9d9d9d;
		font-weight:normal;
	}
	.footer a{
		color:red !important;

	}
  .openApp{
    position:fixed;
    bottom:20/@r;
    left:2%;
    background-color:#8c94ff;
    color:#fff;
    width:96%;
    line-height:80/@r;
    font-size:32/@r;
    text-align:center;
    -webkit-border-radius: 30/@r;
    -moz-border-radius: 30/@r;
    border-radius: 30/@r;
  }

</style>

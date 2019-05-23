<template>
	<div id="app">
		<router-view></router-view>

    <!--预加载-->
		<div id="loadingMask" v-show="isLoading">

			<div>
				<i></i>
				<span>拼命加载中...</span>
			</div>

		</div>



    <!--点赞-->
    <!--<div id="FabulousMask" v-show="isZan">-->
      <!--<div>-->
        <!--<i></i>-->
      <!--</div>-->
    <!--</div>-->

	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		name: 'app',
		computed:mapGetters([
			'isLoading',
      // 'isZan'
		]),
    data(){
		  return{

      }
    },
    created(){
    }

	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@r: 30rem;

	#app {
		background-color: #fff;
		font-size: 28/@r;
	}

	a {
		color: red;
		text-decoration: underline;
	}
  #FabulousMask div{
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     text-align: center;
     width: 220/@r;
     height: 220/@r;
     overflow: hidden;
   }
  #FabulousMask i{
    display: block;
    width: 100%;
    height: 100%;
    background: url(./assets/img/pointStart.png) no-repeat;
    background-size: 2000% 100%;
    animation: moveHande .65s forwards 1 steps(19);
  }
  @keyframes moveHande {
    form {
      background-position-x: left;
    }
    to {
      background-position-x: right;
    }
  }

	#loadingMask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .6);
		color: #fff;
	}

	#loadingMask div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	#loadingMask i {
		display: inline-block;
		width: 80/@r;
		height: 80/@r;
		background: url("./assets/img/loadingIcon.png") no-repeat;
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		animation: isRotate .5s linear infinite;
	}

	#loadingMask span {
		display: block;
		text-align: center;
		font-size: 30/@r;
		line-height: 2;
		font-family: "微软雅黑";
	}
	@keyframes isRotate{
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(-180deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
</style>

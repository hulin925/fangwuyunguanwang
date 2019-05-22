export default {
	initData(state, data) {
		state.initDataList = data;
	},
	showLoading(state) { //数据加载
		state.isLoading = true;
	},
	hidenLoading(state) { //数据加载
		state.isLoading = false;
	},
  showZan(state) { //赞
    state.isZan = true;
  },
  hidenZan(state) {
    state.isZan = false;
  },
	setLawyerNav(state, id) { //改变state数据
		state.WrapNavList = state.WrapNavList.map((item, index) => {
			if (index == id) {
				item.active = true;
				return item
			} else {
				item.active = false;
				return item
			}
		})
	},
  isSetLayerNav(state,id){//判断是否是援助
	  state.isWrapNavList=state.isWrapNavList.map((item,index)=>{
	    if(index==id){
	      item.active = true;
	      return item
      }else{
	      item.active = false;
	      return item
      }
    })
  },
  isPcNavList(state, id) { //改变state数据
    state.isPcNavList = state.isPcNavList.map((item, index) => {
      if (index == id) {
        item.active = true;
        return item
      } else {
        item.active = false;
        return item
      }
    })
  },
	initArrImg(state, data) { //查看图片
		state.arrImg = data;
	},
	followObj(state, obj) {//律师专题页数据存储
		state.followObj = obj;
	}
}

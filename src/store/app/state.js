export default {
  initDataList: [],
  isLoading: false,
  isZan: false,
  arrImg:[],//图片存储
  WrapNavList: [//律师专题页导航
    {
      title: '主页',
      routerName: 'home',
      active:true
    },
    {
      title: '观点',
      routerName: 'viewpoint',
      active:false
    },
    {
      title: '视频',
      routerName: 'video',
      active:false
    },
    {
      title: '图文咨询',
      routerName: 'consultation',
      active:false
    },
    {
      title: '文书服务',
      routerName: 'service',
      active:false
    },
  ],
  isWrapNavList: [//律师专题页导航，援助
    {
      title: '主页',
      routerName: 'home',
      active:true
    },
    {
      title: '观点',
      routerName: 'viewpoint',
      active:false
    },
    {
      title: '视频',
      routerName: 'video',
      active:false
    },
    {
      title: '图文咨询',
      routerName: 'consultation',
      active:false
    },
  ],
	followObj:{},//关注数据
}

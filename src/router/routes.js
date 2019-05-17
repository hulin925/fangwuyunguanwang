//2.0数据
// import Find from '@/views/twoApp/Find'
// import LawDetails from '@/views/twoApp/LawDetails'
// import SearchLaw from '@/views/twoApp/SearchLaw'

//3.0数据
import aboutThree from '@/views/threeApp/aboutThree'//关于我们

import LawyerFindRecommend from '@/views/threeApp/LawyerFind/LawyerFindRecommend'//发现页下的推荐
import LawyerFindArticleDetail from '@/views/threeApp/LawyerFind/LawyerFindArticleDetail'//发现页下的文章详情
import Webpage from '@/views/threeApp/Webpage'//发现页下的文章详情 h5网页打开的
import LawyerFindFatiao from '@/views/threeApp/LawyerFind/LawyerFindFatiao'//发现页下的法条
import LawyerFindLawDetails from '@/views/threeApp/LawyerFind/LawyerFindLawDetails'//发现页下的法条详情列表


import LawyerSpecial from '@/views/threeApp/LawyerSpecial'//律师专题页
import myFans from '@/views/threeApp/LawyerSpecialRoutes/myFans'//我的粉丝
//LawyerSpecial下的子路由
import LawyerSpecialNav from '@/views/threeApp/LawyerSpecialRoutes/LawyerSpecialNav'//律师专题页nav
import home from '@/views/threeApp/LawyerSpecialRoutes/home'
import viewpoint from '@/views/threeApp/LawyerSpecialRoutes/viewpoint'
import video from '@/views/threeApp/LawyerSpecialRoutes/video'
import service from '@/views/threeApp/LawyerSpecialRoutes/service'
import consultation from '@/views/threeApp/LawyerSpecialRoutes/consultation'


export default[
  //3.0律师发现页下的推荐
  {
    path: '/',
    name:'LawyerFindRecommend',
    component: LawyerFindRecommend,
    // component(resolve){
    //   require(['@/views/threeApp/LawyerFind/LawyerFindRecommend'],resolve)
    // }
  },
  //3.0律师发现页下的法条
  {
    path: '/LawyerFindFatiao',
    name:'LawyerFindFatiao',
    component: LawyerFindFatiao,
    // component(resolve){
    //   require(['@/views/threeApp/LawyerFind/LawyerFindFatiao'],resolve)
    // }
  },
  //3.0律师发现页下的法条详情列表
  {
    path: '/LawyerFindLawDetails',
    name:'LawyerFindLawDetails',
    component: LawyerFindLawDetails,
    // component(resolve){
    //   require(['@/views/threeApp/LawyerFind/LawyerFindLawDetails'],resolve)
    // }
  },
  //3.0律师发现页下的文章详情 h5网页打开的
  {
    path: '/Webpage',
    name:'Webpage',
    component: Webpage
  },
  //3.0律师发现页下的文章详情
  {
    path: '/LawyerFindArticleDetail',
    name:'LawyerFindArticleDetail',
    component: LawyerFindArticleDetail
  },
  //3.0律师专题页Nav
  {
    path: '/LawyerSpecialNav',
    name:'LawyerSpecialNav',
    component: LawyerSpecialNav
    // component(resolve){
    //   require(['@/views/threeApp/LawyerSpecialRoutes/LawyerSpecialNav'],resolve)
    // }
  },
  //3.0律师专题页
  {
    path:'/LawyerSpecial',
    name:'LawyerSpecial',
    component:LawyerSpecial,
    // component(resolve){
    //   require(['@/views/threeApp/LawyerSpecial'],resolve)
    // },
    redirect:'LawyerSpecial/home',
    children:[
      //主页
      {
        path: 'home',
        name:'home',
        component: home
      },
      //观点
      {
        path: 'viewpoint',
        name:'viewpoint',
        component: viewpoint
      },
      //视频
      {
        path: 'video',
        name:'video',
        component: video
      },
      //文书服务
      {
        path: 'service',
        name:'service',
        component: service
      },
      //图文咨询
      {
        path: 'consultation',
        name:'consultation',
        component: consultation
      }
    ]
  },
  //我的粉丝
  {
    path:'/myFans',
    name:'myFans',
    component:myFans
  }

]

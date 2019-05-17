// app传对象

// 2.0
export const IOSToVue = (obj)=> {//发现页
    window.webkit.messageHandlers.IOSToVue.postMessage(obj);
}
export const SearchBack = (obj)=> {//法条返回
  window.webkit.messageHandlers.SearchBack.postMessage(obj);
}
export const SearchId = (obj)=> {//法条搜索详情
  window.webkit.messageHandlers.SearchId.postMessage(obj);
}



//3.0  发现页下的方法
export const SearchIdThree = (obj)=> {//法条搜索详情
  window.webkit.messageHandlers.SearchIdThree.postMessage(obj);
}
export const SearchBackThree = (obj)=> {//法条返回
  window.webkit.messageHandlers.SearchBackThree.postMessage(obj);
}
export const ArticleDetail = (obj)=> {//跳转文章详情
  window.webkit.messageHandlers.ArticleDetail.postMessage(obj);
}
export const Follows = (obj)=> {//关注
  window.webkit.messageHandlers.Follows.postMessage(obj);
}
export const Fabulous = (obj)=> {//点赞
  window.webkit.messageHandlers.Fabulous.postMessage(obj);
}
export const Comment = (obj)=> {//评论
  window.webkit.messageHandlers.Comment.postMessage(obj);
}
export const Collection = (obj)=> {//收藏
  window.webkit.messageHandlers.Collection.postMessage(obj);
}
export const Forward = (obj)=> {//转发
  window.webkit.messageHandlers.Forward.postMessage(obj);
}
export const pictureUrl = (obj)=> {//图片链接跳转
  window.webkit.messageHandlers.pictureUrl.postMessage(obj);
}




//3.0 律师专题页下的方法
export const Share = (obj)=> {//律师专题页分享
  window.webkit.messageHandlers.Share.postMessage(obj);
}
export const ArticleViewpoint = (obj)=> {//专题页观点，文章详情
  window.webkit.messageHandlers.ArticleViewpoint.postMessage(obj);
}
export const ArticleVideo = (obj)=> {//专题页视频，文章详情
  window.webkit.messageHandlers.ArticleVideo.postMessage(obj);
}
export const FabulousViewpoint = (obj)=> {//专题页观点，点赞
  window.webkit.messageHandlers.FabulousViewpoint.postMessage(obj);
}
export const FabulousVideo = (obj)=> {//专题页视频，点赞
  window.webkit.messageHandlers.FabulousVideo.postMessage(obj);
}
export const FollowsV = (obj)=> {//专题页下的，关注
  window.webkit.messageHandlers.FollowsV.postMessage(obj);
}
export const specialBack = (obj)=> {//专题页下的，返回
  window.webkit.messageHandlers.specialBack.postMessage(obj);
}
export const PersonalTopics = (obj)=> {//跳转律师专题页
  window.webkit.messageHandlers.PersonalTopics.postMessage(obj);
}
export const Consultation = (obj)=> {//图文咨询
  window.webkit.messageHandlers.Consultation.postMessage(obj);
}
export const ConsultationService = (obj)=> {//文书服务，咨询按钮
  window.webkit.messageHandlers.ConsultationService.postMessage(obj);
}

//图片放大处理
export const ImgShow =(obj)=>{
  window.webkit.messageHandlers.ImgShow.postMessage(obj);
}


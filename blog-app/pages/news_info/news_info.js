//index.js
//获取应用实例
const app = getApp()
import { newsInfo,newsList,give} from '../../api/news.js';
import WxParse from '../../wxParse/wxParse.js';
Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0,
    parameter: {
      'navbar': '2',
      'return': '1',
      'title' : '', //头部显示标题
      'color': true
    },
    u_id: '', //id值
    infoList: {}, //主要内容
	newslist: [], //列表
    infoconten: '', //内容
	showBackTop: false, //回到顶部
	isfalse: false,
	give_num: '', //点赞个数
  },
  
  onLoad:function(options) {
	  let {id} = options;
	  console.log(options.id)
	  this.setData({ 
		  u_id: id,
	  }) //设置传过来的id
	  this._newInfo();
	  this._newsList();
  },
  // 获取详情页
  _newInfo:function() {
	  console.log(this.data.u_id)
	  newsInfo({id: this.data.u_id}).then(res => {
		  console.log(res)
		  const type = `parameter.title`
		  this.setData({
		  	 infoList: res.result,
			 infoconten: res.result.content,
			 give_num:res.result.give,
			 [type]: res.result.title,
		  }) 
		  WxParse.wxParse('infoconten', 'html', this.data.infoconten, this, 0);
	  })
  },
  //获取列表页
  _newsList(){
    newsList({ page: 0}).then(res=> {
      console.log(res)
      const newsArr = this.data.newslist;
      const list = res.result.news_list;
      newsArr.push(...list)
      console.log(res)
       this.setData({
         newslist: newsArr,
       })
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  //点赞
  handGive:function() {
	  give({id: this.data.u_id,cood:!this.data.isfalse}).then(res => {
		  console.log(JSON.stringify(res))
		  if(res.status==1) {
			  this.setData({
			  	isfalse: !this.data.isfalse,
				give_num: res.result
			  })
		  }
	  })
  },
  // 评论
  comment: function() {
	  wx.showToast({
	    title: '开发中',
	    icon: 'loading',
	    duration: 1000
	  })
  },
  onPageScroll:function(options) {
    const scrollTop = options.scrollTop;
	const flag = scrollTop>= 1000 ;
	if(flag != this.data.showBackTop) {
		this.setData({
		  showBackTop: flag
		})
	}
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  }
})

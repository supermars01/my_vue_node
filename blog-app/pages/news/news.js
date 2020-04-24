const app = getApp()
import { categoryList,newsList } from '../../api/news.js';
Page({
  data: {
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
	list_arry: [],
    load: true,
	itemName: '',
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
	this._category_list();
  },
  _category_list() {
	  categoryList().then(res => {
		  console.log(JSON.stringify(res))
		  if(res.status == 1) {
			  this.setData({
				  list: res.result,
				  listCur: res.result[0],
				  itemName: res.result[0].name
			  })
		  }
	  })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) { //切换侧边栏
	 console.log(e.currentTarget.dataset.name)
		
	 newsList({page: 0,title: e.currentTarget.dataset.name}).then(res => {
		 console.log(JSON.stringify(res))
		 this.setData({
			 itemName:e.currentTarget.dataset.name,
			 list_arry: res.result.news_list,
			 TabCur: e.currentTarget.dataset.id,
			 MainCur: e.currentTarget.dataset.id,
		 })
	 })
    // this.setData({
    //   TabCur: e.currentTarget.dataset.id,
    //   MainCur: e.currentTarget.dataset.id,
    //   VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    // })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})
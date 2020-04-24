var app = getApp()
// components/navbar/navbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    parameter: {
      type: Object,
      value: {
        class: '0'
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    navH: 0
  },
  attached: function () {
    this.setData({
      navH: app.globalData.navHeight
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    return:function(){
	  var pages = getCurrentPages();
	  wx.navigateBack({
		delta: pages.length-2
	  });
	},
	setGoodsSearch:function(){
	   wx.navigateTo({
		 url: '/pages/search/search',
	   })
	},
  }
})

// pages/search/search.js
import { search } from '../../api/news.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
	parameter: {
	  'navbar': '1',
	  'return': '1',
	  'title': '文章搜索',
	  'color': true
	},
	searchValue: '',
	focus:true,
	newslist: [],
	storageArr: wx.getStorageSync('storageArr') || [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 搜索内容获取
  setValue: function (event){
    this.setData({ searchValue: event.detail.value});
  },
  //点击历史记录获取搜索内容
  setHotSearchValue: function (event) {
    this.setData({ searchValue: event.currentTarget.dataset.item });
    this.getProductList();
  },
  //搜索
   searchBut:function(){
      this.setData({ focus: false });
      if (this.data.searchValue.length > 0){
        wx.showLoading({ title:'正在搜索中'});
        this.getProductList();
      }else{
        wx.showToast({
           title: '请输入搜索内容',
           icon: 'none',
           duration: 800
        })
      }
    },
	// ----------------清除记录------------------
	clearStorage() {
		wx.setStorageSync('storageArr', [])
		this.setData({
			storageArr: []
		})
	},
	// ----------------搜索请求数据------------------
	getProductList() {
		search({title:this.data.searchValue}).then(res => {
			if(res.status==1) {
				this.setData({
					newslist: res.result
				})
			}
		})
		wx.hideLoading();
		// 存储数据，查询是否存在当前的录入的数值
		const findStorage = wx.getStorageSync('storageArr') || []
		if(!findStorage.includes(this.data.searchValue)) {
			findStorage.unshift(this.data.searchValue)
			wx.setStorageSync('storageArr', findStorage)
			this.setData({
				storageArr: findStorage
			})
		}
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
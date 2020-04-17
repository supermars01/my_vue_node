// pages/switchcity/switchcity.js
// const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    city: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.getnewCity();
    this.setData({
      address: options.name
    });
  },

  //获取开通城市信息
  getnewCity: function () {
    var newcity = this;
    var city = {
      city: ["惠州市", "武汉市", "汕头市"]
    }
    newcity.setData(city);
  },

  reGetaddress: function (e) {
    app.city = e.currentTarget.dataset.city
    // appInstance.globalData.defaultCounty = this.data.county
    console.log(app.city);
    //返回首页
    wx.switchTab({
      url: '../index/index'
    })
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
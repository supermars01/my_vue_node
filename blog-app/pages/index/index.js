// pages/personal/personal.js
import { newsList } from '../../api/news.js';
import WxParse from '../../wxParse/wxParse.js';
Page({
  /**
  * 页面的初始数据
  */
  data: {
    city: '广州市', //位置
    //轮播
    cardCur: 0,
    indicatorDots:false,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    //icon
    navList: [
      { thumb: 'http://img.youlemi.net/images/2/2019/11/ZSU1OuGbT1Y4Y1c5S595lcbysUL924.png', catename: '技术', url: '..'},
    ],
    gridCol: 5, //动态更改显示个数
    parameter: {
      'navbar': '0',
      'return': '0'
    },
    newslist: [],
    page: 0
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    //获取地址
    // wx.getLocation({
    //   success: function(res) {
    //     console.log(res)
    //   },
    // })
    this._newsList()
  },
  _newsList(){
    const pagenum = this.data.page + 1
    newsList({ page: pagenum}).then(res=> {
      console.log(res)
      const newsArr = this.data.newslist;
      const list = res.result.news_list;
      newsArr.push(...list)
      console.log(res)
       this.setData({
         newslist: newsArr,
         page: pagenum
       })
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
      //上拉加载更多
    this._newsList()
  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (options) {
    return {
      title: '首页',
      path: '/'
    }
  },
})


// 引入工具对象
const { formaTime} = require('utils/util.js');
import { login, checkToken} from 'api/user.js';
const TOKEN = 'token';
//app.js
App({
  onLaunch: function () {
    //----------------- 展示本地存储能力-----------------
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
     wx.setStorageSync('logs', logs)
  
    //-------------------token取值-------------------
    const token = wx.getStorageSync(TOKEN)
    if (token && token.length !==0) { //验证token
      this.check_token(token)
    } else { //不存在token验证通过
      this.login()
    }

    //----------------获取导航高度；-------------------
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight * (750 / res.windowWidth) + 97;
        console.log(this.globalData.navHeight)
      }, fail(err) { }
    });

  },
  //验证
  check_token(token) {
    wx.request({
      url: 'http://localhost:5000/api/wxusers/checkToken',
      method: 'post',
      header: {
        token
      },
      success:(res) => {
        if(!res.data.errCode) {
          console.log('token有效')
          this.globalData.token=token
        } else {
          this.login()
        }
        console.log(res)
      },
      fail:(err)=> {
        console.log(err)
        this.login()
      }
    })
    // checkToken().then(res => {
    //   if (!res.data.errCode) {
    //     console.log('token有效')
    //     this.globalData.token=token
    //   } else {
    //     this.login()
    //   }
    // }).catch(error => console.log(error))
  },
  // 登录
  login() {
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code;
        login({ code: code }).then(res => {
          console.log(res);
          const token = res.token
          this.globalData.token = token
          //进行本地存储
          //wx.setStorage 异步处理
          wx.setStorageSync(TOKEN, token) //同步操作-处理完再执行下一步
        }).catch(error => console.log(error))
      }
    })
  },
  //对象:小程序关闭掉
  globalData:{
    token: '',
    navHeight: 0
  }
})
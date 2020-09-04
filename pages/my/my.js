// pages/my/my.js
const API = require('../../utils/api');
const UTIL = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:API.IMG_BASE_URL,
    userInfo: null
  },
  afterRead(event) {
    let _this = this
    const {file} = event.detail;
    let userInfo = wx.getStorageSync('userInfo');
    let param = {
      change_type: "head",
      head_img: file.path
    }
    //获取的当前时间戳（10位）
    param.timestamp = Math.round(new Date().getTime() / 1000).toString();
    let token = wx.getStorageSync('loginToken');
    //通过md5加密验签
    param.sign = UTIL.getMD5Sign(param, token)
    wx.uploadFile({
      url: 'https://api-zhouyi.chengyue.online/user/update', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'head_img',
      formData: param,
      success(res) {
        console.log(res)
        let data = JSON.parse(res.data)
        wx.showToast({
          title: data.message,
        })
        // let userInfo = wx.getStorageSync('userInfo');
        // userInfo.head_img = data.head_img
        // wx.setStorageSync('userInfo','userInfo')
        const {
          fileList = []
        } = _this.data;
        fileList.push({
          ...file,
          url: res.data
        });
        _this.setData({
          fileList
        });
      },
    });
  },
  // 退出登录
  onSignOut() {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function (sm) {
        if (sm.confirm) {
          let token = wx.getStorageSync('loginToken');
          API.signOut({
              user_id: _this.data.userInfo.user_id,
            }, token)
            .then(res => {
              console.log(res)
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
              wx.clearStorage();
              setTimeout(() => {
                wx.reLaunch({
                  url: '../home/home',
                })
              }, 3000);
            })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 跳转登录页
  onLogin() {
    wx.redirectTo({
      url: '../login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo
    })
    console.log(userInfo)
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
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
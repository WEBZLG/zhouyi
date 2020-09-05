// pages/my/my.js
const API = require('../../utils/api');
const UTIL = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL,
    userInfo: null,
    fileList: []
  },
  // 跳转认证
  goCertification() {
    wx.navigateTo({
      url: '../certification/certification',
    })
  },
  // 跳转修改手机号
  goChangePhone() {
    wx.navigateTo({
      url: '../changePhone/changePhone',
    })
  },
  // 跳转修改密码
  goChangePwd() {
    wx.navigateTo({
      url: '../changePwd/changePwd',
    })
  },
  // 跳转我的推荐
  goMyRecommend() {
    wx.navigateTo({
      url: '',
    })
  },
  // 跳转大师
  goMaster() {
    wx.navigateTo({
      url: '',
    })
  },
  // 更换头像
  afterRead(event) {
    let _this = this
    const {
      file
    } = event.detail;
    let userInfo = wx.getStorageSync('userInfo');
    let param = {
      change_type: "head",
      head_img: file.path,
      user_id: userInfo.user_id
    }
    //获取的当前时间戳（10位）
    param.timestamp = Math.round(new Date().getTime() / 1000).toString();
    let token = wx.getStorageSync('loginToken');
    //通过md5加密验签
    param.sign = UTIL.getMD5Sign(param, token)
    wx.uploadFile({
      url: API.API_BASE_URL + '/user/update', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'head_img',
      formData: param,
      success(res) {
        let data = JSON.parse(res.data)
        wx.showToast({
          title: data.message,
        })
        _this.setData({
          ['userInfo.head_img']: data.data.head_img
        })
        wx.setStorageSync('userInfo', _this.data.userInfo)
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
  // 获取登录信息
  getMessge(e) {
    let _this = this
    let type = e.target.dataset.type
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo == '' || userInfo == undefined) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      API.isSignIn({}, {
          uid: userInfo.user_id
        })
        .then(res => {
          if (res.message == '已登录') {
            wx.setStorageSync('loginToken', res.data.login_token);
            wx.setStorageSync('userInfo', res.data.user);
            switch (type) {
              case 0:
                _this.goCertification()
                break;
              case 1:
                _this.goChangePhone()
                break;
              case 2:
                _this.goChangePwd()
                break;
              case 3:
                _this.goMyRecommend()
                break;
              case 4:
                _this.goMaster()
                break;
            }
          } else {
            wx.showToast({
              title: 'res.message',
              icon: "none"
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '../login/login',
              })
            }, 3000);
          }
        })
    }
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
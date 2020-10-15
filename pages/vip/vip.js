// pages/vip/vip.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipList: [],
    checkindex: '',
    typeindex: '',
    loading: true,
    type: '',
    userInfo:''
  },
  getPrice() {
    API.priceList({}).then(res => {
      this.setData({
        vipList: res.data
      })
    })
  },
  checkPrice(e) {
    let idx = e.currentTarget.dataset.index
    let pidx = e.currentTarget.dataset.priceindex
    let type = e.currentTarget.dataset.type
    this.setData({
      typeindex: idx,
      checkindex: pidx,
      type: type
    })
  },
  onSubmit() {
    let type = this.data.typeindex
    let time = this.data.checkindex
    console.log(type, time)
    if (type == '' && time == '') {
      wx.showToast({
        title: '请选择要开通的会员类型',
        icon: 'none'
      })
      return false
    }
    API.namePay({
      pay_type: 'vip',
      type: type,
      time: time
    }).then(res => {
      wx.requestPayment({
        timeStamp: res.data.wechat_data.timeStamp.toString(),
        nonceStr: res.data.wechat_data.nonceStr,
        package: res.data.wechat_data.package,
        signType: res.data.wechat_data.signType,
        paySign: res.data.wechat_data.paySign,
        success(res) {
          if (res.errMsg == 'requestPayment:ok') {
            wx.showToast({
              title: '支付成功',
              icon: "none"
            })
            let userInfo = wx.getStorageSync('userInfo');
            API.isSignIn({}, {
              uid: userInfo.user_id
            }).then(res => {
              if (res.message == '已登录') {
                wx.setStorageSync('loginToken', res.data.login_token);
                wx.setStorageSync('userInfo', res.data.user);
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 2,
                  })
                }, 1200);
              }
            })
          } else {
            wx.showToast({
              title: res.errMsg,
              icon: "none"
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '支付失败',
            icon: "none"
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPrice()
    let type = options.type
    switch (type) {
      case 'qiming':
        this.setData({
          typeindex: 'qiming',
          checkindex: 0,
          type: '起名会员'
        })
        break;
      case 'ceming':
        this.setData({
          typeindex: 'ceming',
          checkindex: 0,
          type: '测名会员'
        })
        break;
      case 'gongsiqiming':
        this.setData({
          typeindex: 'business_qiming',
          checkindex: 0,
          type: '公司会员'
        })
        break;
      default:
        break;
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.setData({
        loading: false,
      });
    }, 500);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo:userInfo
    })
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
  // onShareAppMessage: function () {

  // }
})
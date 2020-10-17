// pages/cashOut/cashOut.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    bank: '',
    account: '',
    amount: '',
    show: false,
    actions: [{
      name: '微信'
    }, {
      name: '支付宝'
    }, {
      name: '中国银行'
    }]
  },
  // 获取姓名
  getName(e) {
    this.setData({
      name: e.detail
    })
  },
  // 获取账号
  getAccount(e) {
    this.setData({
      account: e.detail
    })
  },
  // 获取金额
  getAmount(e) {
    this.setData({
      amount: e.detail
    })
  },
  showPopupFun(e) {
    console.log(123)
    this.setData({
      show: true
    });
  },
  closePopupFun() {
    this.setData({
      show: false
    });
  },
  onSelect(e) {
    this.setData({
      bank: e.detail.name,
      show: false
    })
  },
  cashOut() {
    let param = {
      bank_user_name: this.data.name,
      bank_name: this.data.bank,
      bank_card: this.data.account,
      amount: this.data.amount
    }
    if (param.bank_user_name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false
    } else if (param.bank_name == '') {
      wx.showToast({
        title: '请选择支付方式',
        icon: 'none'
      })
      return false
    } else if (param.bank_card == '') {
      wx.showToast({
        title: '请填写账号',
        icon: 'none'
      })
      return false
    } else if (param.amount == '') {
      wx.showToast({
        title: '请填写金额',
        icon: 'none'
      })
      return false
    } else {
      API.cashOut(param).then(res => {
        wx.showToast({
          title: res.message,
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000);
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // onShareAppMessage: function () {

  // }
})
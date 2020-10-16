// pages/myWallet/myWallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:''
  },
  // 申请提现
  cashOut() {
    wx.navigateTo({
      url: '../cashOut/cashOut',
    })
  },
  // 申请提现记录
  cashOutList() {
    wx.navigateTo({
      url: '../cashOutList/cashOutList',
    })
  },
  // 交易记录
  transaction() {
    wx.navigateTo({
      url: '../transaction/transaction',
    })
  },
  // 开通会员
  openVip(){
    wx.navigateTo({
      url: '../vip/vip',
    })
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
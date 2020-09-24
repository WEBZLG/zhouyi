// pages/nameDetailMaster/nameDetailMaster.js
const API = require('../../utils/api');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    loading: true,
    show: false,
    concat: ''
  },
  onConsult() {
    API.getContace({}).then(res => {
      console.log(res)
      this.setData({
        concat:res.data,
        show: true
      });
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param = JSON.parse(options.param)
    console.log(param)
    this.setData({
      content: param
    })
    wx.setNavigationBarTitle({
      title: param.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 1000);
  },
  // 跳转大师起名
  onMasterName(){
    let content = JSON.stringify(this.data.content)
    wx.navigateTo({
      url: '../masterNameFill/masterNameFill?content='+content,
    })
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
const { array } = require("../../utils/md5")

// pages/nameDetail/nameDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    total:'',
    wuxing:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let content = JSON.parse(options.content)
    console.log(content.wuxing_strong)
    let total = 0
    let wuxing = new Array()
    for (var prop in content.wuxing_strong) {
      if (content.wuxing_strong.hasOwnProperty(prop)) {
        let val = content.wuxing_strong[prop]
        total = total + val
        let obj = {
          title:prop,
          num:val
        }
        wuxing.push(obj)
      }
    }
    this.setData({
      content: content,
      wuxing:wuxing,
      total:total
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
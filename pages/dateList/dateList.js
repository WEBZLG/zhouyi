// pages/dateList/dateList.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit:20,
    dataList: []
  },
  //详情
  onDetail(e) {
    let changeDate = e.currentTarget.dataset.time
    wx.navigateTo({
      url: '../magicDetail/magicDetail?changeDate=' + changeDate
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let param = JSON.parse(options.param)
    API.search(param).then(res => {
      _this.setData({
        dataList: res.data.times
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
    let totalLenth = this.data.dataList.length
    if(this.data.limit<totalLenth){
      this.setData({
        limit:this.data.limit*1+20
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})
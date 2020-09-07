// pages/myRecommend/myRecommend.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendList:[]
  },
  // 我的推荐
  getRecommend(page){
    let _this = this
    API.myRecommend({
      page:page,
      page_size:15
    }).then(res=>{
      _this.setData({
        recommendList:res.data.users
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommend(1)
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
    this.getRecommend(1)
    this.setData({
      page:1
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let _this = this
    this.setData({
      page:_this.data.page
    })
    this.getRecommend(page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
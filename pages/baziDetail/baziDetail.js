// pages/baziDetail/baziDetail.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    loading:true
  },
  getData(param){
    let _this = this
    API.baziDetail({
      real_name:param.name,
      sex:param.sex,
      time:param.time
    }).then(res=>{
      if(res.data==''){
        wx.showToast({
          title: '暂无排盘',
          icon:'none'
        })
        return false;
      }
      _this.setData({
        content:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param = JSON.parse(options.param)
    this.getData(param)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      loading:false
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
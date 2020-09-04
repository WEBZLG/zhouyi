// pages/magicDetail/magicDetail.js
const API = require('../../utils/api');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false,//弹窗控制显隐
    specialData:'',//返回参数
    specialContent:[],
    sudoku:'',//排盘重组
    loading:true
  },
  // 弹窗显示触发
  showPopup(e) {
    let content = e.currentTarget.dataset.content
    this.setData({ show: true,specialContent: content});
  },
  // 弹窗关闭触发
  onClose() {
    this.setData({ show: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let param = JSON.parse(options.param) 
    let sudoku = JSON.parse(options.sudoku) 
    this.setData({
      specialData:param,
      sudoku:sudoku
    })
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
  onShareAppMessage: function () {

  }
})
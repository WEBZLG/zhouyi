// pages/masterName/masterName.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:[],
    loading: true,
  },
  // 获取列表
  getData(){
    API.masterName({}).then(res=>{
      this.setData({
        content:res.data
      })
    })
  },
  // 详情
  onDetail(e){
    let param = JSON.stringify(e.currentTarget.dataset.content)
    wx.navigateTo({
      url: '../nameDetailMaster/nameDetailMaster?param='+param,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.setData({
        loading:false
      })
    }, 500);
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
  onShareAppMessage: function (res) {
    var that = this;
    let code = wx.getStorageSync('userInfo').p_code;
    if (code == undefined) {
      code = ''
    }
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '名师起名',
      path: '/pages/naming/naming?p=' + code
    }
  },
})
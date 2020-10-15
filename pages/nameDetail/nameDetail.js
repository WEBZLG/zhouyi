
// pages/nameDetail/nameDetail.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    total:'',
    wuxing:[],
    param:'',
    isOrder:false,
    loading: true,
    userInfo:''
  },
  // 查看更多
  onView(){
    let _this = this
    wx.navigateTo({
      url: '../vip/vip?type='+'qiming',
    })
  },
  getData(param){
    API.babyName(param).then(res=>{
      let total = 0
      let wuxing = new Array()
      for (var prop in res.data.wuxing_strong) {
        if (res.data.wuxing_strong.hasOwnProperty(prop)) {
          let val = res.data.wuxing_strong[prop]
          total = total + val
          let obj = {
            title:prop,
            num:val
          }
          wuxing.push(obj)
        }
      }
      this.setData({
        content: res.data,
        wuxing:wuxing,
        loading: false,
        total:total
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param = JSON.parse(options.param)
    this.setData({
      param:param
    })
    this.getData(param);
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
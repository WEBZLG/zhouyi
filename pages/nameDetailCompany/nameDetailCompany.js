// pages/nameDetailCompany/nameDetailCompany.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    wuxing:[],
    isOrder:false,
    param:'',
    userInfo:'',
    total:''
  },
  getData(param){
    API.companyName(param).then(res=>{
      let wuxing = new Array()
      let total = 0
      for (var prop in res.data.wuxingfenxi) {
        if (res.data.wuxingfenxi.hasOwnProperty(prop)) {
          let val = res.data.wuxingfenxi[prop]
          total = total + val
          let obj = {
            title:prop,
            num:val
          }
          wuxing.push(obj)
        }
      }
      this.setData({
        content:res.data,
        wuxing:wuxing,
        total:total
      })
    })
  },
    // 查看更多
    onView(){
      let _this = this
      wx.navigateTo({
        url: '../vip/vip?type='+'gongsiqiming',
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param = JSON.parse(options.param);
    this.getData(param);
    this.setData({
      param:param
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
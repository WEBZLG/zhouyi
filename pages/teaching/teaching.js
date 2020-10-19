// pages/teaching/teaching.js
const API = require('../../utils/api');
const UTIL = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    article:'',
    id:'',
    title:''
  },
  getContent(id){
    var that = this;
    API.teachingListDetail({},id).then(res=>{
      // let article = UTIL.formatRichText(res.data.content.content)
      let article = res.data.content.content
      this.setData({
        article:article,
        content:res.data.content
      })
      WxParse.wxParse('article', 'html', article, that, 5);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.p) {
      let code = options.p
      wx.setStorageSync('p_code', code);
    }else{
      wx.setStorageSync('p_code', '');
    }
    let id = options.id
    let title = options.title
    this.setData({
      id:id,
      title:title
    })
    if(title){
      wx.setNavigationBarTitle({
        title: title
      })
    }
    this.getContent(id)
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
      title: this.data.title,
      path: '/pages/teaching/teaching?p=' + code+'&id='+this.data.id
    }
  },
  onShareTimeline(res) {
    let code = wx.getStorageSync('userInfo').p_code;
    if (code == undefined) {
      code = ""
    }
    return {
      title: this.data.title,
      query: {
        p: code,
        id:this.data.id
      },
    }
  }
})
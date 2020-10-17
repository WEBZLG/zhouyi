// pages/baziDetail/baziDetail.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    loading:true,
    param:''
  },
  getData(param){
    let _this = this
    API.baziDetail({
      // real_name:param.name,
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
    this.setData({
      param:options.param
    })
    let param = JSON.parse(options.param)
    this.getData(param)
    if (options.p) {
      let code = options.p
      wx.setStorageSync('p_code', code);
    }else{
      wx.setStorageSync('p_code', '');
    }
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
      title: '排盘详情',
      path: '/pages/baziDetail/baziDetail?p=' + code+'&param='+this.data.param
    }
  },
  onShareTimeline(res) {
    let code = wx.getStorageSync('userInfo').p_code;
    if (code == undefined) {
      code = ""
    }
    return {
      title: '排盘详情',
      query: {
        p: code,
        param:this.data.param
      },
    }
  }
})
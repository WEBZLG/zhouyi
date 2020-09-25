// pages/live/live.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
  },
  getData(){
    API.liveList({}).then(res=>{
      this.setData({
        dataList:res.data.room_info
      })
    })
  },
  goTv(e){
    let roomId = e.currentTarget.dataset.roomid
    // let customParams = encodeURIComponent(JSON.stringify({ path: 'pages/index/index', pid: 3 })) 
    wx.navigateTo({
        // url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`
        url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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
    this.getData()
    wx.stopPullDownRefresh();
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
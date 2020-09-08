// pages/master/master.js
const API = require('../../utils/api');
const AREA = require('../../utils/area');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province:'黑龙江省',
    city:'哈尔滨市',
    area:'',
    show:false,
    areaList:AREA.default,
    loading:true,
    areaText:'',
    fileList: []
  },
  afterRead(event) {
    let _this = this
    API.uploadImgs({
      'file_name': 'certificate'
    }, event.detail.file).then(res => {
      console.log(res)
    })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onConfirm(e){
    this.setData({
      areaText:e.detail.values[1].name+e.detail.values[2].name,
      province:e.detail.values[0].name,
      city:e.detail.values[1].name,
      area:e.detail.values[2].name
    })
    this.onClose();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function () {

  }
})
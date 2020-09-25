// pages/goodsDetail/goodsDetail.js
const API = require('../../utils/api');
const UTIL = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL, //图片路径
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: '2000',
    duration: 500,
    imgUrl: API.IMG_BASE_URL,
    dataList:'',
    article:'',
    show: false
  },

  getData(id){
    API.goodsDetail({},id).then(res=>{
      let article = UTIL.formatRichText(res.data.goods.description)
      this.setData({
        article:article,
        dataList:res.data.goods
      })
    })
  },
  onConsult() {
    API.getContace({}).then(res => {
      console.log(res)
      this.setData({
        concat:res.data,
        show: true
      });
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.getData(id)
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
  // onShareAppMessage: function () {

  // }
})
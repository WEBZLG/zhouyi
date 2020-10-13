// pages/shopping/shopping.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL,
    dataList:[],
    loading: true,
    active: 0,
    goodsType:''
  },
  onDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id='+id,
    })
  },
  getGoodsType(){
    let _this = this
    API.goodsType({}).then(res=>{
      this.setData({
        goodsType: Object.assign({0:'全部'}, res.data.goods_type),
      })
    })
  },
  getData(type){
    API.goodsList({
      goods_type:type
    }).then(res=>{
      this.setData({
        dataList:res.data.goods
      })
    })
  },
  onChange(event) {
    this.getData(event.detail.name)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsType()
    this.getData(0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.setData({
        loading: false,
      });
    }, 1000);
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
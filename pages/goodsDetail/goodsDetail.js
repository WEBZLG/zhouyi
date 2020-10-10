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
    show: false,
    firmInfo:''
  },

  getData(id){
    API.goodsDetail({},id).then(res=>{
      let article = UTIL.formatRichText(res.data.goods.description)
      this.setData({
        article:article,
        dataList:res.data.goods,
        firmInfo:{
          id:res.data.goods.id,
          goods_name:res.data.goods.goods_name,
          thumb_pic:res.data.goods.thumb_pic,
          price:res.data.goods.price
        }
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
  // 去购买
  buyNow(){
    let info = JSON.stringify(this.data.firmInfo)
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo == '' || userInfo == undefined) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      API.isSignIn({}, {
          uid: userInfo.user_id
        })
        .then(res => {
          if (res.message == '已登录') {
            wx.setStorageSync('loginToken', res.data.login_token);
            wx.setStorageSync('userInfo', res.data.user);
            wx.navigateTo({
              url: '../orderFirm/orderFirm?info='+info,
            })
          } else {
            wx.showToast({
              title: 'res.message',
              icon: "none"
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '../login/login',
              })
            }, 1000);
          }
        })
      }
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
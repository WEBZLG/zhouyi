// pages/chengyue/chengyue.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL, //图片路径
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    iconNav: [{
      imgPath: '../../images/wzjs.png',
      title: "网站建设",
      url: "../webs/webs"
    },
    {
      imgPath: '../../images/xcx.png',
      title: "小程序",
      url: "../routine/routine"
    },
    {
      imgPath: '../../images/app.png',
      title: "APP研发",
      url: "../appBuild/appBuild"
    },
    {
      imgPath: '../../images/cdjy.png',
      title: "城德教育",
      url: "../education/education"
    },
    {
      imgPath: '../../images/wltg.png',
      title: "网络推广",
      url: "../extension/extension"
    },
    {
      imgPath: '../../images/itpx.png',
      title: "IT培训",
      url: "../train/train"
    }
  ]
  },
  // 获取轮播图
  getCarouselData() {
    let _this = this
    API.carousel({})
      .then(res => {
        //console.log(res)
        _this.setData({
          background: res.data.carousels
        })
      })
  },
  onPage(e){
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarouselData()
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
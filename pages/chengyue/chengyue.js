// pages/chengyue/chengyue.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: '3000',
    duration: 500,
    imgUrl: API.IMG_BASE_URL, //图片路径
    background: ['/images/b1.jpg', '/images/b2.jpg'],
    loading:true,
    phone:'',
    iconNav: [{
      id:5,
      imgPath: '../../images/wzjs.png',
      title: "网站建设"
    },
    {
      id:6,
      imgPath: '../../images/xcx.png',
      title: "小程序"
    },
    {
      id:7,
      imgPath: '../../images/app.png',
      title: "APP研发"
    },
    {
      id:8,
      imgPath: '../../images/cdjy.png',
      title: "城德教育"
    },
    {
      id:9,
      imgPath: '../../images/wltg.png',
      title: "网络推广"
    },
    {
      id:10,
      imgPath: '../../images/itpx.png',
      title: "IT培训"
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
          background: res.data.carousels,
          interval:res.data.carousel_interval
        })
      })
  },
  onPage(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../teaching/teaching?id='+id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCarouselData()
    this.getPhone()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      loading:false
    })
  },
  // 打电话
  onPhone(e){
    // let phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  // 打电话
  getPhone() {
    API.getContace({}).then(res=>{
      this.setData({
        phone:res.data.teach_service_mobile
      })
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
  // onShareAppMessage: function () {

  // }
})
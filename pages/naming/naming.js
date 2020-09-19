// pages/naming/naming.js
const API = require('../../utils/api');
const UTIL = require('../../utils/util.js')
const AREA = require('../../utils/area');
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
    areaList: AREA.default,
    background: ['/images/bbqmbanner.jpg'],
    loading: true,
    surname: '',
    sex: '1',
    show: false,
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    chooseAddress: '请选择出生地',
    chooseTime: '',
    iconNav: [{
        id: 1,
        imgPath: '../../images/bbqm.png',
        title: "宝宝起名"
      },
      {
        id: 2,
        imgPath: '../../images/bzqm.png',
        title: "起名"
      },
      {
        id: 3,
        imgPath: '../../images/gsqm.png',
        title: "公司起名"
      },
      {
        id: 4,
        imgPath: '../../images/dsqm.png',
        title: "大师起名"
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
          interval: res.data.carousel_interval
        })
      })
  },

  // 跳转
  onPage(e) {
    let id = e.currentTarget.dataset.id
    switch (id) {
      case 1:
        wx.navigateTo({
          url: '../babyName/babyName'
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../publicName/publicName'
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../companyName/companyName'
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../masterName/masterName'
        })
        break;
    }
  },

  showPopup() {
    this.setData({
      show: true
    });
  },
  showAddressPopup() {
    this.setData({
      addressShow: true
    });
  },
  onClose() {
    this.setData({
      show: false,
      addressShow: false
    });
  },
  // 时间选择
  onInput(event) {
    this.setData({
      currentDate: event.detail,
      chooseTime: UTIL.timestampToTime(event.detail),
      show: false
    });
  },
  // 获取姓
  getName(e) {
    this.setData({
      surname: e.detail
    })
  },
  // 获取性别
  onChange(event) {
    this.setData({
      sex: event.detail,
    });
  },
  //获取地点
  onConfirm(e) {
    this.setData({
      chooseAddress: e.detail.values[0].name + e.detail.values[1].name + e.detail.values[2].name,
    })
    this.onClose();
  },

  onSubmit(){
    let param = {
      surname:this.data.surname,
      sex:this.data.sex,
      time:this.data.chooseTime,
      address:this.data.chooseAddress
    }
    if(param.surname==''){
      wx.showToast({
        title: '请输入姓氏',
        icon:'none'
      })
      return false
    }else if(param.address=='请选择出生地'){
      wx.showToast({
        title: '请选择出生地',
        icon:'none'
      })
      return false
    }else{
      param = JSON.stringify(param)
      wx.navigateTo({
        url: '../babyName/babyName?param='+param,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCarouselData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      loading: false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      currentDate: new Date().getTime(),
      chooseTime: UTIL.timestampToTime(new Date().getTime())
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
  // onShareAppMessage: function () {

  // }
})
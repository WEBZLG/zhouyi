// pages/babyName/babyName.js
const API = require('../../utils/api');
const UTIL = require('../../utils/util.js')
const AREA = require('../../utils/area');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    character:'',
    imgUrl: API.IMG_BASE_URL, //图片路径
    areaList: AREA.default,
    loading: true,
    surname: '',
    sex: '1',
    show: false,
    characterShow:false,
    addressShow:false,
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    chooseAddress: '',
    chooseTime: '',
    radio: '1',
    icon: {
      normal1: '../../images/shou1.png',
      active1: '../../images/shou2.png',
      normal2: '../../images/mo1.png',
      active2: '../../images/mo2.png',
    },
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
  showCharacterPopup() {
    this.setData({
      characterShow: true
    });
  },
  onClose() {
    this.setData({
      show: false,
      addressShow: false,
      characterShow:false
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
  // 获取姓
  getDing(e) {
    this.setData({
      ding: e.detail==1?'首':'末'
    })
  },
  // 获取性别
  onChange(event) {
    this.setData({
      sex: event.detail,
    });
  },
  onChangeDing(event){
    this.setData({
      radio: event.detail,
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
      sex:this.data.sex==1?'男':'女',
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
    if(options.param){

    }
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
    // this.setData({
    //   currentDate: new Date().getTime(),
    //   chooseTime: UTIL.timestampToTime(new Date().getTime())
    // })
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
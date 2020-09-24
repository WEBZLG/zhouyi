// pages/companyName/companyName.js
const API = require('../../utils/api');
const UTIL = require('../../utils/util.js')
const AREA = require('../../utils/area');
const DATA = require('../../utils/data');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityShow: false,
    industryShow: false,
    addressShow: false,
    chooseCity: '',
    chooseIndustry: '',
    chooseAddress: '',
    name: '',
    sex: '1',
    birth: '',
    postTime: '',
    areaList: AREA.default,
    industryList: DATA.INDUSTRY_LIST
  },
  checkMark(e) {
    let name = e.currentTarget.dataset.name;
    this.setData({
      chooseIndustry: name
    })
    this.onClose()
  },
  showPopup(e) {
    let type = e.currentTarget.dataset.type;
    switch (type) {
      case 'city':
        this.setData({
          cityShow: true,
        });
        break;
      case 'industry':
        this.setData({
          industryShow: true,
        });
        break;
      case 'address':
        this.setData({
          addressShow: true,
        });
        break;
    }
  },
  onClose() {
    this.setData({
      cityShow: false,
      industryShow: false,
      addressShow: false
    });
  },
  // 带时辰（不需要确认）
  showDatepicker(event) {
    // 获取日期组件对象实例，并初始化配置
    this.selectComponent("#ruiDatepicker").init({
      date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
      hour: new Date().getHours(),
      min: new Date().getMinutes(),
      confirm: false
    });
    // this.showPopup()
  },
  dateConfirm(event) {
    let json = {};
    json['date'] = event.detail.year + '-' + event.detail.month + '-' + event.detail.day;
    json['hour'] = event.detail.hour;
    json['min'] = event.detail.min;
    json['dateStr'] = event.detail.thisStr;
    // 更新数据
    this.setData(json);
    let chooseDate = event.detail.year + '-' + event.detail.month + '-' + event.detail.day + ' ' + (event.detail.hour < 10 ? '0' + event.detail.hour : event.detail.hour) + ':' + (event.detail.min < 10 ? '0' + event.detail.min : event.detail.min);
    this.setData({
      show: false,
      birth: event.detail.thisStr,
      postTime: chooseDate,
      isLunar: event.detail.lastTab == 'lunar' ? true : false
    })
  },
  // 获取姓
  getName(e) {
    this.setData({
      name: e.detail
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
    console.log(e)
    let type = e.currentTarget.dataset.type;
    switch (type) {
      case 'city':
        this.setData({
          chooseCity: e.detail.values[1].name
        });
        break;
      case 'industry':
        this.setData({
          chooseIndustry: '',
        });
        break;
      case 'address':
        this.setData({
          chooseAddress: e.detail.values[0].name + e.detail.values[1].name + e.detail.values[2].name,
        });
        break;
    }
    this.onClose();
  },
  onSubmit() {
    let param = {
      city: this.data.chooseCity,
      trade: this.data.chooseIndustry,
      address: this.data.chooseAddress,
      real_name: this.data.name,
      sex: this.data.sex == 1 ? '男' : '女',
      time: this.data.postTime,
      order_no:''
    }
    if (param.city == '') {
      wx.showToast({
        title: '请选择城市',
        icon: 'none'
      })
      return false;
    } else if (param.trade == '') {
      wx.showToast({
        title: '请选择行业',
        icon: 'none'
      })
      return false;
    } else if (param.real_name == '') {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return false;
    }else if (param.time == '') {
      wx.showToast({
        title: '请选择出生时间',
        icon: 'none'
      })
      return false;
    }else if (param.address == '') {
      wx.showToast({
        title: '请选择出生地点',
        icon: 'none'
      })
      return false;
    }else {
      param = JSON.stringify(param)
      wx.navigateTo({
        url: '../nameDetailCompany/nameDetailCompany?param='+param,
      })
    }
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
  // onShareAppMessage: function () {

  // }
})
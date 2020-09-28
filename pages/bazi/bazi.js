// pages/bazi/bazi.js
const UTIL = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    hour:'',
    min:'',
    name: '',
    sex: '1',
    show: false,
    dateStr3: '请选择时间',
    chooseDate:'',
    minDate: new Date(1901, 1, 1).getTime(),
    maxDate: new Date(2099, 12, 31).getTime(),
    currentDate: new Date().getTime(),
  },
  // 时间选择
  onInput(event) {
    this.setData({
      currentDate: event.detail,
      chooseTime: UTIL.timestampToTime(event.detail),
      show: false
    });
  },
  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  // 获取姓名
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
  // 带时辰（不需要确认）
  showDatepicker3(event) {
    // 获取日期组件对象实例，并初始化配置
    this.selectComponent("#ruiDatepicker").init({
      date: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
      hour: new Date().getHours(),
      min:new Date().getMinutes(),
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
    let chooseDate =  event.detail.year + '-' + event.detail.month + '-' + event.detail.day+' '+(event.detail.hour<10?'0'+event.detail.hour:event.detail.hour)+':'+ (event.detail.min<10?'0'+event.detail.min:event.detail.min);
    this.setData({
      chooseDate:chooseDate,
      show: false,
      dateStr3:event.detail.thisStr
    })
  },
  onSubmit() {
    let _this = this
    let param = {
      sex: _this.data.sex == 1 ? '男' : '女',
      name: _this.data.name,
      time: _this.data.chooseDate
    }
    // if (param.name == '') {
    //   wx.showToast({
    //     title: '请输入姓名',
    //     icon: 'none'
    //   })
    //   return false
    // }else 
    if (param.time == '请选择生辰') {
      wx.showToast({
        title: '请选择生辰',
        icon: 'none'
      })
      return false
    }else {
      wx.navigateTo({
        url: '../baziDetail/baziDetail?param=' + JSON.stringify(param),
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
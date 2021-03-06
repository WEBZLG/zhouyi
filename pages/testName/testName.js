// pages/textName/textName.js
const API = require('../../utils/api');
const UTIL = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL, //图片路径
    background: ['/images/ceming.jpg'],
    surname: '',
    sex: '1',
    marriage: '0',
    children: '0',
    show: false,
    dateStr3: '请选择时间',
    chooseDate: '', //选择后日期
    postDate: '', //传送到下页数据
    isLunar: true, //是否是农历
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
  // 带时辰（不需要确认）
  showDatepicker3(event) {
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
      chooseDate: chooseDate,
      show: false,
      dateStr3: event.detail.thisStr,
      postDate: event.detail.thisStr,
      isLunar: event.detail.lastTab == 'lunar' ? true : false
    })
  },
  // 获取姓
  getName(e) {
    this.setData({
      surname: e.detail
    })
  },
  // 获取性别
  onChangeSex(event) {
    this.setData({
      sex: event.detail,
    });
  },
  // 获取婚姻状况
  onChangeMarriage(event) {
    this.setData({
      marriage: event.detail,
    });
  },
  // 获取子女状况
  onChangeChildren(event) {
    this.setData({
      children: event.detail,
    });
  },
    // 验证登录
    isSign() {
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
              this.onSubmit()
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
  onSubmit() {
    let surname = this.data.surname
    let sex = this.data.sex
    let marriage = this.data.marriage
    let children = this.data.children
    let chooseDate = this.data.chooseDate
    let param = {
      surname: surname,
      sex: sex == 1 ? '男' : '女',
      marriage: marriage,
      children: children,
      chooseDate: chooseDate
    }
    if (surname == '') {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return false;
    } else if (!API.isChinese(surname)) {
      wx.showToast({
        title: '请输入汉字',
        icon: 'none'
      })
    } else if (chooseDate == '') {
      wx.showToast({
        title: '请选择出生日期',
        icon: 'none'
      })
      return false;
    } else {
      let params = JSON.stringify(param)
      wx.navigateTo({
        url: '../testNameDetail/testNameDetail?param=' + params,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.p) {
      let code = options.p
      wx.setStorageSync('p_code', code);
    }else{
      wx.setStorageSync('p_code', '');
    }
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
  onShareAppMessage: function (res) {
    var that = this;
    let code = wx.getStorageSync('userInfo').p_code;
    if (code == undefined) {
      code = ''
    }
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '测名',
      path: '/pages/testName/testName?p=' + code
    }
  },
  onShareTimeline(res) {
    let code = wx.getStorageSync('userInfo').p_code;
    if (code == undefined) {
      code = ""
    }
    return {
      title: '测名',
      query: {
        p: code
      },
    }
  }
})
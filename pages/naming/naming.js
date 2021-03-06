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
    dateStr3: '请选择时间',
    chooseDate: '', //选择后日期
    postDate: '', //传送到下页数据
    isLunar: true, //是否是农历
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    chooseAddress: '请选择出生地',
    chooseTime: '',
    iconNav: [{
        id: 1,
        imgPath: '../../images/bbqm.png',
        title: "起名改名"
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
            switch (id) {
              case 1:
                wx.navigateTo({
                  url: '../babyName/babyName'
                })
                break;
              case 2:
                wx.navigateTo({
                  url: '../testName/testName'
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
  // 新华字典
  dictionary() {
    wx.navigateTo({
      url: '../dictionary/dictionary',
    })
  },
  // 百家姓
  familyNames() {
    wx.navigateTo({
      url: '../familyNames/familyNames',
    })
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
    let param = {
      surname: this.data.surname,
      sex: this.data.sex,
      time: this.data.chooseDate,
      postDate: this.data.postDate,
      address: this.data.chooseAddress,
      isLunar: this.data.isLunar
    }
    if (param.surname == '') {
      wx.showToast({
        title: '请输入姓氏',
        icon: 'none'
      })
      return false
    } else if (!API.isChinese(param.surname)) {
      wx.showToast({
        title: '请输入汉字',
        icon: 'none'
      })
    } else if (param.time == '') {
      wx.showToast({
        title: '请选择时间',
        icon: 'none'
      })
      return false
    } else if (param.address == '请选择出生地') {
      wx.showToast({
        title: '请选择出生地',
        icon: 'none'
      })
      return false
    } else {
      param = JSON.stringify(param)
      wx.navigateTo({
        url: '../babyName/babyName?param=' + param,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCarouselData()
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
      title: '名师起名',
      path: '/pages/naming/naming?p=' + code
    }
  },
  onShareTimeline(res) {
    let code = wx.getStorageSync('userInfo').p_code;
    if (code == undefined) {
      code = ""
    }
    return {
      title: '名师起名',
      query: {
        p: code
      },
    }
  }
})
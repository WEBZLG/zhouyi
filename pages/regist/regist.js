// pages/regist/regist.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    phone: '', //手机号
    password: '', //密码
    code: '', //验证码
    codename: '获取验证码',
    disabled: false,
    invitationCode: '' //邀请码
  },
  //获取input输入框的值
  getPwdValue(e) {
    this.setData({
      password: e.detail
    })
  },
  getPhoneValue(e) {
    this.setData({
      phone: e.detail
    })
  },
  getCodeValue(e) {
    this.setData({
      code: e.detail
    })
  },
  getInvitationCode(e) {
    this.setData({
      code: e.detail
    })
  },
  //获取验证码
  getCode() {
    let _this = this;
    let myreg = /^(14[0-9]|13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      API.regist({
          mobile: _this.data.phone,
          type: 'get_code',
          code: _this.data.code,
          password: _this.data.password,
          p_code: _this.data.invitationCode
        })
        .then(res => {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
          _this.setData({
            disabled: true
          })
          let num = 61;
          let timer = setInterval(function () {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              _this.setData({
                codename: '重新发送',
                disabled: false
              })

            } else {
              _this.setData({
                codename: num + "s"
              })
            }
          }, 1000)
        })
    }
  },
  // 协议
  onAgreement() {
    wx.navigateTo({
      url: '../agreement/agreement',
    })
  },
  // 阅读协议
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  //提交表单信息
  onRegist() {
    let myreg = /^(14[0-9]|13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    let _this = this
    if (_this.data.checked == false) {
      wx.showToast({
        title: '注册前请阅读用户协议并勾选',
        icon: 'none'
      })
      return false;
    } else if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            API.regist({
                mobile: _this.data.phone,
                type: '',
                code: _this.data.code,
                password: _this.data.password,
                p_code: _this.data.invitationCode,
                agreement: 1,
                wechat_code: res.code
              })
              .then(res => {
                //console.log(res)
                wx.showToast({
                  title: res.message,
                  icon: 'none'
                })
                wx.setStorageSync('loginToken', res.data.login_token);
                wx.setStorageSync('userInfo', res.data.user);
                wx.reLaunch({
                  url: '../home/home',
                })
              })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let code = wx.getStorageSync('p_code');
    console.log(code)
    if (code&&code!==undefined) {
      _this.setData({
        invitationCode: code
      })
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
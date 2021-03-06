// pages/my/my.js
const API = require('../../utils/api');
const UTIL = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL,
    userInfo: null,
    fileList: [],
    loading: true,
  },
  // 提现
  cashOut(){
    wx.navigateTo({
      url: '../cashOut/cashOut',
    })
  },
  // 会员订单
  vipOrder(){
    wx.navigateTo({
      url: '../vipOrder/vipOrder',
    })
  },
  // 跳转认证
  goCertification() {
    wx.navigateTo({
      url: '../certification/certification',
    })
  },
  // 跳转修改手机号
  goChangePhone() {
    wx.navigateTo({
      url: '../changePhone/changePhone',
    })
  },
  // 跳转修改密码
  goChangePwd() {
    wx.navigateTo({
      url: '../changePwd/changePwd',
    })
  },
  // 跳转我的推荐
  goMyRecommend() {
    wx.navigateTo({
      url: '../myRecommend/myRecommend',
    })
  },
  // 跳转大师
  goMaster() {
    wx.navigateTo({
      url: '../master/master',
    })
  },
  goMasterInfo() {
    let _this = this
    let userInfo = JSON.stringify(_this.data.userInfo)
    wx.navigateTo({
      url: '../masterInfo/masterInfo?userInfo=' + userInfo,
    })
  },
  // 用户协议
  getAgreement() {
    wx.navigateTo({
      url: '../agreement/agreement',
    })
  },
  // 打电话
  getPhone() {
    API.getContace({}).then(res => {
      wx.makePhoneCall({
        phoneNumber: res.data.service_mobile,
      })
    })
  },
  // 系统消息
  getSysMsg() {
    wx.navigateTo({
      url: '../sysMessage/sysMessage',
    })
  },
  // 意见反馈
  getOpinion() {
    wx.navigateTo({
      url: '../opinion/opinion',
    })
  },
  // 开通会员
  account() {
    wx.navigateTo({
      url: '../account/account',
    })
  },
  // 我的订单
  myOrder(){
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  },
  // 我的钱包
  myWallet(){
    wx.navigateTo({
      url: '../myWallet/myWallet',
    })
  },
  // 我的地址
  myAddress(){
    wx.navigateTo({
      url: '../addressList/addressList',
    })
  },
  // 更换头像
  afterRead(event) {
    let _this = this
    const {
      file
    } = event.detail;
    let userInfo = wx.getStorageSync('userInfo');
    let param = {
      change_type: "head",
      user_id: userInfo.user_id,
    }
    // //获取的当前时间戳（10位）
    param.timestamp = Math.round(new Date().getTime() / 1000).toString();
    let token = wx.getStorageSync('loginToken');
    //通过md5加密验签
    param.sign = UTIL.getMD5Sign(param, token)
    wx.uploadFile({
      url: API.API_BASE_URL + '/user/update',
      filePath: file.path,
      name: 'head_img',
      formData: param,
      success(res) {
        let data = JSON.parse(res.data)
        wx.showToast({
          title: data.message,
        })
        _this.setData({
          ['userInfo.head_img']: data.data.head_img
        })
        wx.setStorageSync('userInfo', _this.data.userInfo)
      },
    });
  },
  // 退出登录
  onSignOut() {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function (sm) {
        if (sm.confirm) {
          let token = wx.getStorageSync('loginToken');
          API.signOut({
              user_id: _this.data.userInfo.user_id,
            }, token)
            .then(res => {
              //console.log(res)
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
              wx.clearStorage();
              setTimeout(() => {
                wx.reLaunch({
                  url: '../home/home',
                })
              }, 1000);
            })
        } else if (sm.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  // 获取登录信息
  getMessge(e) {
    let _this = this
    let type = e.target.dataset.type
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo == '' || userInfo == undefined) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            API.isSignIn({}, {
                uid: userInfo.user_id,
                wechat_code: res.code
              })
              .then(res => {
                if (res.message == '已登录') {
                  wx.setStorageSync('loginToken', res.data.login_token);
                  wx.setStorageSync('userInfo', res.data.user);
                  _this.setData({
                    userInfo: res.data.user
                  })
                  switch (type) {
                    case '0':
                      _this.goCertification()
                      break;
                    // case '1':
                    //   _this.goChangePhone()
                    //   break;
                    // case '2':
                    //   _this.goChangePwd()
                    //   break;
                    case '3':
                      _this.goMyRecommend()
                      break;
                    case '4':
                      _this.goMaster()
                      break;
                    case '5':
                      _this.goMaster()
                      break;
                    case '6':
                      _this.goVip()
                      break;
                    case '7':
                    _this.myOrder()
                    break;
                    case '8':
                    _this.myAddress()
                    break;
                    case '9':
                    _this.account()
                    break;
                    case '10':
                    _this.myWallet()
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
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },

  // 获取更新信息
  upMessge() {
    let _this = this
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
          //console.log(res)
          if (res.message == '已登录') {
            wx.setStorageSync('loginToken', res.data.login_token);
            wx.setStorageSync('userInfo', res.data.user);
            this.setData({
              userInfo: res.data.user
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
  // 跳转登录页
  onLogin() {
    wx.redirectTo({
      url: '../login/login',
    })
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
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 500);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    this.upMessge()
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
    let code =  wx.getStorageSync('userInfo').p_code;
    if(code==undefined){
      code=''
    }
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '名师起名',
      path: '/pages/home/home?p='+code
    }
  },
  onShareTimeline(res){
    let code =  wx.getStorageSync('userInfo').p_code;
    if(code==undefined){
      code=""
    }
    return {
      title: '名师起名',
      query: {
        p: code
      },
    }
  }
})
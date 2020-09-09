// pages/home/home.js
const API = require('../../utils/api');
const AREA = require('../../utils/area');
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL, //图片路径
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    page:1,
    province:'黑龙江省',
    city:'哈尔滨市',
    area:'',
    latitude: '',
    longitude: '',
    show:false,
    areaList:AREA.default,
    loading:true,
    areaText:'',
    iconNav: [{
        imgPath: '../../images/qimen.png',
        title: "奇门",
        url: "../magic/magic"
      },
      {
        imgPath: '../../images/jiaoxue.png',
        title: "奇门教学",
        url: "../teaching/teaching"
      },
      {
        imgPath: '../../images/qiming.png',
        title: "起名",
        url: "../naming/naming"
      },
      {
        imgPath: '../../images/bazi.png',
        title: "八字",
        url: "../bazi/bazi"
      },
      {
        imgPath: '../../images/fengshui.png',
        title: "风水",
        url: "../fengshui/fengshui"
      },
      {
        imgPath: '../../images/chengyue.png',
        title: "城约科技",
        url: "../chengyue/chengyue"
      }

    ]
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onConfirm(e){
    this.setData({
      areaText:e.detail.values[1].name+e.detail.values[2].name,
      province:e.detail.values[0].name,
      city:e.detail.values[1].name,
      area:e.detail.values[2].name
    })
    this.getMaster('1',e.detail.values[0].name,e.detail.values[1].name,e.detail.values[2].name)
    this.onClose();
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
  // 奇门
  onMagic(e) {
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
          if (res.message == '已登录') {
            wx.setStorageSync('loginToken', res.data.login_token);
            wx.setStorageSync('userInfo', res.data.user);
            let url = e.currentTarget.dataset.url
            wx.navigateTo({
              url: url
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
            }, 3000);
          }
        })
    }
  },
  // 大师推荐
  getMaster(page,province,city,area) {
    let _this = this
    API.master({
      page:page,
      page_size:'15',
      province:province,
      city:city,
      area:area
    }).then(res => {
      //console.log(res)
      _this.setData({
        masterList:res.data.users
      })
    })
  },
  // 获取位置
  getUserLocation: function () {
    let _this = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      _this.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          _this.getLocation();
        } else {
          //调用wx.getLocation的API
          _this.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        _this.getLocal(latitude, longitude)
      },
      fail: function (res) {
        //console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let _this = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        //console.log('getLocal')
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        let area = res.result.ad_info.district
        _this.setData({
          province: province,
          city: city,
          area:area,
          latitude: latitude,
          longitude: longitude,
          areaText:city+area
        })
        _this.getMaster('1',_this.data.province,_this.data.city,_this.data.area)
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarouselData() //轮播
    qqmapsdk = new QQMapWX({
      key: 'OQYBZ-GMQKD-X3I4Q-H4YNU-3TDQ5-PWFAQ' //自己的key秘钥
    });
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
    this.getUserLocation();


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
    let _this = this
    this.setData({
      page:1
    })
    this.getMaster('1',_this.data.province,_this.data.city,_this.data.area)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let _this = this
    this.setData({
      page:_this.data.page*1 + 1
    })
    this.getMaster(_this.data.page,_this.data.province,_this.data.city,_this.data.area)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
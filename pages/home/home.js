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
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: '',
    duration: 500,
    page: 1,
    province: '',
    city: '',
    area: '',
    latitude: '',
    longitude: '',
    show: false,
    areaList: AREA.default,
    loading: true,
    areaText: '',
    canvasShow: true,
    codeShow: false,
    iconNav: [
      {
        id: 8,
        imgPath: '../../images/ceming.png',
        title: "测名",
        url: "../testName/testName"
      },
      {
        id: 7,
        imgPath: '../../images/qiming.png',
        title: "起名",
        url: "../naming/naming"
      },
      {
        id: 0,
        imgPath: '../../images/qimen.png',
        title: "奇门起局",
        url: "../magic/magic"
      },
      {
        id: 6,
        imgPath: '../../images/bazi.png',
        title: "八字排盘",
        url: "../bazi/bazi"
      },
      {
        id: 9,
        imgPath: '../../images/lpan.png',
        title: "风水罗盘",
        url: "../luopan/luopan"
      },
      {
        id: 1,
        imgPath: '../../images/jiaoxue.png',
        title: "学习资料",
        url: "../teachingList/teachingList"
      },
      {
        id: 5,
        imgPath: '../../images/chengyue.png',
        title: "城约科技",
        url: "../chengyue/chengyue"
      }
    ]
  },
  onClickShow() {
    this.setData({
      codeShow: true
    });
  },

  onClickHide() {
    this.setData({
      codeShow: false
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

  onConfirm(e) {
    let _this = this
    this.setData({
      areaText: (typeof (e.detail.values[0]) == 'undefined' || e.detail.values[0].code == '' ? '全国' : e.detail.values[0].name) + (typeof (e.detail.values[1]) == 'undefined' || e.detail.values[1].code == '' ? '' : e.detail.values[1].name) + (typeof (e.detail.values[2]) == 'undefined' || e.detail.values[2].code == '' ? '' : e.detail.values[2].name),
      province: typeof (e.detail.values[0]) == 'undefined' || e.detail.values[0].code == '' ? '' : e.detail.values[0].name,
      city: typeof (e.detail.values[1]) == 'undefined' || e.detail.values[1].code == '' ? '' : e.detail.values[1].name,
      area: typeof (e.detail.values[2]) == 'undefined' || e.detail.values[2].code == '' ? '' : e.detail.values[2].name,
    })
    console.log( _this.data.province, _this.data.city, _this.data.area)
    this.getMaster('1', _this.data.province, _this.data.city, _this.data.area)
    this.onClose();
  },
  // 推荐大师详情
  onMasterDetial(e) {
    wx.showLoading()
    // console.log(e.currentTarget.dataset.id)
    API.masterDetail({
      role3_id: e.currentTarget.dataset.id
    }).then(res => {
      wx.hideLoading()
      // console.log(res)
      let userInfo = JSON.stringify(res.data.role3)
      wx.navigateTo({
        url: '../masterInfo/masterInfo?userInfo=' + userInfo,
      })
    })
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
  // 奇门
  onMagic(e) {
    let _this = this
    let url = e.currentTarget.dataset.url
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: url + '?id=' + id + '&title=' + title
    })
  },
  // 大师推荐
  getMaster(page, province, city, area) {
    let _this = this
    API.master({
      page: page,
      page_size: '15',
      province: province,
      city: city,
      area: area
    }).then(res => {
      // console.log(res)
      if (page > 1) {
        if (res.data.users.length == 0) {
          wx.showToast({
            title: '无更多数据',
            icon: 'none'
          })
          _this.setData({
            page: _this.data.page - 1
          })
        } else {
          _this.setData({
            masterList: _this.data.masterList.concat(res.data.users)
          })
        }
      } else {
        _this.setData({
          masterList: res.data.users
        })
      }
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
          area: area,
          latitude: latitude,
          longitude: longitude,
          areaText: city + area
        })
        _this.getMaster('1', _this.data.province, _this.data.city, _this.data.area)
      },
      fail: function (res) {},
      complete: function (res) {}
    });
  },
  // 关闭分享
  oncloseCode() {
    this.setData({
      canvasShow: true
    })
  },
  // 分享
  share() {
    let _this = this
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo == '' || userInfo == undefined) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      wx.login({
        success(res) {
          if (res.code) {
            API.isSignIn({}, {
                uid: userInfo.user_id,
                wechat_code: res.code
              })
              .then(res => {
                if (res.message == '已登录') {
                  wx.setStorageSync('loginToken', res.data.login_token);
                  wx.setStorageSync('userInfo', res.data.user);
                  API.share({}).then(res => {
                    let codeUrl = API.IMG_BASE_URL + res.data.qrcode
                    let backUrl = API.IMG_BASE_URL + res.data.qrcode_base
                    wx.showLoading({
                      title: '生成海报中',
                    })
                    API.getImage(codeUrl).then(res => {
                      let codePath = res.path
                      API.getImage(backUrl).then(res => {
                        let backPath = res.path
                        API.getImageAll([codePath, backPath]).then((res) => {
                          const ctx = wx.createCanvasContext('shareCanvas')
                          // 底图
                          ctx.drawImage(res[1].path, 0, 0, 250, 400);
                          // 小程序码
                          ctx.drawImage(res[0].path, 85, 300, 80, 80)
                          ctx.stroke()
                          ctx.draw()
                          wx.hideLoading()
                          _this.setData({
                            canvasShow: false
                          })
                        })
                      })
                    })
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
        }
      })
    }

  },
  // 生成图片保存相册
  savePhoto() {
    let that = this
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    wx.canvasToTempFilePath({
      canvasId: 'shareCanvas',
      success: function (res) {
        wx.hideLoading()
        let tempFilePath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(res) {
            wx.showModal({
              content: '图片已保存到相册，赶紧晒一下吧~',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#333',
              success: function (res) {
                if (res.confirm) {
                  that.setData({
                    canvasShow: true
                  })
                }
              },
              fail: function (res) {
                that.setData({
                  canvasShow: true
                })
              }
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权")
              wx.showModal({
                content: '是否打开权限设置？',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success(settingdata) {
                        console.log(settingdata)
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                          wx.showToast({
                            title: '点击保存到相册按钮',
                            mask: true,
                            icon: "none"
                          })
                        } else {
                          wx.showToast({
                            title: '拒绝权限，无法保存图片',
                            mask: true,
                            icon: "none"
                          })
                          setTimeout(() => {
                            that.setData({
                              canvasShow: true
                            })
                          }, 2000);
                        }
                      }
                    })
                  }
                },
                fail: function (res) {
                  that.setData({
                    canvasShow: true
                  })
                }
              })
            } else if (err.errMsg == "saveImageToPhotosAlbum:fail:auth denied") {
              wx.showToast({
                title: '拒绝权限，无法保存图片',
                mask: true,
                icon: "none"
              })
              setTimeout(() => {
                that.setData({
                  canvasShow: true
                })
              }, 2000);
            }
          }
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    if (options.scene) {
      const scene = decodeURIComponent(options.scene)
      var code = scene.split('=')[1]
      wx.setStorageSync('p_code', code);
    }else if (options.p) {
      let code = options.p
      wx.setStorageSync('p_code', code);
    }else{
      wx.setStorageSync('p_code', '');
    }
    qqmapsdk = new QQMapWX({
      key: 'OQYBZ-GMQKD-X3I4Q-H4YNU-3TDQ5-PWFAQ' //自己的key秘钥
    });
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
    this.getCarouselData() //轮播
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
      page: 1
    })
    this.getCarouselData() //轮播
    this.getMaster('1', _this.data.province, _this.data.city, _this.data.area)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let _this = this
    this.setData({
      page: _this.data.page * 1 + 1
    })
    this.getMaster(_this.data.page, _this.data.province, _this.data.city, _this.data.area)
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
      path: '/pages/home/home?p=' + code
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
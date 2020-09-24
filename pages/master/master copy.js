// pages/master/master.js
const API = require('../../utils/api');
const AREA = require('../../utils/area');
Array.prototype.delete = function (delIndex) {
  var temArray = [];
  for (var i = 0; i < this.length; i++) {
    if (i != delIndex) {
      temArray.push(this[i]);
    }
  }
  return temArray;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL,
    province: '',
    city: '',
    area: '',
    show: false,
    areaList: AREA.default,
    loading: true,
    areaText: '',
    fileList: [],
    age: '',
    adept: '',
    post: '',
    newCertificate: [], //新的证书
    isbeing: false, //是否提交过
    urlArray: [], //网络地址变量
    pathArray: [], //本地地址变量
    storeList: [], //图片中间变量
    noticeText: ['标准', '边框缺失', '边框缺失', '闪光强烈'],
    nameValue: '',
    idcardValue: '',
    faceImg: '',
    backImg: '',
    card_pic1: '',
    card_pic2: ''
  },
  //获取input输入框的值
  nameValue(e) {
    this.setData({
      nameValue: e.detail
    })
  },
  idcardValue(e) {
    this.setData({
      idcardValue: e.detail
    })
  },
  // 选择图片
  onChoose(e) {
    let _this = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //console.log(res)
        if (e.target.dataset.type == '1') {
          _this.setData({
            faceImg: res.tempFiles[0].path,
            card_pic1: res.tempFiles[0].path
          })
        } else {
          _this.setData({
            backImg: res.tempFiles[0].path,
            card_pic2: res.tempFiles[0].path
          })
        }
      }
    })
  },
  // 删除图片
  onDelete(e) {
    let _this = this
    if (e.target.dataset.type == '1') {
      _this.setData({
        faceImg: ''
      })
    } else {
      _this.setData({
        backImg: ''
      })
    }
  },
  //获取input输入框的值
  getAgeValue(e) {
    this.setData({
      age: e.detail
    })
  },
  getAdeptValue(e) {
    this.setData({
      adept: e.detail
    })
  },
  getPostValue(e) {
    this.setData({
      post: e.detail
    })
  },
  // 提交
  onSubmit() {
    let _this = this
    let reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    let param = {
      real_name: _this.data.nameValue,
      card_id: _this.data.idcardValue,
      card_pic1: _this.data.card_pic1,
      card_pic2: _this.data.card_pic2,
      age: _this.data.age,
      adept: _this.data.adept,
      post: _this.data.post,
      province: _this.data.province,
      city: _this.data.city,
      area: _this.data.area,
      certificate: _this.data.storeList
    }
    if (param.real_name == '') {
      wx.showToast({
        title: '请填写真实姓名',
      })
    } else if (param.card_id == '') {
      wx.showToast({
        title: '请填写身份证号',
      })
    } else if (!reg.test(param.card_id)) {
      wx.showToast({
        title: '身份证号有误',
      })
    } else if (param.card_pic1 == '') {
      wx.showToast({
        title: '请上传身份证正面照片',
      })
    } else if (param.card_pic2 == '') {
      wx.showToast({
        title: '请上传身份证反面照片',
      })
    } else if (param.age == '') {
      wx.showToast({
        title: '请输入您的年龄',
        icon: 'none'
      })
    } else if (param.adept == '') {
      wx.showToast({
        title: '请输入您的擅长项目',
        icon: 'none'
      })
    } else if (param.province == '') {
      wx.showToast({
        title: '请输入您所在地区',
        icon: 'none'
      })
    } else {
      if(_this.data.card_pic1!==''&&_this.data.card_pic2!==''){
        if (_this.data.isbeing == true) {
          wx.showModal({
            title: '修改资料',
            content: '重新提交信息需再次审核，是否提交？',
            showCancel: true, //是否显示取消按钮
            success: function (res) {
              if (res.cancel) {
                //点击取消,默认隐藏弹框
              } else {
                param = {
                  real_name: _this.data.nameValue,
                  card_id: _this.data.idcardValue,
                  card_pic1: _this.data.card_pic1,
                  card_pic2: _this.data.card_pic2,
                  age: _this.data.age,
                  adept: _this.data.adept,
                  post: _this.data.post,
                  province: _this.data.province,
                  city: _this.data.city,
                  area: _this.data.area,
                  certificate: _this.data.storeList
                }
                if (param.certificate.length == 0) {
                  API.masterApply(param).then(res => {
                    wx.showToast({
                      title: res.message,
                      icon: 'none'
                    })
                    setTimeout(() => {
                      wx.navigateBack({
                        delta: 0,
                      })
                    }, 1500);
                  })
                } else {
                  param.certificate.forEach(element => {
                    if (element.url) {
                      _this.setData({
                        urlArray: _this.data.urlArray.concat(element.url)
                      })
                    } else {
                      _this.setData({
                        pathArray: _this.data.pathArray.concat(element)
                      })
                    }
                  });
                  API.uploadImgs({
                    'file_name': 'certificate'
                  }, _this.data.pathArray).then(res => {
                    res.forEach(element => {
                      _this.setData({
                        urlArray: _this.data.urlArray.concat(element.data.path)
                      })
                    });
                    console.log(param)
                    API.masterApply(param).then(res => {
                      wx.showToast({
                        title: res.message,
                        icon: 'none'
                      })
                      setTimeout(() => {
                        wx.navigateBack({
                          delta: 0,
                        })
                      }, 1500);
                    })
                  })
                }
              }
            }
          })
        } else {
          param = {
            real_name: _this.data.nameValue,
            card_id: _this.data.idcardValue,
            card_pic1: _this.data.card_pic1,
            card_pic2: _this.data.card_pic2,
            age: _this.data.age,
            adept: _this.data.adept,
            post: _this.data.post,
            province: _this.data.province,
            city: _this.data.city,
            area: _this.data.area,
            certificate: _this.data.storeList
          }
          if (param.certificate.length == 0) {
            API.masterApply(param).then(res => {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
              setTimeout(() => {
                wx.navigateBack({
                  delta: 0,
                })
              }, 1500);
            })
          } else {
            API.uploadImgs({
              'file_name': 'certificate'
            }, param.certificate).then(res => {
              res.forEach(element => {
                console.log(param)
                _this.setData({
                  newCertificate: _this.data.newCertificate.concat(element.data.path)
                })
              });
              API.masterApply(param).then(res => {
                wx.showToast({
                  title: res.message,
                  icon: 'none'
                })
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 0,
                  })
                }, 1500);
              })
            })
          }
        }
      }else{
      API.uploadImg({
        'file_name': 'card_pic1'
      }, param.card_pic1).then(res => {
        //console.log(res)
        _this.setData({
          card_pic1: res.data.path
        })
        API.uploadImg({
          'file_name': 'card_pic2'
        }, param.card_pic2).then(res => {
          _this.setData({
            card_pic2: res.data.path
          })
          if (_this.data.isbeing == true) {
            wx.showModal({
              title: '修改资料',
              content: '重新提交信息需再次审核，是否提交？',
              showCancel: true, //是否显示取消按钮
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  param = {
                    real_name: _this.data.nameValue,
                    card_id: _this.data.idcardValue,
                    card_pic1: _this.data.card_pic1,
                    card_pic2: _this.data.card_pic2,
                    age: _this.data.age,
                    adept: _this.data.adept,
                    post: _this.data.post,
                    province: _this.data.province,
                    city: _this.data.city,
                    area: _this.data.area,
                    certificate: _this.data.storeList
                  }
                  if (param.certificate.length == 0) {
                    API.masterApply(param).then(res => {
                      wx.showToast({
                        title: res.message,
                        icon: 'none'
                      })
                      setTimeout(() => {
                        wx.navigateBack({
                          delta: 0,
                        })
                      }, 1500);
                    })
                  } else {
                    param.certificate.forEach(element => {
                      if (element.url) {
                        _this.setData({
                          urlArray: _this.data.urlArray.concat(element.url)
                        })
                      } else {
                        _this.setData({
                          pathArray: _this.data.pathArray.concat(element)
                        })
                      }
                    });
                    API.uploadImgs({
                      'file_name': 'certificate'
                    }, _this.data.pathArray).then(res => {
                      res.forEach(element => {
                        _this.setData({
                          urlArray: _this.data.urlArray.concat(element.data.path)
                        })
                      });
                      console.log(param)
                      API.masterApply(param).then(res => {
                        wx.showToast({
                          title: res.message,
                          icon: 'none'
                        })
                        setTimeout(() => {
                          wx.navigateBack({
                            delta: 0,
                          })
                        }, 1500);
                      })
                    })
                  }
                }
              }
            })
          } else {
            param = {
              real_name: _this.data.nameValue,
              card_id: _this.data.idcardValue,
              card_pic1: _this.data.card_pic1,
              card_pic2: _this.data.card_pic2,
              age: _this.data.age,
              adept: _this.data.adept,
              post: _this.data.post,
              province: _this.data.province,
              city: _this.data.city,
              area: _this.data.area,
              certificate: _this.data.storeList
            }
            if (param.certificate.length == 0) {
              API.masterApply(param).then(res => {
                wx.showToast({
                  title: res.message,
                  icon: 'none'
                })
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 0,
                  })
                }, 1500);
              })
            } else {
              API.uploadImgs({
                'file_name': 'certificate'
              }, param.certificate).then(res => {
                res.forEach(element => {
                  console.log(param)
                  _this.setData({
                    newCertificate: _this.data.newCertificate.concat(element.data.path)
                  })
                });
                API.masterApply(param).then(res => {
                  wx.showToast({
                    title: res.message,
                    icon: 'none'
                  })
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: 0,
                    })
                  }, 1500);
                })
              })
            }
          }
          
        })
        
      })
    }
    }
  },

  // 删除图片
  deleteImg(index) {
    console.log(index)
    let _this = this
    let idx = index.detail.index
    this.setData({
      fileList: _this.data.fileList.delete(idx),
      storeList: _this.data.storeList.delete(idx)
    })
  },
  // 选择图片后本地地址
  afterRead(event) {
    let _this = this
    this.setData({
      fileList: _this.data.fileList.concat(event.detail.file),
      storeList: _this.data.storeList.concat(event.detail.file)
    })
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
    this.setData({
      areaText: e.detail.values[1].name + e.detail.values[2].name,
      province: e.detail.values[0].name,
      city: e.detail.values[1].name,
      area: e.detail.values[2].name
    })
    this.onClose();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let userInfo = wx.getStorageSync('userInfo').role3
    console.log(userInfo)
    let newCertificate = []
    if (userInfo != '') {
      _this.setData({
        isbeing: true
      })
      if (userInfo.certificate != '') {
        let imgArray = JSON.parse(userInfo.certificate)
        let imgUrl = _this.data.imgUrl
        imgArray.forEach(element => {
          console.log(element)
          newCertificate.push({
            url: imgUrl + element
          })
          _this.setData({
            storeList: _this.data.storeList.concat({
              url: element
            })
          })
        });
      }
      _this.setData({
        nameValue: userInfo.real_name,
        idcardValue: userInfo.card_id,
        faceImg: _this.data.imgUrl+userInfo.card_pic1,
        backImg: _this.data.imgUrl+userInfo.card_pic2,
        card_pic1: _this.data.imgUrl+userInfo.card_pic1,
        card_pic2: _this.data.imgUrl+userInfo.card_pic2,
        province: userInfo.province,
        city: userInfo.city,
        area: userInfo.area,
        areaText: userInfo.city + userInfo.area,
        age: userInfo.age,
        adept: userInfo.adept,
        post: userInfo.post,
        fileList: newCertificate
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
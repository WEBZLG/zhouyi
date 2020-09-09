// pages/master/master.js
const API = require('../../utils/api');
const AREA = require('../../utils/area');
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    newCertificate: []
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
    let age = this.data.age
    let adept = this.data.adept
    let post = this.data.post
    let province = this.data.province
    let city = this.data.city
    let area = this.data.area
    let certificate = this.data.fileList
    if (age == '') {
      wx.showToast({
        title: '请输入您的年龄',
        icon: 'none'
      })
    } else if (adept == '') {
      wx.showToast({
        title: '请输入您的擅长项目',
        icon: 'none'
      })
    } else if (province == '') {
      wx.showToast({
        title: '请输入您所在地区',
        icon: 'none'
      })
    } else {
      if (certificate.length == 0) {
        API.masterApply({
          age: age,
          adept: adept,
          post: post,
          province: province,
          city: city,
          area: area,
          certificate: JSON.stringify(_this.data.newCertificate)
        }).then(res => {
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
        }, certificate).then(res => {
          res.forEach(element => {
            //console.log(element)
            _this.setData({
              newCertificate: _this.data.newCertificate.concat(element.data.path)
            })
          });
          API.masterApply({
            age: age,
            adept: adept,
            post: post,
            province: province,
            city: city,
            area: area,
            certificate: JSON.stringify(_this.data.newCertificate)
          }).then(res => {
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





  },
  // 选择图片后本地地址
  afterRead(event) {
    this.setData({
      fileList: event.detail.file
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
  onShareAppMessage: function () {

  }
})
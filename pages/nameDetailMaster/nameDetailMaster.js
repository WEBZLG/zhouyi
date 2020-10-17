// pages/nameDetailMaster/nameDetailMaster.js
const API = require('../../utils/api');
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    loading: true,
    show: false,
    concat: '',
  },
  onConsult() {
    API.getContace({}).then(res => {
      console.log(res)
      this.setData({
        concat: res.data,
        show: true
      });
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param = JSON.parse(options.param)
    this.setData({
      content: param
    })
    wx.setNavigationBarTitle({
      title: param.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 1000);
  },
  // 跳转大师起名
  // onMasterName() {
  //   let userInfo = wx.getStorageSync('userInfo');
  //   let content = JSON.stringify(this.data.content)
  //   if (userInfo.vip_level == 0) {
  //     Dialog.confirm({
  //         title: '开通会员',
  //         message: '您还不是会员，无法起名，是否开通会员？',
  //       })
  //       .then(() => {
  //         wx.navigateTo({
  //           url: '../vip/vip',
  //         })
  //       })
  //       .catch(() => {
  //         // on cancel
  //       });
  //   } else {
  //     wx.navigateTo({
  //       url: '../masterNameFill/masterNameFill?content=' + content,
  //     })
  //   }
  // },
  onMasterName() {
    let content = JSON.stringify(this.data.content)
    wx.navigateTo({
      url: '../masterNameFill/masterNameFill?content=' + content,
    })
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
})
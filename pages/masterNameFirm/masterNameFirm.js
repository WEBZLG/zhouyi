// pages/masterNameFirm/masterNameFirm.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param:'',
    content:''
  },
  onSubmit(){
    let param = this.data.param
    API.namePay(param).then(res=>{
            wx.showToast({
              title: res.message,
              icon: "none"
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 4,
              })
            }, 1200);
      // wx.requestPayment({
      //   timeStamp: res.data.wechat_data.timeStamp.toString(),
      //   nonceStr: res.data.wechat_data.nonceStr,
      //   package: res.data.wechat_data.package,
      //   signType: res.data.wechat_data.signType,
      //   paySign: res.data.wechat_data.paySign,
      //   success(res) {
      //     if(res.errMsg=='requestPayment:ok'){
      //       wx.showToast({
      //         title: '支付成功，请等待大师与您联系',
      //         icon: "none"
      //       })
      //       setTimeout(() => {
      //         wx.navigateBack({
      //           delta: 4,
      //         })
      //       }, 1200);
      //     }else{
      //       wx.showToast({
      //         title: res.errMsg,
      //         icon: "none"
      //       })
      //     }
      //   },
      //   fail(res) {
      //     wx.showToast({
      //       title: '支付失败',
      //       icon: "none"
      //     })
      //   }
      // })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param = JSON.parse(options.param)
    let content = JSON.parse(options.content)
    this.setData({
      param:param,
      content:content
    })
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
// pages/nameDetailCompany/nameDetailCompany.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    wuxing:[],
    isOrder:false,
    param:''
  },
  getData(param){
    API.companyName(param).then(res=>{
      console.log(res)
      let wuxing = new Array()
      for (var prop in res.data.wuxingfenxi) {
        if (res.data.wuxingfenxi.hasOwnProperty(prop)) {
          let val = res.data.wuxingfenxi[prop]
          let obj = {
            title:prop,
            num:val
          }
          wuxing.push(obj)
        }
      }
      this.setData({
        content:res.data,
        wuxing:wuxing
      })
    })
  },
    // 查看更多
    onView(){
      let _this = this
      API.namePay({
        pay_type:'qiming_business'
      }).then(res=>{
        let order = res.data.order_no
        wx.requestPayment({
          timeStamp: res.data.wechat_data.timeStamp.toString(),
          nonceStr: res.data.wechat_data.nonceStr,
          package: res.data.wechat_data.package,
          signType: res.data.wechat_data.signType,
          paySign: res.data.wechat_data.paySign,
          success(res) {
            let param = _this.data.param
            delete param.sign
            param.order_no = order
            _this.getData(param);
            _this.setData({
              isOrder:true
            })
          },
          fail(error) {
            wx.showToast({
              title: error.errMsg,
              icon: "none"
            })
          }
        })
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param = JSON.parse(options.param);
    this.getData(param);
    this.setData({
      param:param
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
  // onShareAppMessage: function () {

  // }
})
// pages/myOrder/myOrder.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL, //图片路径
    show:false,
    concat:'',
    page:1,
    dataList:[]
  },
  // 支付
  orderPay(e){
    let _this = this
    let orderId = e.currentTarget.dataset.id
    API.namePay({
      pay_type:'buy',
      order_id:orderId
    }).then(res=>{
      wx.requestPayment({
        timeStamp: res.data.wechat_data.timeStamp.toString(),
        nonceStr: res.data.wechat_data.nonceStr,
        package: res.data.wechat_data.package,
        signType: res.data.wechat_data.signType,
        paySign: res.data.wechat_data.paySign,
        success(res) {
          if(res.errMsg=='requestPayment:ok'){
            wx.showToast({
              title: '支付成功',
              icon: "none"
            })
            setTimeout(() => {
              _this.getOrder()
            }, 1200);
          }else{
            wx.showToast({
              title: res.errMsg,
              icon: "none"
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '支付失败',
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

  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onOpen() {
    API.getContace({}).then(res => {
      this.setData({
        concat:res.data,
        show: true
      });
    })
  },
  getOrder(page){
    let _this = this
    API.getOrder({
      page:page
    }).then(res => {
      if(page>1){
        if(res.data.orders.length==0){
          wx.showToast({
            title: '无更多数据',
            icon:'none'
          })
          _this.setData({
            page:_this.data.page-1
          })
        }
        _this.setData({
          dataList: _this.data.dataList.concat(res.data.orders) 
        })
      }else{
        _this.setData({
          dataList: res.data.orders
        })
      }
    })
  },
  orderDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id='+id,
    })
  },
  orderSuccess(e){
    let _this = this
    let id = e.currentTarget.dataset.id
    API.orderSuccess({},id).then(res => {
      wx.showToast({
        title: res.message,
      })
      setTimeout(() => {
        _this.getOrder(_this.data.page)
      }, 1000);
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
    this.getOrder(1)
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
    this.getOrder(1)
    this.setData({
      page: 1
    })
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let _this = this
    this.setData({
      page: _this.data.page*1+1
    })
    this.getOrder(_this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})
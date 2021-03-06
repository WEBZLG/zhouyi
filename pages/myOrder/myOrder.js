// pages/myOrder/myOrder.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL, //图片路径
    show: false,
    concat: '',
    page: 1,
    dataList: [],
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
    value1: 0,
    value2: 'a',
  },
  // 支付
  orderPay(e) {
    let _this = this
    let orderId = e.currentTarget.dataset.id
    API.namePay({
      pay_type: 'buy',
      order_id: orderId
    }).then(res => {
      wx.requestPayment({
        timeStamp: res.data.wechat_data.timeStamp.toString(),
        nonceStr: res.data.wechat_data.nonceStr,
        package: res.data.wechat_data.package,
        signType: res.data.wechat_data.signType,
        paySign: res.data.wechat_data.paySign,
        success(res) {
          if (res.errMsg == 'requestPayment:ok') {
            wx.showToast({
              title: '支付成功',
              icon: "none"
            })
            setTimeout(() => {
              _this.getOrder()
            }, 1200);
          } else {
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
  // 获取状态
  getStatus(){
    API.getStatus({}).then(res=>{
      
    })
  },

  //订单类型
  getType(){
    API.getType({}).then(res=>{
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getStatus()
    // this.getType()
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onOpen() {
    API.getContace({}).then(res => {
      this.setData({
        concat: res.data,
        show: true
      });
    })
  },
  getOrder(page) {
    let _this = this
    API.getOrder({
      page: page
    }).then(res => {
      if (page > 1) {
        if (res.data.orders.length == 0) {
          wx.showToast({
            title: '无更多数据',
            icon: 'none'
          })
          _this.setData({
            page: _this.data.page - 1
          })
        }
        _this.setData({
          dataList: _this.data.dataList.concat(res.data.orders)
        })
      } else {
        _this.setData({
          dataList: res.data.orders
        })
      }
    })
  },
  orderDetail(e) {
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    switch (type) {
      case '购买商品':
        wx.navigateTo({
          url: '../orderDetail/orderDetail?id=' + id,
        })
        break;
      case '公司起名':
        wx.navigateTo({
          url: '../orderDetailGong/orderDetailGong?id=' + id,
        })
        break;
      case '宝宝起名':
        wx.navigateTo({
          url: '../orderDetailBao/orderDetailBao?id=' + id,
        })
        break;
      case '测名':
        wx.navigateTo({
          url: '../orderDetailCe/orderDetailCe?id=' + id,
        })
        break;
      default:
        break;
    }

  },
  orderSuccess(e) {
    let _this = this
    let id = e.currentTarget.dataset.id
    API.orderSuccess({}, id).then(res => {
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
      page: _this.data.page * 1 + 1
    })
    this.getOrder(_this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})
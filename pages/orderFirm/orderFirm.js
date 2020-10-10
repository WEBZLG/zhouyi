// pages/orderFirm/orderFirm.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    imgUrl: API.IMG_BASE_URL, //图片路径
    number:1,//数量
    dataList:'',//商品信息
    value:'',//备注
    price:'0',
    address:'',
    addressList:[],
    show:false,
    addressId:''
  },
  // 商品数量
  onChange(event) {
    this.setData({
      number:event.detail,
      price:this.data.dataList.price*event.detail*100
    })
  },
  //添加收货地址
  addAddress(){
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  //获取收货地址
  getAddress(){
    API.getAddress({}).then(res=>{
      this.setData({
        addressList:res.data.address,
      })
      if(res.data.address.length>0){
        this.setData({
          address:res.data.address[0],
          addressId:res.data.address[0].id
        })
      }
    })
  },
  // 选择地址
  showList(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  chooseAddress(e){
    let info = e.currentTarget.dataset.item
    this.setData({
      addressId:info.id,
      address:info,
      show: false
    })
  },
  // 提交订单
  onSubmit(){
    let number = this.data.number
    let value = this.data.value
    let id = this.data.id
    let addressId = this.data.addressId
    if(addressId==''){
      wx.showToast({
        title: '请添加收货地址',
        icon:'none'
      })
    }else{
    API.namePay({
      pay_type:'buy',
      goods_id:id,
      addr_id:addressId,
      num:number,
      remark:value
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
              wx.navigateBack({
                delta: 2,
              })
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
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = JSON.parse(options.info)
    this.setData({
      dataList:info,
      id:info.id,
      price:info.price*100
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
    this.getAddress()
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
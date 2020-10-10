// pages/addressList/addressList.js
const API = require('../../utils/api');
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[]
  },
  //获取收货地址
  getAddress(){
    API.getAddress({}).then(res=>{
      this.setData({
        addressList:res.data.address
      })
    })
  },
  // 添加地址
  addAddress(){
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  // 修改地址
  changeAddress(e){
    let info = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../addAddress/addAddress?info='+info,
    })
  },
  onClose(event) {
    let _this = this
    const { position, instance } = event.detail;
    switch (position) {
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          API.deleteAddress({
            addr_id:event.target.dataset.id
          }).then(res=>{
            console.log(res)
            wx.showToast({
              title: res.message,
            })
            instance.close();
            _this.getAddress()
          })
        }).catch(() => {
          instance.close();
        });;
        break;
    }
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
// pages/addAddress/addAddress.js
const API = require('../../utils/api');
const AREA = require('../../utils/area');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr_id:'',
    nameValue:'',
    phoneValue:'',
    province: '',
    city: '',
    area: '',
    addressDetail:'',
    areaText:'',
    areaList: AREA.default,
    checked:true
  },
  //获取input输入框的值
  nameValue(e) {
    this.setData({
      nameValue: e.detail
    })
  },
  phoneValue(e) {
    this.setData({
      phoneValue: e.detail
    })
  },
  addressDetail(e) {
    this.setData({
      addressDetail: e.detail
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
      areaText:e.detail.values[0].name + e.detail.values[1].name + e.detail.values[2].name,
      province: e.detail.values[0].name,
      city: e.detail.values[1].name,
      area: e.detail.values[2].name
    })
    this.onClose();
  },
  onChange({ detail }) {
    this.setData({ checked: detail });
  },
  onSubmit(){
    let name = this.data.nameValue
    let phone = this.data.phoneValue
    let province = this.data.province
    let city = this.data.city
    let area = this.data.area
    let addressDetail = this.data.addressDetail
    let checked = this.data.checked==true?'1':'0'
    if(name==''){
      wx.showToast({
        title: '请输入收货人姓名',
        icon:'none'
      })
      return false;
    }else if(phone==''){
      wx.showToast({
        title: '请输入收货人电话',
        icon:'none'
      })
      return false;
    }else if(province==''){
      wx.showToast({
        title: '请输入收货人地址',
        icon:'none'
      })
      return false;
    }else if(addressDetail==''){
      wx.showToast({
        title: '请输入收货人详细地址',
        icon:'none'
      })
      return false;
    }else{
      API.editAddress({
        addr_id:this.data.addr_id,
        receiver:name,
        mobile:phone,
        province:province,
        city:city,
        area:area,
        address:addressDetail,
        default:checked
      }).then(res=>{
        wx.showToast({
          title: res.message,
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000);
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.info){
      wx.setNavigationBarTitle({
        title: '修改地址',
      })
      let info = JSON.parse(options.info)
      this.setData({
        addr_id:info.id,
        nameValue:info.receiver,
        phoneValue:info.mobile,
        province:info.province,
        city:info.city,
        area:info.area,
        addressDetail:info.address,
        checked:info.is_default==1?true:false,
        areaText:info.province+info.city+info.area
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
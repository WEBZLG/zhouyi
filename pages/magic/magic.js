// pages/magic/magic.js
const UTIL = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false,//弹窗控制显隐
    showDate:false,//日期弹窗控制显隐
    showGame:false,//定局显隐
    active:0,//tab选中
    minDate:new Date(1900,1, 1).getTime(),
    maxDate:new Date(2099, 11, 31).getTime(),
    currentDate: new Date().getTime(),//默认日期
    chooseDate:UTIL.timestampToTime(new Date().getTime()),//选择后日期
    changeDate:UTIL.timestampToTime(new Date().getTime()),//传送参数
    game:'茅道',//定局选择
    actions: [{//定局选项
        name: '茅道',
      }],
    tabList:[{//tab导航
      id:0,
      title:'时家'
    },{
      id:1,
      title:'搜局'
    }]
  },
  // 弹窗显示触发
  showPopup() {
    this.setData({ showDate: true });
  },
  // 定局显示事件
  showGame(){
    this.setData({ showGame: true });
  },
  // 弹窗关闭触发
  onClose() {
    this.setData({ 
      showDate: false,
      showGame:false
    });
  },
  // 选择日期确定事件
  onConfirm(event) {
    this.setData({
      currentDate: event.detail,
      chooseDate:UTIL.timestampToTime(event.detail),
      changeDate:UTIL.timestampToTime(event.detail),
      // changeDate:{
      //   year:UTIL.timestampToTime(event.detail).split('-')[0],
      //   month:UTIL.timestampToTime(event.detail).split('-')[1],
      //   day:UTIL.timestampToTime(event.detail).split('-')[2].split(' ')[0],
      //   hour:UTIL.timestampToTime(event.detail).split(' ')[1].split(':')[0]
      // }
    });
    this.onClose()
  },
  // 选择日期取消事件
  onCancel(){
    this.onClose()
  },
  // 定局选中事件
  onSelect(event) {
    this.setData({game:event.detail.name})
  },
  //详情
  onDetail(){
    let changeDate = JSON.stringify(this.data.changeDate)
    wx.navigateTo({
      url: '../magicDetail/magicDetail?time='+changeDate,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   changeDate:{
    //     year:UTIL.timestampToTime(this.data.currentDate).split('-')[0],
    //     month:UTIL.timestampToTime(this.data.currentDate).split('-')[1],
    //     day:UTIL.timestampToTime(this.data.currentDate).split('-')[2].split(' ')[0],
    //     hour:UTIL.timestampToTime(this.data.currentDate).split(' ')[1].split(':')[0]
    //   }
    // })
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
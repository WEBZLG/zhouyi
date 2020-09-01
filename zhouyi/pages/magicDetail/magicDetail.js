// pages/magicDetail/magicDetail.js
const API = require('../../utils/api');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false,//弹窗控制显隐
    time:'',//传参
    specialData:'',//返回参数
    sudoku:'',//排盘重组
    loading:true
  },
  // 弹窗显示触发
  showPopup() {
    this.setData({ show: true });
  },
  // 弹窗关闭触发
  onClose() {
    this.setData({ show: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let time = JSON.parse(options.time) 
    console.log(time)
    this.setData({
      time:time
    })
    API.special({time:time})
    .then(res => {
      console.log(res)
      let sudoku = []
      sudoku.push(res.data.sudoku[4])
      sudoku.push(res.data.sudoku[9])
      sudoku.push(res.data.sudoku[2])
      sudoku.push(res.data.sudoku[3])
      sudoku.push(res.data.sudoku[5])
      sudoku.push(res.data.sudoku[7])
      sudoku.push(res.data.sudoku[8])
      sudoku.push(res.data.sudoku[1])
      sudoku.push(res.data.sudoku[6])
      _this.setData({
        specialData:res.data,
        sudoku:sudoku,
      })
      setTimeout(() => {
        _this.setData({
          loading:false
        })
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
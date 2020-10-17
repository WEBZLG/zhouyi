// pages/magicDetail/magicDetail.js
const API = require('../../utils/api');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false,//弹窗控制显隐
    specialData:'',//返回参数
    specialContent:[],
    sudoku:'',//排盘重组
    loading:true,
    changeDate:''
  },
  // 弹窗显示触发
  showPopup(e) {
    let content = e.currentTarget.dataset.content
    this.setData({ show: true,specialContent: content});
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
    let changeDate = options.changeDate
    this.setData({
      changeDate:changeDate
    })
    API.special({time:changeDate})
    .then(res => {
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
      let param = res.data
      sudoku = sudoku
      this.setData({
        specialData:param,
        sudoku:sudoku
      })
    })
    if (options.p) {
      let code = options.p
      wx.setStorageSync('p_code', code);
    }else{
      wx.setStorageSync('p_code', '');
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.setData({
        loading:false
      })
    }, 500);
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
      title: '奇门详情',
      path: '/pages/magicDetail/magicDetail?p=' + code+'&changeDate='+this.data.changeDate
    }
  },
  onShareTimeline(res) {
    let code = wx.getStorageSync('userInfo').p_code;
    if (code == undefined) {
      code = ""
    }
    return {
      title: '奇门',
      query: {
        p: code,
        changeDate:this.data.changeDate
      },
    }
  }
})
// pages/teachingList/teachingList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    iconNav: [
      {
        id: 1,
        imgPath: '../../images/qimenjiaoxue.png',
        title: "奇门教学",
        url: "../qimenList/qimenList"
      },{
        id: 2,
        imgPath: '../../images/qimingjiaoxue.png',
        title: "起名教学",
        url: "../teaching/teaching"
      },
      {
        id: 3,
        imgPath: '../../images/bazijiaoxue.png',
        title: "八字教学",
        url: "../teaching/teaching"
      },
      {
        id: 4,
        imgPath: '../../images/fengshuijiaoxue.png',
        title: "风水教学",
        url: "../teaching/teaching"
      },
    ]
  },
  onPage(e){
    let url = e.currentTarget.dataset.url
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: url+'?id='+id+'&title='+title
    })
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
    this.setData({
      loading:false
    })
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
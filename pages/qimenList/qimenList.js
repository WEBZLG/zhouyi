// pages/qimenList/qimenList.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    dataList:[]
  },
  onDetail(e){
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '../qimenDetail/qimenDetail?id='+id+'&title='+title,
    })
  },
  // 获取列表
  getList(id,page) {
    let _this = this
    API.teachingList({
      menu_id: id,
      page: page,
      page_size: 15
    }).then(res => {
      if(page>1){
        if(res.data.total==0){
          wx.showToast({
            title: '无更多数据',
          })
          _this.setData({
            page:_this.data.page-1
          })
        }
        _this.setData({
          dataList: _this.data.dataList.concat(res.data.contents) 
        })
      }else{
        _this.setData({
          dataList: res.data.contents
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({
      id:id
    })
    this.getList(id,1)
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
    this.getList(this.data.id,1)
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
    this.getList(_this.data.id,page)
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})
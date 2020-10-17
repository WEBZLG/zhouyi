// pages/magic/magic.js
const UTIL = require('../../utils/util.js')
const DATA = require('../../utils/data.js')
const API = require('../../utils/api');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 时家数据
    show: false, //时家弹窗控制显隐
    showDate: false, //时家日期弹窗控制显隐
    showGame: false, //时家定局显隐
    active: 0, //tab选中
    minDate: '', //最早日期
    maxDate: '', //最晚日期
    currentDate: '', //默认日期
    chooseDate: '', //时家选择后日期
    changeDate: '', //时家传送参数
    game: '茅道', //时家定局选择
    actions: [{ //时家定局选项
      name: '茅道',
    }],
    tabList: [{ //tab导航
      id: 0,
      title: '时家'
    }, {
      id: 1,
      title: '搜局'
    }],
    // 搜局数据
    chooseDateStart: '', //开始日期
    chooseDateEnd: '', //结束日期
    magic: '时家', //奇门
    chooseDateBm: '', //八门
    chooseDateTpg: '', //天盘干
    chooseDateDpg: '', //底盘干
    chooseDateGj: '', //格局
    chooseDateGw: '', //宫位
    showDateStart: false, //开始日期弹窗控制显隐
    showDateEnd: false, //结束日期弹窗控制显隐
    showMagic: false, //奇门弹窗控制显隐
    showBm: false, //八门弹窗控制显隐
    showTpg: false, //天盘干弹窗控制显隐
    showDpg: false, //底盘干弹窗控制显隐
    showGj: false, //格局弹窗控制显隐
    showGw: false, //宫弹窗控制显隐
    currentDateStart: '', //默认开始日期
    currentDateEnd: '', //默认结束日期
    changeDateStart: '',
    changeDateEnd: '',
    actionsMagic: [{ //奇门选项
      name: '时家',
    }],
    actionsBm: DATA.ACTION_BM, //八门
    actionsPg: DATA.ACTION_PG, //天地盘干
    actionsGj: DATA.ACTION_GJ, //格局
    actionsGw:DATA.ACTION_GW,//宫位
  },

  // 时家事件---------------
  // 弹窗显示触发
  showPopup() {
    this.setData({
      showDate: true
    });
  },
  // 定局显示事件
  showGame() {
    this.setData({
      showGame: true
    });
  },
  // 弹窗关闭触发
  onClose() {
    this.setData({
      showDate: false,
      showGame: false,
      showDateStart: false,
      showDateEnd: false,
      showMagic: false,
      showBm: false,
      showTpg: false,
      showDpg: false,
      showGj: false,
      showGw: false
    });
  },
  // 选择日期确定事件
  //0:时家开始事件,1:搜局开始事件.2:搜局结束事件
  onConfirm(event) {
    let _this = this
    let type = event.target.dataset.type
    switch (type) {
      case '0':
        _this.setData({
          currentDate: event.detail,
          chooseDate: UTIL.timestampToTime(event.detail),
          changeDate: UTIL.timestampToTime(event.detail),
        });
        break;
      case '1':
        _this.setData({
          currentDateStart: event.detail,
          chooseDateStart: UTIL.timestampToTime(event.detail),
          changeDateStart: UTIL.timestampToTime(event.detail),
        });
        if (_this.data.currentDateStart > _this.data.currentDateEnd) {
          wx.showToast({
            title: '起局时间不得晚于结束时间',
            icon: 'none'
          })
          _this.setData({
            changeDateStart: UTIL.timestampToTime(new Date().getTime()),
            changeDateEnd: UTIL.timestampToTime(new Date().getTime()),
            chooseDateStart: UTIL.timestampToTime(new Date().getTime()), //开始日期
            chooseDateEnd: UTIL.timestampToTime(new Date().getTime()), //结束日期
            currentDateStart: new Date().getTime(), //默认开始日期
            currentDateEnd: new Date().getTime(), //默认结束日期
          });
        }
        break;
      case '2':
        _this.setData({
          currentDateEnd: event.detail,
          chooseDateEnd: UTIL.timestampToTime(event.detail),
          changeDateEnd: UTIL.timestampToTime(event.detail),
        });
        if (_this.data.currentDateStart > _this.data.currentDateEnd) {
          wx.showToast({
            title: '起局时间不得晚于结束时间',
            icon: 'none'
          })
          _this.setData({
            changeDateStart: UTIL.timestampToTime(new Date().getTime()),
            changeDateEnd: UTIL.timestampToTime(new Date().getTime()),
            chooseDateStart: UTIL.timestampToTime(new Date().getTime()), //开始日期
            chooseDateEnd: UTIL.timestampToTime(new Date().getTime()), //结束日期
            currentDateStart: new Date().getTime(), //默认开始日期
            currentDateEnd: new Date().getTime(), //默认结束日期
          });
        }
        break;
    }
    this.onClose()
  },
  // 选择日期取消事件
  onCancel() {
    this.onClose()
  },
  // 选中事件
  onSelect(event) {
    this.setData({
      game: event.detail.name
    })
  },
  //详情
  onDetail() {
    let changeDate = this.data.changeDate
    wx.navigateTo({
      url: '../magicDetail/magicDetail?changeDate=' + changeDate
    })
  },
  // 搜局事件--------------------
  // 各事件弹出
  //0:开始事件,1:结束事件.2:奇门,3:八门，4：天盘干，5：底盘干，6：格局
  showPopupFun(e) {
    let _this = this
    let type = e.target.dataset.type
    switch (type) {
      case '0':
        _this.setData({
          showDateStart: true
        });
        break;
      case '1':
        _this.setData({
          showDateEnd: true
        });
        break;
      case '2':
        _this.setData({
          showMagic: true
        });
        break;
      case '3':
        _this.setData({
          showBm: true
        });
        break;
      case '4':
        _this.setData({
          showTpg: true
        });
        break;
      case '5':
        _this.setData({
          showDpg: true
        });
        break;
      case '6':
        _this.setData({
          showGj: true
        });
        break;
      case '7':
        _this.setData({
          showGw: true
        });
        break;
    }
  },
  // 选中事件
  //0:八门,1:天盘干.2:底盘干,3:格局,4宫位
  onSelectFun(e) {
    let _this = this
    let type = e.target.dataset.type
    let name = ''
    if (e.detail.name == '任意') {
      name = ''
    } else {
      name = e.detail.name
    }
    switch (type) {
      case '0':
        _this.setData({
          chooseDateBm: name
        });
        break;
      case '1':
        _this.setData({
          chooseDateTpg: name
        });
        break;
      case '2':
        _this.setData({
          chooseDateDpg: name
        });
        break;
      case '3':
        _this.setData({
          chooseDateGj: name
        });
        break;
      case '4':
        _this.setData({
          chooseDateGw: name
        });
        break;
    }
  },
  // 搜局详情
  onDetailSj() {
    let _this = this
    let param = {
      start_date: _this.data.chooseDateStart,
      end_date: _this.data.chooseDateEnd,
      door: _this.data.chooseDateBm,
      sky: _this.data.chooseDateTpg,
      ground: _this.data.chooseDateDpg,
      pattern: _this.data.chooseDateGj,
      gong:_this.data.chooseDateGw
    }
    if(param.door==''&&param.sky==''&&param.ground==''&&param.pattern==''&&param.gong==''){
      wx.showToast({
        title: '至少有一个查询条件不为任意',
        icon:'none'
      })
    }else{
      let params = JSON.stringify(param)
      wx.navigateTo({
        url: '../dateList/dateList?param=' + params,
      })
    }
  },
   getYear(year) {
    var time = new Date();
     time.setFullYear(time.getFullYear() + year);
     var y = time.getFullYear();
     var m = time.getMonth() + 1;
     var d = time.getDate();
     return y + "," + m + ',' + d;
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let minDate = this.getYear(-10)
    let maxDate = this.getYear(10)
    this.setData({
      currentDate: new Date().getTime(),
      chooseDate: UTIL.timestampToTime(new Date().getTime()), //时家选择后日期
      changeDate: UTIL.timestampToTime(new Date().getTime()), //时家传送参数
      chooseDateStart: UTIL.timestampToTime(new Date().getTime()), //开始日期
      chooseDateEnd: UTIL.timestampToTime(new Date().getTime()), //结束日期
      currentDateStart: new Date().getTime(), //默认开始日期
      currentDateEnd: new Date().getTime(), //默认结束日期
      minDate: new Date(minDate).getTime(), //最早日期
      maxDate: new Date(maxDate).getTime(), //最晚日期
      chooseDateBm:'',
      chooseDateTpg:'',
      chooseDateDpg:'',
      chooseDateGj:'',
      chooseDateGw:''
    })
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
      title: '奇门',
      path: '/pages/magin/magin?p=' + code
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
        p: code
      },
    }
  }
})
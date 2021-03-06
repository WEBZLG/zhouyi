// pages/babyName/babyName.js
const API = require('../../utils/api');
const UTIL = require('../../utils/util.js')
const AREA = require('../../utils/area');
const DATA = require('../../utils/data');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trueList:[],
    imgUrl: API.IMG_BASE_URL, //图片路径
    areaList: AREA.default,
    characterList: DATA.CHARACTER_LIST,
    loading: true,
    surname: '',
    sex: '1',
    show: false,
    characterShow: false,
    addressShow: false,
    dateStr3: '',
    chooseDate:'',
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    chooseAddress: '',
    chooseTime: '',
    ding: '',
    content:'',
    article:'',
    isLunar:true,
    dingPosition:'1',
    icon: {
      normal1: '../../images/shou1.png',
      active1: '../../images/shou2.png',
      normal2: '../../images/mo1.png',
      active2: '../../images/mo2.png',
    },
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  showAddressPopup() {
    this.setData({
      addressShow: true
    });
  },
  showCharacterPopup() {
    this.setData({
      characterShow: true
    });
  },
  onClose() {
    this.setData({
      show: false,
      addressShow: false,
      characterShow: false
    });
  },
  // 选择期望性格
  checkMark(e) {
    const index = e.currentTarget.dataset.index
    const list = this.data.characterList
    list[index].checked = !list[index].checked
    let trueList = new Array()
    list.forEach(element => {
      if(element.checked==true){
        trueList.push(element.title)
      }
    });
    if(trueList.length>6){
      wx.showToast({
        title: '最多可选6个标签',
        icon:'none'
      })
      list[index].checked = !list[index].checked
    }else{
      this.setData({
        characterList:list,
        trueList:trueList
      })
    }
  },
  // 带时辰（不需要确认）
  showDatepicker3(event) {
    let _this = this
    this.showPopup()
    // 获取日期组件对象实例，并初始化配置
    this.selectComponent("#ruiDatepicker").init({
      date: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
      hour: new Date().getHours(),
      min:new Date().getMinutes(),
      confirm: false
    });
  },
  dateConfirm(event) {
    let json = {};
    json['date'] = event.detail.year + '-' + event.detail.month + '-' + event.detail.day;
    json['hour'] = event.detail.hour;
    json['min'] = event.detail.min;
    json['dateStr'] = event.detail.thisStr;
    // 更新数据
    this.setData(json);
    let chooseDate =  event.detail.year + '-' + event.detail.month + '-' + event.detail.day+' '+(event.detail.hour<10?'0'+event.detail.hour:event.detail.hour)+':'+ (event.detail.min<10?'0'+event.detail.min:event.detail.min);
    this.setData({
      chooseDate:chooseDate,
      dateStr3:event.detail.thisStr,
      show: false
    })
  },
  // 时间选择
  onInput(event) {
    this.setData({
      currentDate: event.detail,
      chooseTime: UTIL.timestampToTime(event.detail),
      show: false
    });
  },
  // 获取姓
  getName(e) {
    this.setData({
      surname: e.detail
    })
  },
  // 获取定字
  getDing(e) {
    this.setData({
      ding: e.detail
    })
  },
  // 获取性别
  onChange(event) {
    this.setData({
      sex: event.detail,
    });
  },
  onChangeDing(event) {
    this.setData({
      dingPosition: event.detail
    });
  },
  //获取地点
  onConfirm(e) {
    this.setData({
      chooseAddress: e.detail.values[0].name + e.detail.values[1].name + e.detail.values[2].name,
    })
    this.onClose();
  },

  onSubmit() {
    let param = {
      surname: this.data.surname,
      sex: this.data.sex == 1 ? '男' : '女',
      time: this.data.chooseDate,
      address: this.data.chooseAddress,
      xingge:JSON.stringify(this.data.trueList),
      zi:this.data.ding,
      zi_type:this.data.dingPosition
    }
    if (param.surname == '') {
      wx.showToast({
        title: '请输入姓氏',
        icon: 'none'
      })
      return false
    }else if(!API.isChinese(param.surname)){
      wx.showToast({
        title: '请输入汉字',
        icon:'none'
      })
      return false
    } else if (param.time == '') {
      wx.showToast({
        title: '请选择出生时间',
        icon: 'none'
      })
      return false
    }  else if (param.address == '') {
      wx.showToast({
        title: '请选择出生地',
        icon: 'none'
      })
      return false
    } else {
      param = JSON.stringify(param)
      wx.navigateTo({
        url: '../nameDetail/nameDetail?param='+param,
      })
    }
  },
  getContent(){
    API.teachingTypeDetail({},13).then(res=>{
      let article = UTIL.formatRichText(res.data.content.content)
      this.setData({
        article:article,
        content:res.data.content
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getContent();
    if (options.param) {
      let param = JSON.parse(options.param)
      this.setData({
        surname: param.surname,
        sex: param.sex,
        chooseDate: param.time,
        dateStr3: param.postDate,
        chooseAddress: param.address,
        isLunar:param.isLunar
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      loading: false
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setData({
    //   currentDate: new Date().getTime(),
    //   chooseTime: UTIL.timestampToTime(new Date().getTime())
    // })
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
      title: '名师起名',
      path: '/pages/naming/naming?p=' + code
    }
  },
})
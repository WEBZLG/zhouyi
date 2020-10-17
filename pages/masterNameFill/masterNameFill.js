// pages/masterNameFill/masterNameFill.js
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
    id:'',
    show: false,
    characterShow: false,
    addressShow: false,
    dateStr3: '',
    chooseDate:'',
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    chooseAddress: '',
    chooseTime: '',
    isLunar:true,
    phone:'',
    code:'',
    codename: '获取验证码',
    disabled: false,
    content:''
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

  // 获取性别
  onChange(event) {
    this.setData({
      sex: event.detail,
    });
  },

  //获取地点
  onConfirm(e) {
    this.setData({
      chooseAddress: e.detail.values[0].name + e.detail.values[1].name + e.detail.values[2].name,
    })
    this.onClose();
  },
  // 获取手机号
  getPhoneValue(e) {
    this.setData({
      phone: e.detail
    })
  },
  // 获取验证码
  getCodeValue(e) {
    this.setData({
      code: e.detail
    })
  },

  onSubmit(e) {
    let _this = this
    let type = e.currentTarget.dataset.type;
    let myreg = /^(14[0-9]|13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    let param = {
      id:this.data.id,
      pay_type:'qiming_dashi',
      surname: this.data.surname,
      sex: this.data.sex == 1 ? '男' : '女',
      time: this.data.chooseDate,
      address: this.data.chooseAddress,
      xingge:JSON.stringify(this.data.trueList),
      mobile:this.data.phone,
      code:this.data.code,
      type:type
    }
    if (param.surname == '') {
      wx.showToast({
        title: '请输入姓氏',
        icon: 'none'
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
    } else if (param.xingge == '[]') {
      wx.showToast({
        title: '请选择性格标签',
        icon: 'none'
      })
      return false
    } else if (param.mobile == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    }else if (!myreg.test(param.mobile)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return false;
    }else if (param.type == 'get_code') {
      _this.getCode(param)
      return false;
    } else if(param.code==''){
        wx.showToast({
          title: '请输入验证码',
          icon: 'none'
        })
        return false
    }else{
      param.type = ''
      let params = JSON.stringify(param)
      let content = JSON.stringify(_this.data.content)
      setTimeout(() => {
        wx.navigateTo({
          url: '../masterNameFirm/masterNameFirm?param='+params+'&content='+content,
        })
      }, 500);
    }
  },

  getCode(param){
    let _this = this
    API.namePay(param).then(res=>{
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
        _this.setData({
          disabled: true
        })
        let num = 61;
        let timer = setInterval(function () {
          num--;
          if (num <= 0) {
            clearInterval(timer);
            _this.setData({
              codename: '重新发送',
              disabled: false
            })
          } else {
            _this.setData({
              codename: num + "s"
            })
          }
        }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let content = JSON.parse(options.content)
    this.setData({
      id:content.id,
      content:content
    })
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
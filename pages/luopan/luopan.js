const API = require('../../utils/api');

Page({
  data: {
    imgUrl: API.IMG_BASE_URL, //图片路径
    direction: '--',
    angle: '--',
    rotate: '',
    backgroundColor: '#ffffff',
    color: '#333333',
    compass: '',
    iconNav: [],
    location:[],
    lname:''
  },
  onChange(e) {
    let _this = this
    let title = e.currentTarget.dataset.title
    let id = e.currentTarget.dataset.id
    let url = e.currentTarget.dataset.url
    switch (id) {
      case 0:
        console.log(title,id)
        _this.setData({
          compass:url
        })
        wx.setNavigationBarTitle({
          title: title,
        })
        break;
      case 1:
        _this.setData({
          compass:url
        })
        wx.setNavigationBarTitle({
          title: title,
        })
        break;
      case 2:
        _this.setData({
          compass:url
        })
        wx.setNavigationBarTitle({
          title: title,
        })
        break;
      case 3:
        _this.setData({
          compass: url
        })
        wx.setNavigationBarTitle({
          title: title,
        })
        break;
      case 4:
        _this.setData({
          compass:url
        })
        wx.setNavigationBarTitle({
          title: title,
        })
        break;
      default:
        break;
    }
  },
  luopan(){
    API.luopan({}).then(res=>{
      this.setData({
        compass:res.data.luopan[0].image,
        iconNav:res.data.luopan,
        location:res.data.location
      })
    })
  },
  location(i){
    let _this = this
    let locations = this.data.location
    let isKong = true
    for(var j = 0; j<locations.length;j++){
      if(i>locations[j].min&&i<=locations[j].max){
        _this.setData({
          lname:locations[j].name
        })
        isKong = false
        return false
      }
    }
    if(isKong==true){
      this.setData({
        lname:'坐午向子'
      })
    }

  },
  //事件处理函
  onLoad: function () {
    // 罗盘Api
    var that = this;
    this.luopan();
    wx.onCompassChange(function (res) {
      // 罗盘数据保留两位小数
      var directions = res.direction.toFixed(2);
      var radios = res.direction.toFixed(1);
      that.location(radios)
      that.setData({
        angle: directions,
        rotate: 360 - radios, 
        direction: check(radios),
        lname:that.data.lname
      })
    });
    // 判断手机是否有陀旋仪
    // 外部检测，如果没有陀旋仪数据，代码不会进入wx.onCompassChange
    // 必须使用setsetTimeout包裹代码，否则代码立即执行弹窗
    setTimeout(function () {
      if (that.data.direction == '--' && that.data.angle == '--') {
        wx.showToast({
          title: '您的手机没有电子罗盘或被禁用',
          icon:'none',
          duration: 3000,
          mask: true
        })
      }
    }, 3000);
    // 判断文字
    function check(i) {
      if (15 <= i && i <= 75) {
        return '东北'
      } else if (75 < i && i < 105) {
        return '正东'
      } else if (105 <= i && i <= 165) {
        return '东南'
      } else if (165 < i && i < 195) {
        return '正南'
      } else if (195 <= i && i <= 255) {
        return '西南'
      } else if (255 < i && i < 285) {
        return '正西'
      } else if (285 <= i && i <= 345) {
        return '西北'
      } else {
        return '正北'
      }
    }
  },
  onUnload: function () {
    wx.offCompassChange()
  }
})
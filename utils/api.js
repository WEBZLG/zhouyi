//封装请求函数
const UTIL = require('./util.js')
const API_BASE_URL = 'https://api-yiqixue.chengyue.online'; //api地址
const IMG_BASE_URL = 'https://images-yiqixue.chengyue.online'; //图片地址
// noToken为true不传用户token传固定token/noUid为true不传用户user_id
const request = (url, method, data, noToken, noUid) => {
  //获取登录token 
  let userToken = wx.getStorageSync('loginToken');
  let loginToken = noToken == true ? '$10$Xmd/LvGEoHInQ4ISXisPJOm54ULeCFU82WgDyyM5U2j2WfO3rND2K' : userToken;
  // 获取用户id
  if (noUid == '' || noUid == undefined) {
    let userInfoId = wx.getStorageSync('userInfo').user_id;
    data.user_id = userInfoId
  }
  //获取的当前时间戳（10位）
  data.timestamp = Math.round(new Date().getTime() / 1000).toString();
  //通过md5加密验签
  data.sign = UTIL.getMD5Sign(data, loginToken)
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.request({
      url: API_BASE_URL + url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        if (request.statusCode == '200') {
          resolve(request.data)
          wx.hideLoading()
        } else if (request.statusCode == '401') {
          wx.hideLoading()
          if (request.data.message == "您当前不是会员或会员已过期，请开通会员后再访问") {
            wx.showModal({
              title: '提示',
              content: '您当前不是会员或会员已过期，是否立即开通会员或续费？',
              success: function (sm) {
                if (sm.confirm) {
                  wx.redirectTo({
                    url: '../vip/vip',
                  })
                } else if (sm.cancel) {
                  wx.navigateBack({
                    delta: 0,
                  })
                }
              }
            })
          } else {
            wx.showToast({
              title: request.data.message,
              icon: 'none'
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '../login/login',
              })
            }, 1500);
          }
        } else {
          wx.showToast({
            title: request.data.message,
            icon: 'none'
          })
        }
      },
      fail(error) {
        console.log(error)
        if (error.errMsg) {
          wx.showToast({
            title: error.errMsg,
            icon: 'none'
          })
        } else {
          reject(error)
          wx.showToast({
            title: error.errMsg,
            icon: 'none'
          })
        }
      }
    })
  });
}
// 调用
// const API = require('../../utils/api');
// API.gethotsongs({type:7,}).then(res => {})

// 单图上传
const uploadImg = (param, path) => {
  return new Promise((resolve, reject) => {
    //获取的当前时间戳（10位）
    param.timestamp = Math.round(new Date().getTime() / 1000).toString();
    let token = '$10$Xmd/LvGEoHInQ4ISXisPJOm54ULeCFU82WgDyyM5U2j2WfO3rND2K';
    //通过md5加密验签
    param.sign = UTIL.getMD5Sign(param, token)
    console.log(param)
    wx.uploadFile({
      url: API_BASE_URL + '/upload_img',
      filePath: path,
      name: 'file',
      formData: param,
      success(res) {
        let data = JSON.parse(res.data)
        resolve(data)
      },
      fail(error) {
        console.log(error)
        reject(error)
        wx.showToast({
          title: error.errMsg,
          icon: 'none'
        })
      }
    })
  })
}

//多张图片上传
const uploadImgs = (param, tempFilePaths) => {
  wx.showLoading({
    title: "上传中"
  });
  return new Promise((presolve, preject) => {
    let uploads = []
    //获取的当前时间戳（10位）
    param.timestamp = Math.round(new Date().getTime() / 1000).toString();
    let token = '$10$Xmd/LvGEoHInQ4ISXisPJOm54ULeCFU82WgDyyM5U2j2WfO3rND2K';
    //通过md5加密验签
    param.sign = UTIL.getMD5Sign(param, token)
    tempFilePaths.map((item, i) => {
      uploads[i] = new Promise((resolve, reject) => {
        wx.uploadFile({
          url: API_BASE_URL + '/upload_img',
          filePath: item.path,
          name: "file",
          formData: param,
          success(res) {
            resolve(JSON.parse(res.data))
          },
          fail(err) {
            console.log(err)
            wx.hideLoading()
          }
        })
      })
    })
    Promise.all(uploads).then(res => {
      //图片上传完成
      presolve(res)
      wx.hideLoading()
    }).catch(err => {
      preject(err)
      wx.hideLoading()
      wx.showToast({
        title: '上传失败请重试',
        icon: 'none'
      })
    })
  })
}

// 获取图片信息
const getImage = (url) => {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: url,
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
const getImageAll = (image_src) => {
  let that = this;
  var all = [];
  image_src.map(function (item) {
    all.push(getImage(item))
  })
  return Promise.all(all)
}
// 检测是否是汉字
const isChinese = (temp) => {
  var re=/[^\u4E00-\u9FA5]/;
  if (re.test(temp)) return false ;
  return true ;
}

// 结果api
module.exports = {
  IMG_BASE_URL,
  API_BASE_URL,
  getImage,
  getImageAll,
  isChinese,
  // 注册
  regist: (data) => {
    return request('/register', 'post', data, true, true)
  },
  // 登录
  login: (data) => {
    return request('/login', 'post', data, true, true)
  },
  // 重置密码
  resetPwd: (data) => {
    return request('/reset_pass', 'post', data, true, true)
  },
  // 轮播图
  carousel: (data) => {
    return request('/carousel/get', 'post', data, true, true)
  },
  //退出登录
  signOut: (data) => {
    return request('/logout', 'post', data)
  },
  //检验是否登录
  isSignIn: (data, uid) => {
    return request('/check_login/' + uid.uid, 'post', data, true, true)
  },
  //奇门排盘
  special: (data) => {
    return request('/special/get', 'post', data, true, true)
  },
  //搜局
  search: (data) => {
    return request('/special/search', 'post', data, true, true)
  },
  // 八字排盘详情
  baziDetail: (data) => {
    return request('/bazi/get', 'post', data, true, true)
  },
  //修改密码
  changePwd: (data) => {
    return request('/user/update', 'post', data)
  },
  //修改手机
  changePhone: (data) => {
    return request('/user/update', 'post', data)
  },
  //实名
  certification: (data) => {
    return request('/user/real', 'post', data)
  },
  // 单图上传
  uploadImg: (param, path) => {
    return uploadImg(param, path)
  },
  // 多图上传
  uploadImgs: (param, data) => {
    return uploadImgs(param, data)
  },
  // 获取大师推荐
  master: (data) => {
    return request('/user/sort', 'post', data, true, true)
  },
  // 获取我的推荐
  myRecommend: (data) => {
    return request('/user/report', 'post', data)
  },
  // 成为大师
  masterApply: (data) => {
    return request('/user/role3', 'post', data)
  },
  // 太阳码
  share: (data) => {
    return request('/user/qrcode', 'post', data)
  },
  // 推荐大师详情
  masterDetail: (data) => {
    return request('/user/role3_detail', 'post', data, true, true)
  },
  // 教学列表
  teachingList: (data) => {
    return request('/content/get', 'post', data, true, true)
  },
  // 教学列表详情
  teachingListDetail: (data, id) => {
    return request('/content/detail_by_id/' + id, 'post', data, true, true)
  },
  // 教学类型详情
  teachingTypeDetail: (data, id) => {
    return request('/content/detail_by_menu/' + id, 'post', data, true, true)
  },
  // 系统消息
  sysMessage: (data) => {
    return request('/message/get', 'post', data)
  },
  // 系统消息详情
  sysDetail: (data, id) => {
    return request('/message/detail/' + id, 'post', data)
  },
  // 用户协议
  agreement(data, id) {
    return request('/content/detail_by_menu/' + id, 'post', data, true, true)
  },
  // 获取联系方式
  getContace(data) {
    return request('/contact_info', 'post', data, true, true)
  },
  // 宝宝起名
  babyName(data) {
    return request('/qiming/baby', 'post', data)
  },
  // 公司起名
  companyName(data) {
    return request('/qiming/business', 'post', data)
  },
  // 大师起名
  masterName(data) {
    return request('/qiming/get_dashi_list', 'post', data)
  },
  // 起名支付
  namePay(data) {
    return request('/pay', 'post', data)
  },
  // 直播间列表
  liveList(data) {
    return request('/live/get', 'post', data)
  }, 
  // 直播间列表
  opinion(data) {
    return request('/opinion/create', 'post', data)
  }, 
  // 获取收货地址
  getAddress(data) {
    return request('/address/get', 'post', data)
  }, 
  // 获取收货地址
  editAddress(data) {
    return request('/address/edit', 'post', data)
  }, 
  // 删除收货地址
  deleteAddress(data) {
    return request('/address/del', 'post', data)
  }, 
  // 订单列表
  getOrder(data) {
    return request('/order/get', 'post', data)
  }, 
  // 订单详情
  orderDetail(data,id) {
    return request('/order/detail/'+id, 'post', data)
  }, 
  // 确认收货
  orderSuccess(data,id) {
    return request('/order/edit/'+id, 'post', data)
  }, 
  // 商品分类
  goodsType(data) {
    return request('/goods/get_goods_type', 'post', data,true,true)
  }, 
  // 商品列表
  goodsList(data) {
    return request('/goods/get', 'post', data,true,true)
  },
  // 商品详情
  goodsDetail(data,id) {
    return request('/goods/detail/'+id, 'post', data,true,true)
  },
  // 价格列表
  priceList(data){
    return request('/vip/get_list', 'post', data,true,true)
  },
  //新华字典
  dictionary(data){
    return request('/query/xhzd', 'post', data,true,true)
  },
  //百家姓
  familyName(data){
    return request('/query/bjx', 'post', data,true,true)
  },
  //测字
  testName(data){
    return request('/ceming', 'post', data)
  },
  // 罗盘
  luopan(data){
    return request('/luopan', 'post', data,true,true)
  }
}
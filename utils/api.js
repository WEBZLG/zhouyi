//封装请求函数
const UTIL = require('./util.js')
const API_BASE_URL = 'https://api-zhouyi.chengyue.online';//api地址
const IMG_BASE_URL = 'https://images-zhouyi.chengyue.online';//图片地址
const request = (url, method,data,uid,token) => {
  let _url,loginToken;
  //获取登录token 判断如果有 用登录token否则用固定的token
  if(token){
    loginToken = token
  }else{
    loginToken = '$10$Xmd/LvGEoHInQ4ISXisPJOm54ULeCFU82WgDyyM5U2j2WfO3rND2K'
  }
  //判断传入的参数中是否存在uid,存在即在url地址后拼接uid
  if(uid==undefined||uid==''){
    _url = API_BASE_URL + url;
  }else{
    console.log(uid)
    uid = '/'+uid.uid
    _url = API_BASE_URL + url + uid;
  }
  //获取的当前时间戳（10位）
  data.timestamp = Math.round(new Date().getTime()/1000).toString();
  //通过md5加密验签
  data.sign = UTIL.getMD5Sign(data,loginToken) 
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        if(request.statusCode=='200'){
          resolve(request.data)
          wx.hideLoading()
        }else if(request.statusCode=='401'){
          wx.hideLoading()
          if(request.data.message=="您当前不是会员或会员已过期，请开通会员后再访问"){
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
          }else{
            wx.showToast({
              title:request.data.message,
              icon:'none'
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 0,
              })
            }, 1500);
          }
        }else{
          wx.showToast({
            title:request.data.message,
            icon:'none'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 0,
            })
          }, 1500);
        }
      },
      fail(error) {
        console.log(error)
        reject(error)
        wx.showToast({
          title:error.data.message,
          icon:'none'
        })
      }
    })
  });
}
// 调用
// const API = require('../../utils/api');
// API.gethotsongs({
//   type:7,
//   })
//   .then(res => {})
// 结果api
module.exports = {
  IMG_BASE_URL,
  // 注册
  regist: (data) => {
    return request('/register','post', data)
  },
  // 登录
  login: (data) => {
    return request('/login','post', data)
  },
    // 重置密码
    resetPwd: (data) => {
      return request('/reset_pass','post', data)
    },
  // 轮播图
  carousel:(data) => {
    return request('/carousel/get','post', data)
  },
  //退出登录
  signOut:(data,token) => {
    return request('/logout','post',data,'',token)
  },
  //检验是否登录
  isSignIn:(data,uid) => {
    return request('/check_login','post', data,uid)
  },
  //奇门排盘
  special:(data,token) => {
    return request('/special/get','post', data,'',token)
  },
   //搜局
   search:(data,token) => {
    return request('/special/search','post', data,'',token)
  },
}
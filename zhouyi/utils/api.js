//封装请求函数
const UTIL = require('./util.js')
const API_BASE_URL = 'https://api-zhouyi.chengyue.online';
const IMG_BASE_URL = 'https://images-zhouyi.chengyue.online';
const request = (url, method,data,uid) => {
  let _url,token;
  //获取token 判断如果有用用户的token否则用下面的token
  let loginToken = wx.getStorageSync('loginToken');
  console.log(loginToken)
  if(loginToken){
    token = loginToken
  }else{
    token = '$10$Xmd/LvGEoHInQ4ISXisPJOm54ULeCFU82WgDyyM5U2j2WfO3rND2K'
  }
  if(uid==undefined){
    _url = API_BASE_URL + url;
  }else{
    console.log(uid)
    uid = '/'+uid.uid
    _url = API_BASE_URL + url + uid;
  }
  data.timestamp = Math.round(new Date().getTime()/1000).toString();
  data.sign = UTIL.getMD5Sign(data,token) 
  return new Promise((resolve, reject) => {
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
        }else{
          wx.showToast({
            title:request.data.message,
            icon:'none'
          })
        }
      },
      fail(error) {
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
  signOut:(data) => {
    return request('/logout','post', data)
  },
  //检验是否登录
  isSignIn:(data,uid) => {
    return request('/check_login','post', data,uid)
  },
}
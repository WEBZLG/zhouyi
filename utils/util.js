const MD5 = require('./md5');
// 时间戳转日期（13位）
const timestampToTime = timestamp => {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  //  var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
  // return Y+M+D+h+m+s;
  return Y + M + D + h + m;
}

//数据加密
const getMD5Sign = (params, token) => {
  if (typeof params == "string") {
    return paramsStrSort(params, token);
  } else if (typeof params == "object") {
    let newData = {};
    Object.keys(params).sort().map(key => {
      newData[key] = params[key]
    })
    let arr = [];
    for (let i in newData) {
      arr.push((i + "=" + newData[i]));
    }
    if (token == undefined) {
      return MD5(arr.join(("&"))).toUpperCase();
    } else {
      let newUrl = arr.join(("&")) + '&token=' + token;
      // console.log(newUrl)
      // console.log(MD5(newUrl).toUpperCase())
      return MD5(newUrl).toUpperCase();
    }
  }
}

// 加密调用
// var paramsObj = { xid: xid, pageSize: pageSize, type: type, pageNo: pageNo };
// var sign = getMD5Sign(paramsObj, timestamp, token);

// 监察是否登录
const checkLogin = () => {
  let _this = this
  let userInfo = wx.getStorageSync('userInfo');
  console.log(userInfo)
  if (userInfo == '' || userInfo == undefined) {
    wx.redirectTo({
      url: '../login/login',
    })
  } else {
    API.isSignIn({}, {
        uid: userInfo.user_id
      })
      .then(res => {
        if (res.message == '已登录') {
          wx.setStorageSync('loginToken', res.data.login_token);
          wx.setStorageSync('userInfo', res.data.user);
          let url = e.currentTarget.dataset.url
          wx.navigateTo({
            url: url
          })
        } else {
          wx.showToast({
            title: 'res.message',
            icon: "none"
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '../login/login',
            })
          }, 3000);
        }
      })
  }
}
// 修改富文本图片
const formatRichText = (html) => {
  let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
      match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
      match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
      match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
      return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
      match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
      return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
  return newContent;
}
//判断坐标系内顺时针还是逆时针
function judgeturn(x1, y1, x3, y3) {
  var x2 = 150
  var y2 = 150
  if ((x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2) > 0)
  return false 
  else  return true
}

module.exports = {
  formatRichText:formatRichText,
  formatTime: formatTime,
  timestampToTime: timestampToTime,
  getMD5Sign: getMD5Sign,
  checkLogin: checkLogin,
  judgeturn: judgeturn
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
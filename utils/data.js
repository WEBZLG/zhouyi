//搜局action数据
//八门
const ACTION_BM = [{name: '任意'}, {name: '休'}, {name: '生'}, {name: '伤'}, {name: '杜'}, {name: '景'}, {name: '死'}, {name: '惊'}, {name: '开'}]
// 宫位
const ACTION_GW = [{name: '任意'}, {name: '巽'}, {name: '离'}, {name: '坤'}, {name: '兑'}, {name: '乾'}, {name: '坎'}, {name: '艮'}, {name: '震'}]
//天、地盘干
const ACTION_PG = [{name: '任意'}, {name: '乙'}, {name: '丙'}, {name: '丁'}, {name: '戊'}, {name: '己'}, {name: '庚'}, {name: '辛'}, {name: '壬'}, {name: '癸'}]
//格局
const ACTION_GJ = [{ name: '任意'}, {name: '青龙反首'}, {name: '飞鸟跌穴'}, {name: '青龙逃走'}, {name: '白虎猖狂'}, {name: '朱雀投江'}, {name: '螣蛇妖娆'}, {name: '太白入萤'},{ name: '六仪击刑'
}]
// 期望性格列表
const CHARACTER_LIST=[{title:'好奇心',checked:false},{title:'爱学习',checked:false},{title:'判断力',checked:false},{title:'创造力',checked:false},{title:'洞察力',checked:false},{title:'勇敢',checked:false},{title:'毅力',checked:false},{title:'诚实',checked:false},{title:'爱',checked:false},{title:'善良',checked:false},{title:'情商高',checked:false},{title:'忠诚',checked:false},{title:'正直',checked:false},{title:'领导力',checked:false},{title:'宽容',checked:false},{title:'谦虚',checked:false},{title:'谨慎',checked:false},{title:'自律',checked:false},{title:'欣赏力',checked:false},{title:'感恩',checked:false},{title:'乐观',checked:false},{title:'幽默',checked:false},{title:'信仰',checked:false},{title:'激情',checked:false}]

// 行业列表
const INDUSTRY_LIST=[{type:'科技',list:['网络科技','信息技术','软件','新材料','教育科技','电子','电子商务','游戏','生物科技']},{type:'服务',list:['企业管理','商务咨询','广告','房地产中介','物业管理','文化传播','建筑装潢','设计','美容美发']},{type:'许可',list:['劳务派遣','人力资源','投资管理','医疗器械','食品','金融','资产','商业保理','融资租赁']},{type:'其他',list:['贸易','服饰','餐饮管理','实业','制造','化妆品','工程','农业','物流']}]
module.exports = {
  ACTION_BM,
  ACTION_PG,
  ACTION_GJ,
  ACTION_GW,
  CHARACTER_LIST,
  INDUSTRY_LIST
}
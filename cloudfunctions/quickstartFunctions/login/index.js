const cloud = require('wx-server-sdk');

cloud.init({
  env: 'cloud1-5gmlt67u983f4b1d'
});

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  const { OPENID, APPID, UNIONID } = cloud.getWXContext()
  return {
    event,
    openId: OPENID,
    appId: APPID,
    unionId: UNIONID
  }
};

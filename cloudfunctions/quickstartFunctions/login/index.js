const cloud = require('wx-server-sdk');

cloud.init({
  env: 'xxxx'  // 填写你自己的env
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

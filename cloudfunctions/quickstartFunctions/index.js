const login = require('./login/index');
const userInfo = require('./setUserInfo/index');
const uploadFile = require('./uploadFile/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'login':
        return await login.main(event, context);
    case 'userInfo':
        return await userInfo.main(event, context);
    case 'uploadFile':
        return await uploadFile.main(event, context);
  }
};

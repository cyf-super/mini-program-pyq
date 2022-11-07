const login = require('./login/index');
const userInfo = require('./setUserInfo/index');
const uploadFile = require('./uploadFile/index');
const updateBlog = require('./updateBlog/index');
const getBlog = require('./getBlog/index');
const clickStar = require('./clickStar/index');
const getAllUser = require('./getAllUser/index');
const updateComment = require('./updateComment/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'login':
        return await login.main(event, context);
    case 'userInfo':
        return await userInfo.main(event, context);
    case 'uploadFile':
        return await uploadFile.main(event, context);
    case 'updateBlog':
        return await updateBlog.main(event, context);
    case 'getBlog':
        return await getBlog.main(event, context);
    case 'clickStar':
        return await clickStar.main(event, context);
    case 'getAllUser':
        return await getAllUser.main(event, context);
    case 'updateComment':
        return await updateComment.main(event, context);
  }
};

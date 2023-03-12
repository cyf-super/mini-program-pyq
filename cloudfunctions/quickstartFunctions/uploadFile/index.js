const cloud = require('wx-server-sdk');

cloud.init({
  env: 'xxxx'  // 填写你自己的env
});

exports.main = async (event, context) => {
    const { path, file } = event
    return await cloud.uploadFile({
        cloudPath: path,
        fileContent: new Buffer.from(file, 'base64')
    }).then(res => {
        return res
    }).catch(err => {
        err.msg = '上传失败'
        return err
    })
}
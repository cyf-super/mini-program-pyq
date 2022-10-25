const cloud = require('wx-server-sdk');

cloud.init({
  env: 'cloud1-5gmlt67u983f4b1d',
});

exports.main = async (event, context) => {
    const { path, file } = event
    return await cloud.uploadFile({
        cloudPath: path,
        fileContent: new Buffer.from(file, 'base64')
    }).then(res => {
        console.log(res);
        return res
    }).catch(err => {
        console.log(err);
        err.msg = '上传失败'
        return err
    })
}
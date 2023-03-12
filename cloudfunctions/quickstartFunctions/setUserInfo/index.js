const cloud = require('wx-server-sdk');

cloud.init({
  env: 'xxxx'  // 填写你自己的env
});

const db = cloud.database()

exports.main = async (event, context) => {
    const {openId, nickName, avatarUrl } = event
    try {
        const request = await db.collection('users').where({
            openId
        })
        const res = await request.get()
        if (res.data.length) {
            request.update({
                data: {
                    avatarUrl,
                    nickName
                }
            })
            return
        }
        await db.collection('users').add({
            data: {
                openId: openId,
                nickName: nickName,
                avatarUrl: avatarUrl
            }
        })
        return {
            data: await db.collection('users').where({
                openId
            }).get()
        }
    } catch (error) {
        return error
    }
}
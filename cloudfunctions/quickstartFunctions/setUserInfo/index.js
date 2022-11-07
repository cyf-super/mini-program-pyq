const cloud = require('wx-server-sdk');

cloud.init({
  env: 'cloud1-5gmlt67u983f4b1d',
});

const db = cloud.database()

exports.main = async (event, context) => {
    console.log('event===> ', event);
    try {
        const res = await db.collection('users').where({
            openId: event.openId
        }).get()
        if (res.data.length) return res
        await db.collection('users').add({
            data: {
                openId: event.openId,
                userName: event.userName,
                gender: event.gender,
                avatarUrl: event.avatarUrl
            }
        })
        return {
            event
        }
    } catch (error) {
        console.log(error);
    }
}
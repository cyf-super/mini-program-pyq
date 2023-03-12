const cloud = require('wx-server-sdk')

cloud.init({
    env: 'xxxx'  // 填写你自己的env
})

const db = cloud.database()

exports.main = async (event, context) => {
    const { _id, stars } = event
    const res = await db.collection('circle_friends').where({
        _id
    }).update({
        data: {
            stars
        }
    })
    return {
        res,
        event
    }
}
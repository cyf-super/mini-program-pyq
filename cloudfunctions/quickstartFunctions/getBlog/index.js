const cloud = require('wx-server-sdk')

cloud.init({
    env: 'xxxx'  // 填写你自己的env
})

const db = cloud.database()

exports.main = async () => {
    try {
        const res = await db.collection('circle_friends').orderBy('timer','desc').get()
        const count = await db.collection('circle_friends').count()
        res.count = count
        return res
    } catch(err) {
        return err
    }
}
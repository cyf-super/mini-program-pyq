const cloud = require('wx-server-sdk')

cloud.init({
    env: 'xxxx'  // 填写你自己的env
})

const db = cloud.database()

exports.main = async () => {
    try {
        const users = await db.collection('users').get()
        return users.data || []
    } catch (error) {
        return error
    }
}
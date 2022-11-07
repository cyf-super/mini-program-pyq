const cloud = require('wx-server-sdk')

cloud.init({
    env: 'cloud1-5gmlt67u983f4b1d'
})

const db = cloud.database()

exports.main = async () => {
    try {
        const users = await db.collection('users').get()
        console.log('users--> ', users);
        return users.data || []
    } catch (error) {
        return error
    }
}
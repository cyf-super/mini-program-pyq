const cloud = require('wx-server-sdk')

cloud.init({
    env: 'cloud1-5gmlt67u983f4b1d'
})

const db = cloud.database()

exports.main = async () => {
    try {
        const res = await db.collection('circle_friends').get()
        const count = await db.collection('circle_friends').count()
        console.log('res===> ', res);
        res.count = count
        return res
    } catch(err) {
        console.log('err===> ', );
        return err
    }
}
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'cloud1-5gmlt67u983f4b1d'
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
    console.log('1111111 ', await db.collection('circle_friends').where({
        _id
    }));
    console.log('_id, stars res===> ', res, _id, stars);
    return {
        res,
        event
    }
}
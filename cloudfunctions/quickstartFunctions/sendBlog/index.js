const cloud = require('wx-server-sdk');

cloud.init({
  env: 'cloud1-5gmlt67u983f4b1d',
});

const db = cloud.database()

exports.main = async (event, context) => {
    const { content, images } = event
    const res = await db.collection('circle_friends').add({
        data: {
            _id: Date.now() + '',
            content,
            images,
            message: []
        }
    })
    return {
        res,
        content,
        images
    }
}
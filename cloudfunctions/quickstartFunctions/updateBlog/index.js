const cloud = require('wx-server-sdk')

cloud.init({
    env: 'cloud1-5gmlt67u983f4b1d'
})

const db = cloud.database()

exports.main = async (event, context) => {
    try {
        const { updateType, _id, content, images, nickName, openId, avatarUrl } = event
        if (updateType === 'add') {
            const res = await db.collection('circle_friends').add({
                data: {
                    _id: Date.now(),
                    openId,
                    avatarUrl,
                    nickName,
                    content,
                    images,
                    timer: Date.now(),
                    stars: [],
                    comment: []
                }
            })
            return res
        }

        if (updateType === 'delete') {
            const res = await db.collection('circle_friends').where({
                _id
            }).remove()
            return res
        }
    } catch(err) {
        return err
    }
}
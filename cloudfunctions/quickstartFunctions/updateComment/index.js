const cloud = require('wx-server-sdk')

cloud.init({
    env: 'xxxx'  // 填写你自己的env
})

const db = cloud.database()

exports.main = async (event) => {
    const { _id, comment, handleType } = event
    const _ = db.command
    try {
        if (['reply', 'add'].includes(handleType)) {
            const data = await db.collection('circle_friends').where({
                _id
            })
            const res = await data.update({
                data: {
                    comment: _.push(comment)
                }
            })
            res.message = '新增成功'
            return res
        }

        if (handleType === 'delete') {
            const data = await db.collection('circle_friends').where({
                _id
            }).update({
                data: {
                    comment: _.pull({
                        commentId: _.eq(comment.commentId)
                    })
                }
            })
            return data
        }
        
        if (handleType === 'edit') {
            const { commentId, message, timer } = comment
            const data = await db.collection('circle_friends').where({
                _id,
                'comment.commentId': commentId
            }).update({
                data: {
                    'comment.$.message': message,
                    'comment.$.timer': timer
                }
            })
            data.message = '更新成功'
            return res
        }


    } catch (error) {
        return error
    }
}
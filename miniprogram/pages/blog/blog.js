// pages/blog/blog.js
import { BOLG } from "../../configMap";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
        name: 'zxc',
        img: 'https://caiyf.oss-cn-shenzhen.aliyuncs.com/non-mainstream/login.jpg'
    },
    blogArr: [],
    openId: wx.getStorageSync('openId'),
    showInput: false,
    placeholder: '评论',
    currentBlogId: '',  // 当前的博文id
    commentInfo: {
        targetId: '',  // 评论对象id
        commentId: '',  // 当前的评论
        inputMessage: '',  // 评论输入框
        handleType: BOLG.ADD  // 操作的类型
    },
    style: `
        --left: 0;
        --top: 0;
        --backgroundColor: #fff;
    `,
    deleteInfo: {
        showDelete: false,
        deleteType: 'comment'
    }
  },

  getBlog() {
    console.log(111);
    wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
            type: 'getBlog'
        }
    }).then(res => {
        console.log('获取朋友圈信息----> ', res);
        this.setData({
            blogArr: res.result.data
        })
    })
  },

  editCircleFriend() {
      wx.navigateTo({
        url: '../send/send',
      })
  },

  // 点赞   
  clickStar(e) {
    console.log('clickStar  ', e.detail);
    const { _id, hasStar } = e.detail
    const blogArr = this.data.blogArr
    console.log('blogArr--> ', blogArr);
    for (let i = 0; i < blogArr.length; i++) {
        console.log(blogArr[i]._id, _id);
        if (blogArr[i]._id === _id) {
            if (!hasStar) {
                blogArr[i].stars.push(this.data.openId)
            } else {
                const index = blogArr[i].stars.findIndex(item => item === this.data.openId)
                blogArr[i].stars.splice(index, 1)
            }
            this.setData({
                [`blogArr[${i}].stars`]: blogArr[i].stars
            })
            console.log('blogArr[i].stars==> ', blogArr[i].stars);
            wx.cloud.callFunction({
                name: 'quickstartFunctions',
                data: {
                    type: 'clickStar',
                    stars: blogArr[i].stars,
                    _id: _id
                }
            }).then(_res => {
                console.log('_res--> ', _res);
            })
        }
    }
  },
  // 新增评论
  addComment(e) {
    const { _id } = e.detail
    console.log('clickComment  ', _id);
    this.setData({
        showInput: true,
        currentBlogId: _id,
        'commentInfo.handleType': BOLG.ADD,
        'commentInfo.commentId': ''
    })
  },
  // 回复评论
  replyComment(e) {
    const { commentId, targetName, _id, targetId } = e.detail
    this.setData({
        showInput: true,
        currentBlogId: _id,
        'commentInfo.commentId': commentId,
        'commentInfo.targetId': targetId,
        'commentInfo.handleType': BOLG.REPLY,
        placeholder: targetName ? `回复${targetName}` : '评论'
    })
  },

  bindInputMsg(e) {
    this.setData({
        'commentInfo.inputMessage': e.detail.value
    })
  },
  sendTextMsg() {
    const {commentId, inputMessage, handleType, targetId } = this.data.commentInfo

    const { currentBlogId } = this.data
    const comment = {
        commentId:  commentId || `comment-${Date.now()}`,
        openId: this.data.openId,
        targetId,
        message: inputMessage,
        timer: Date.now()
    }

    wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
            type: 'updateComment',
            _id: currentBlogId,
            comment,
            handleType
        }
    }).then(res => {
        console.log('res---> ', res);
        const { blogArr } = this.data
        for (let i = 0; i < blogArr.length; i++) {
            if (blogArr[i]._id === currentBlogId) {
                this.setData({
                    [`blogArr[${i}].comment`]: [...blogArr[i].comment, comment]
                })
            }
        }
        console.log('更新博文---> ', this.data.blogArr);
    }).catch(err => {
        console.log('报错 ', err);
    })
  },

  // 删除评论
  handleComment(e) {
    const { commentId, _id, offset } = e.detail
    this.setData({
        style: `
            --left: ${offset.x - 25}px;
            --top: ${offset.y - 45}px;
            --backgroundColor: #fff;
        `,
        'deleteInfo.showDelete': true,
        'deleteInfo.deleteType': 'comment',
        'commentInfo.commentId': commentId,
        currentBlogId: _id
    })
    console.log(offset, this.data.style);
  },

    // 删除博客
    handleBlog(e) {
        const { _id, offset } = e.detail
        this.setData({
            style: `
                --left: ${offset.x - 25}px;
                --top: ${offset.y - 45}px;
                --backgroundColor: #F7F7F7;
            `,
            'deleteInfo.showDelete': true,
            'deleteInfo.deleteType': 'blog',
            currentBlogId: _id
        })
    },

  // 确定删除评论/博客
  deleteComment(e) {
    this.setData({
        'deleteInfo.showDelete': false
    })
    const { commentId } = this.data.commentInfo
    const { currentBlogId, deleteInfo } = this.data
    
    if (deleteInfo.deleteType === 'blog') {
        this.delBlogFetch(currentBlogId)
    } 
    if (deleteInfo.deleteType === 'comment') {
        this.delCommentFetch(currentBlogId, commentId)
    }
  },

  delCommentFetch(currentBlogId, commentId) {
    wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
            type: 'updateComment',
            comment: {
                commentId
            },
            _id: currentBlogId,
            handleType: BOLG.DELETE
        }
    }).then(res => {
        const { blogArr } = this.data
        for (let i = 0; i < blogArr.length; i++) {
            if (blogArr[i]._id === currentBlogId) {
                const index = blogArr[i].comment.findIndex(item => item.commentId === commentId)
                blogArr[i].comment.splice(index, 1)

                this.setData({
                    [`blogArr[${i}].comment`]: [...blogArr[i].comment]
                })
                return
            }
        }
    }).catch(err => {
        console.log(err);
    })
  },

  delBlogFetch(currentBlogId) {
    wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
            type: 'updateBlog',
            updateType: 'delete',
            _id: currentBlogId,
        }
    }).then(res => {
        const { blogArr } = this.data
        for (let i = 0; i < blogArr.length; i++) {
            if (blogArr[i]._id === currentBlogId) {
                blogArr.splice(i, 1)
                this.setData({
                    blogArr: [...blogArr]
                })
                return
            }
        }
    }).catch(err => {
        console.log(err);
    })
  },

  //隐藏输入框
  onHideInput: function() {
    this.setData({
      showInput: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBlog()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
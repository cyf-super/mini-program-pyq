// components/blogHandle/blogHandle.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import {formatDate} from '../../utils/formatDate'
import { store } from '../../store/store'
const computedBehavior = require('miniprogram-computed').behavior;

Component({
    behaviors: [storeBindingsBehavior, computedBehavior],

    storeBindings: {
        store,
        fields: {
            openName: (store) => store.openName
        },
        actions: {
            updateOpenName: 'updateOpenName'
        }
    },
  /**
   * 组件的属性列表
   */
  properties: {
    blogComment: {
        type:  Array,
        value: []
    },
    blogStars: {
        type: Array,
        value: []
    },
    blogTime: {
        type:  Number,
        value: 0
    },
    _id: {
        type:  Number,
        value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowMask: false,
    stars: [],
    openId: wx.getStorageSync('openId') || '',
    userInfo: wx.getStorageSync('userInfo') || {},
  },

  computed: {
    blogDate(properties) {
        return formatDate(properties.blogTime)
    },
    starName(data) {
        console.log('data.openName----> ', data.openName);
        const map = data.blogStars.reduce((nameArr, openId) => 
            (nameArr.push(data.openName[openId]), nameArr)
        , [])
        return map
    },
    blogCommentArr(data) {
        const map = data.blogComment.reduce((nameArr, comment) => {
            comment.openName = data.openName[comment.openId]
            comment.targetName = data.openName[comment.targetId]
            return (nameArr.push(comment), nameArr)
        }, [])
        return map
    },
    heartIcon(data) {
        return data.blogStars.some(starId => starId === data.openId) ? 'https://caiyf.oss-cn-shenzhen.aliyuncs.com/non-mainstream/icons/heart-filled.svg' : 'https://caiyf.oss-cn-shenzhen.aliyuncs.com/non-mainstream/icons/heart.svg'
    }
  }, 

  /**
   * 组件的方法列表
   */
  methods: {
    showMask(e) {
        this.setData({
            isShowMask: !this.data.isShowMask
        })
    },
    clickComment() {
        const detail = {
            _id: this.properties._id,
        }
        this.triggerEvent('clickComment', detail)
    },
    clickStar() {
        const index = this.properties.blogStars.findIndex(openId => openId === this.data.openId)

        const detail = {
            _id: this.properties._id,
            hasStar: index !== -1
        }
        this.triggerEvent('clickStar', detail)
    },

    // 点击评论回复
    replyComment(e) {
        const { commentId, openId, targetId, targetName } = e.currentTarget.dataset

        const detail = {
            commentId,
            _id: this.properties._id,
            targetName,
            targetId: this.data.openId === openId ? '' : openId
        }
        this.triggerEvent('replyComment', detail)
    },

    handleComment(e) {
        const { commentId, openId, targetId, targetName } = e.currentTarget.dataset
        if (openId !== this.data.openId) return

        const { x, y } = e.detail
        const detail = {
            commentId,
            _id: this.properties._id,
            offset: {
                x,
                y
            }
        }
        this.triggerEvent('handleComment', detail)
    },

    //隐藏输入框
    onHideInput: function() {
        this.setData({
            showInput: false
        })
    },
    hideIcon() {
        this.setData({
            isShowMask: false
        })
    }
  },
})

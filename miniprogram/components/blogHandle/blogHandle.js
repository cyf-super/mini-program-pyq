// components/blogHandle/blogHandle.js
import {formatDate} from '../../utils/formatDate'
const computedBehavior = require('miniprogram-computed').behavior;

Component({
    behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    blogComment: {
        type:  Array,
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
    userInfo: wx.getStorageSync('userInfo') || {}
  },

  computed: {
    blogDate(properties) {
        return formatDate(properties.blogTime)
    }
  }, 

  /**
   * 组件的方法列表
   */
  methods: {
    showMask(e) {
        console.log(1111);
        this.setData({
            isShowMask: !this.data.isShowMask
        })
      console.log(e);
    },
    clickComment(e) {
        console.log(this.properties._id);
    },
    clickStar() {
        console.log();
        console.log(this.properties._id);
        this.triggerEvent('clickStar', {_id: this.properties._id})
    }
  }
})

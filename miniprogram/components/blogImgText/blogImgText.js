// components/blogImgText/blogImgText.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
        type: Object,
        value: {
            name: 'zxc',
            img: 'https://caiyf.oss-cn-shenzhen.aliyuncs.com/non-mainstream/login.jpg'
        }
    },
    blogInfo: {
        type: Object,
        value: {
            content: `
                我要绝对性的努力、压倒性的胜利
                我要所有的目光和赞美的词语都聚集在我的身上
                我要告诉全世界：对不起 我赢定了
            `,
            images: ['https://caiyf.oss-cn-shenzhen.aliyuncs.com/non-mainstream/login.jpg', 'https://caiyf.oss-cn-shenzhen.aliyuncs.com/non-mainstream/login.jpg','https://caiyf.oss-cn-shenzhen.aliyuncs.com/non-mainstream/login.jpg','https://caiyf.oss-cn-shenzhen.aliyuncs.com/non-mainstream/login.jpg', 'https://caiyf.oss-cn-shenzhen.aliyuncs.com/non-mainstream/login.jpg']
        }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    openId: wx.getStorageSync('openId') || ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleBlog(e) {
        const { blogInfo } = e.currentTarget.dataset
        if (blogInfo.openId !== this.data.openId) return
        const { x, y } = e.detail

        const detail = {
            _id: this.properties.blogInfo._id,
            offset: {
                x,
                y
            }
        }
        this.triggerEvent('handleBlog', detail)
    },
    previewImage(e) {
        const current = e.target.dataset.src
        const images = this.data.blogInfo.images.map(item => item.tempFilePath) 
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: images // 需要预览的图片http链接列表
        })
    },
    previewAvatar(e) {
        const current = e.target.dataset.src
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: [current] 
        })
    },
  },

  lifetimes: {
    attached: function() {
        console.log('小程序进图页面  ', wx.getStorageSync('openId'));
        this.setData({
            openId: wx.getStorageSync('openId') || ''
        })
    }
  }
})

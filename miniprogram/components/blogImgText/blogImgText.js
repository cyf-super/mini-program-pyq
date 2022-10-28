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
    blog: {
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

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: {
        name: '',
        avatarUrl: '',
        openId: ''
    }
  },
  login(e) {
      wx.getUserProfile({
        desc: '用户完善会员资料',
    }).then(res => {
        this.setData({
            'userInfo.name': res.userInfo.nickName,
            'userInfo.avatarUrl': res.userInfo.avatarUrl,
            isLogin: true
        })
        wx.setStorageSync('userInfo', res.userInfo)
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'login'
            }
        }).then(curUser => {
            this.setData({
                'userInfo.openId': curUser.result.openId
            })
            wx.setStorageSync('openId', curUser.result.openId)
            const user = {
                gender: res.userInfo.gender,
                userName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl,
                openId: curUser.result.openId
            }
            this.setUserInfo(user)
        })
    })
  },

  setUserInfo(user) {
    console.log('user----> ', user);
    wx.cloud.database().collection('users').where({
        openId: user.openId
    }).get().then(res => {
        if (res.data.length) return 
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'userInfo',
                ...user
            },
        }).then(res => {
            console.log('添加数据成功');
        })
    })
  },

  getUserInfo() {
      const userInfo = wx.getStorageSync('userInfo')

      if (userInfo) {
          const openId = wx.getStorageSync('openId')
          this.setData({
            'userInfo.name': userInfo.nickName,
            'userInfo.avatarUrl': userInfo.avatarUrl,
            isLogin: true
          })
      }  else {
        wx.showToast({
            title: '未登录',
            icon: 'none',
            duration: 1500
        })
        this.setData({
            isLogin: false
        })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.setUserInfo()
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
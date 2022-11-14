// pages/my/index.js
import{ createStoreBindings }from'mobx-miniprogram-bindings'
import { store } from '../../store/store'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: {
        nickName: wx.getStorageSync('nickName')?.nickName || '',
        avatarUrl: wx.getStorageSync('avatarUrl')?.avatarUrl || '',
        openId: wx.getStorageSync('openId') || '',
    },
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
        'userInfo.avatarUrl': avatarUrl
    })
    wx.setStorageSync('userInfo', this.data.userInfo)
    this.setUserInfo(wx.getStorageSync('openId'), this.data.userInfo.nickName, avatarUrl)
  },

  bindInputMsg(e) {
    console.log( e.detail.value);
    this.setData({
        'userInfo.nickName': e.detail.value
    })
    // 存储到store中
    this.updateOpenName(this.data.userInfo.openId, e.detail.value)
    wx.setStorageSync('userInfo', this.data.userInfo)
    this.setUserInfo(wx.getStorageSync('openId'), e.detail.value, this.data.userInfo.avatarUrl)
  },

  getStorageInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) return
    this.setData({
        'userInfo.nickName': userInfo.nickName,
        'userInfo.avatarUrl': userInfo.avatarUrl,
        'userInfo.openId': wx.getStorageSync('openId'),
        isLogin: true
    })
  },

  setUserInfo(openId, nickName, avatarUrl) {
    wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
            type: 'userInfo',
            openId,
            nickName,
            avatarUrl
        },
    }).then(res => {
        console.log('添加数据成功');
    })
  },

  getUserInfo() {
      const userInfo = wx.getStorageSync('userInfo')

      if (userInfo) {
          this.setData({
            'userInfo.nickName': userInfo.nickName,
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
      const that = this
    wx.login({
        success (res) {
          if (res.code && !wx.getStorageSync('openId')) {
            wx.setStorageSync('openId', res.code)
            that.setData({
                'userInfo.openId': res.code
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    
    this.getStorageInfo()

    this.storeBindings = createStoreBindings(this, {
        store,
        fields: ['openName'],
        actions: ['updateOpenName']
    })
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
    this.setData({
        'userInfo.nickName': wx.getStorageSync('userInfo')?.nickName || '',
        'userInfo.avatarUrl': wx.getStorageSync('userInfo')?.avatarUrl || '',
        'userInfo.openId': wx.getStorageSync('openId')?.nickName || ''
    })
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
    this.storeBindings.destroyStoreBindings()
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
// pages/index/index.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
import { personArr } from './map'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    personArr,
    imgalist: personArr.map(item => item.src)
  },

  getAllUserInfo: async function() {
    const users = await wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
            type: 'getAllUser'
        }
    })
    users.result.forEach(user => {
        this.buttonTap(user.openId, user.nickName)
    })
  },

  previewImage(e) {
    const current=e.target.dataset.src
    wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: this.data.imgalist // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
        store,
        fields: ['openName'],
        actions: {
            buttonTap: "updateOpenName", 
        }
    });
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
    this.getAllUserInfo()

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
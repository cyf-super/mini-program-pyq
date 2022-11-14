// pages/send/index.js
const uploadImage = require('../../utils/oss-wx/uploadFile.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    imgArr: []
  },

  bindTextAreaBlur(e) {
      this.setData({
          content: e.detail.value
      })
  },

  updateImg() {
    wx.chooseMedia({
        count: 9,
        mediaType: ['image', 'video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        success: (res) => {
            this.setData({
                imgArr: [...this.data.imgArr, ...res.tempFiles]
            })
        },
        fail(e) {
            console.log('e---> ', e);
        }
    })
  },

  sendBlog() {
    if (!this.data.content && !this.data.imgArr.length) {
        wx.showToast({
            title: '好歹说两句嘛',
            icon:"error"
        })
        return
    }
    const userInfo = wx.getStorageSync('userInfo')
    const openId = wx.getStorageSync('openId') || ''
    wx.showLoading({
        title: '发表中...',
        mask: true
    })

    const uploadAsyncQueue = []
    for (let image of this.data.imgArr) {
        uploadAsyncQueue.push(this.uploadImg(image.tempFilePath))
    }
    Promise.all(uploadAsyncQueue).then(res => {
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'updateBlog',
                updateType: 'add',
                content: this.data.content,
                images: res,
                openId,
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl
            }
        }).then(_res => {
            wx.hideLoading()
            wx.switchTab({
                url: '../blog/blog',
                success: function (res) {
                    var page = getCurrentPages().pop();  
                    if (page == undefined || page == null) return;  
                    page.onLoad();
                  }
            })
            this.setData({
                content: '',
                images: []
            })
        }).catch(_err => {
            console.log('发表失败');
        }) 
    })
  },

  uploadImg (tempFilePath) {
    return new Promise(async (resolve, rejetc) => {
        try {
            const res = await uploadImage(tempFilePath, 'non-mainstream/friend-circle/')    
            resolve({tempFilePath :res})
        } catch (err) {
            rejetc(err)
        }
    })

    // wx.cloud.uploadFile({
    //     cloudPath: cloudPath,
    //     name: 'file',
    //     filePath: tempFilePath,
    //     url: ossConfig.host,
    //     // header: {
    //     //     "Content-Type": "multipart/form-data"
    //     // },
    //     formData: {
    //         'key': cloudPath,
    //         'policy': ossConfig.policy,
    //         'OSSAccessKeyId': ossConfig.OSSAccessKeyId,
    //         'signature': ossConfig.signature,
    //         'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
    //     },
    // }).then(res => {
    //     console.log(res);
    //     // console.log('oss的url---> ', ossConfig.host + '/' + fileName);
    //     return res
    // }).catch(err => {
    //     console.log(err);
    //     err.msg = '上传失败'
    //     return err
    // })
    // wx.getFileSystemManager().readFile({
    //     filePath: tempFilePath,
    //     encoding: 'base64',
    //     success: (res) => {
    //         console.log('base64转化成功', res);
    //         wx.cloud.callFunction({
    //             name: 'quickstartFunctions',
    //             data: {
    //                 path: fileName,
    //                 file: res.data,
    //                 type: 'uploadFile'
    //             }
    //         }).then(_res => {
    //             console.log('图片上传成功---> ', _res);
    //         }).catch(err => {
    //             console.log('图片上传失败---> ', err);
    //         })
    //     }
    // })
  },

  clearAll() {
      this.setData({
          imgArr: [],
          content: ''
      })
  },

  previewImage(e) {
    const current = e.target.dataset.src
    const images = this.data.imgArr.map(item => item.tempFilePath) 
    wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: images // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
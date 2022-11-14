import { observable, action } from 'mobx-miniprogram'

export const store = observable({
  openName: {},
  //actions 方法，用来修改store中的数据
  updateOpenName: action(function (openId, name) {
    this.openName[openId] = name
  })
})
 
 
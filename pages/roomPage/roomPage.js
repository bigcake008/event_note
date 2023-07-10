// pages/roomPage/roomPage.js
Page({

  data: {
    houseIndex: "",
    roomIndex: ""
  },

  onLoad(options) {
    this.setData({houseIndex: options.hid, roomIndex: options.rid});
  },

  handleTap: function(evt) {
    wx.createSelectorQuery().select('.root').fields({size: true},function(res){
      console.log(res) // 节点对应的 Canvas 实例。
    }).exec()
  },

  bindButtonTap: function(e) {
    console.log(e);
    console.log(e.mark);
  }

})
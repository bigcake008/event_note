// pages/roomPage/roomPage.js
Page({

  data: {
    houseIndex: "",
    roomIndex: ""
  },

  onLoad(options) {
    this.setData({houseIndex: options.hid, roomIndex: options.rid});
  },

  handleRoomTap: function() {
    console.log("go back");
    wx.navigateBack();
  }
})